import React, { useRef, useState } from 'react'
import { GetStaticPropsContext } from 'next';
import Cookies from 'js-cookie';
import { HeadProps } from '../../Interfaces';
import HeadItem from '../../Components/HeadItem';
import PostItem from '../../Components/PostItem';
import Language from '../../Components/Language';
import LoaderSmall from '../../Components/LoaderSmall';
import ConfirmDeletePostUserModal from '../../Components/ConfirmDeletePostUserModal';
import { usePostContext } from '../../context/PostContext';
import { usePageContext } from '../../context/PageContext';
import { useModalContext } from '../../context/ModalContext';
import { getAllUserIds } from '../../utils/getAllUserIds';
import { useScrollPosition } from '../../utils/useScrollPosition';
import { handleUserWhoPosts } from '../../utils/handleUserWhoPosts';
import { handleScrollPosition } from '../../utils/handleScrollPosition';
import { useSetPrevePageDetails } from '../../utils/useSetPrevePageDetails';
import { send_user_posts_by_page } from '../../utils/urls';
import { useSetPageCookiesGeneral } from '../../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../../utils/useHandleObserverGeneral';
import { usePageChangeGeneralUser } from '../../utils/usePageChangeGeneralUser';
import { defaultDescription, defaultPicture, headData } from '../../utils/headData';

interface PageProps extends HeadProps {
    userId: string
    userIdShort: string
    defaultPicture: string, 
    defaultDescription: string, 
}

const UserPosts = ({ userId, headObject, userIdShort, defaultPicture, defaultDescription  }: PageProps) => {

    const [hasMorePostUser, setHasMorePostUser] = useState(true)
    const [loadingPostUser, setLoadingPostUser] = useState<boolean>(false)
    const [isVisiblePostUser, setIsVisiblePostUser] = useState(false)
    const postContext = usePostContext()
        if ( !postContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const {userPost, setUserPost} = postContext;
    const {language, } = pageContext;
    const currentPageCookie = Cookies.get("currentPagePostUser")
    const [currentPagePostUser, setCurrentPagePostUser] = 
               useState((userPost.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    const totalPageCookie = Cookies.get("totalPagesPostUser")
    const [totalPagesPostUser, setTotalPagesPostUser] =
                    useState(totalPageCookie ? JSON.parse(totalPageCookie) : 2)
    const observerPostUserRef = useRef<HTMLDivElement>(null)

     useHandleObserverGeneral({ 
            setIsVisibleGeneral: setIsVisiblePostUser, 
            loadingGeneral: loadingPostUser, 
            hasMoreGeneral: hasMorePostUser, 
            observerGeneralRef: observerPostUserRef })

    usePageChangeGeneralUser({
        setLoadingGeneral: setLoadingPostUser, 
        setCurrentPageGeneral: setCurrentPagePostUser, 
        currentPageGeneral: currentPagePostUser, 
        setTotalPagesGeneral: setTotalPagesPostUser, 
        totalPagesGeneral: totalPagesPostUser, 
        setHasMoreGeneral: setHasMorePostUser, 
        data: userPost, 
        setData: setUserPost, 
        isVisibleGeneral: isVisiblePostUser,
        urlName: send_user_posts_by_page,
        userId: userId
    })

    useSetPrevePageDetails(`/user-posts/${userId}`)

    useScrollPosition({path: "postUserScroll"})

    useSetPageCookiesGeneral({
        currentPage: currentPagePostUser, 
        currentPageCookie: "currentPagePostUser", 
        totalPages: totalPagesPostUser, 
        totalPagesCookie: "totalPagesPostUser",})
    const handleLoadingPage = () => {
        const x = setTimeout(() => {
            return <LoaderSmall />
        }, 1);
        const y = setTimeout(() => {
            clearTimeout(x)
            return <div className="h2">{language ? "このユーザーの投稿はありません" : "The user has no published articles"}</div>
        }, 5000);
    }

    return (
    <>
        <HeadItem
            imageUrl={defaultPicture}
            title={`Written by "${userIdShort}"`}
            description={`ユーザー: ${userId} の投稿一覧を表示しています。This page shows a list of posts written by ${userIdShort}. ${defaultDescription}`} 
            noIndex={false}
            defaultURL={false}
        />
        <ConfirmDeletePostUserModal />
        <div className="mt-8">
           { userPost[0] ? 
           (<h1 className="h1 w-10/12 mx-auto">               
                <Language jp={`${userPost[0].authorId && handleUserWhoPosts(userPost[0].authorId) }さんの投稿`} en={`Written by User ${userPost[0].authorId && handleUserWhoPosts(userPost[0].authorId) }`}/>               
               </h1> ) 
           : <h1 className="h1 text-center">
               {handleLoadingPage}
               </h1>}
            <div className={userPost ? "outer" : ""}>
                {userPost ? 
                (userPost.map((item, index) => {
                    if(userPost.length === index + 1){
                        return <PostItem 
                        item={item} 
                        items={userPost} 
                        setItems={setUserPost}      
                        observerPostRef={observerPostUserRef} key={item._id}   
                        handlePosition={() => handleScrollPosition({path: "postUserScroll"})}
                        last={true} />
                    } else {
                        return <PostItem 
                        item={item} 
                        items={userPost} 
                        setItems={setUserPost}      
                        observerPostRef={observerPostUserRef} key={item._id}
                        handlePosition={() => handleScrollPosition({path: "postUserScroll"})}
                        last={false} />
                    }
                })): 
                <div className="loaderSmallItemNotExist">
                     <LoaderSmall />
                 </div>}
            </div>
        {loadingPostUser 
            && <div className="loaderSmallGettingItems">
                <LoaderSmall />
            </div>}
        </div>
    </>)
}

export default UserPosts

export const getStaticProps = async (context:GetStaticPropsContext) => {
    const { params } = context
    let userId = params && params.userId

    if(userId && typeof userId !== "string"){
        userId = userId.toString()
    }

    const headObject = headData.find(x => x.page === "user_posts")
    const userIdShort = userId && handleUserWhoPosts(userId)
    const picture = defaultPicture
    const description = defaultDescription

      return {
            props: {    userId: userId && userId, 
                        headObject: headObject && headObject, 
                        userIdShort: userIdShort, 
                        defaultPicture: picture, 
                        defaultDescription: description },
            revalidate: 10
  }
}

export const getStaticPaths = async () => {
    const data: (string | undefined)[] | undefined = await getAllUserIds()
    const paths = data && data.map(userId => ({ params: { userId: userId} }))

    return {
        paths,
        fallback:true
    }
}