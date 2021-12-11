import React, { useState } from 'react'
import { GetStaticPropsContext } from 'next';
import parse from 'html-react-parser';
import SNS from '../../Components/SNS';
import Like from '../../Components/Like';
import Image from '../../Components/Image';
import DataSource from '../../Components/DataSource';
import LoaderSmall from '../../Components/LoaderSmall';
import ArticleModal from '../../Components/ArticleModal';
import TrashBookmark from '../../Components/TrashBookmark';
import OriginallyCreated from '../../Components/OriginallyCreated';
import BookmarkButtonTwo from '../../Components/BookmarkButtonTwo';
import ConfirmAddBookmarkModal from '../../Components/ConfirmAddBookmarkModal';
import ConfirmDeleteBookmarkModal from '../../Components/ConfirmDeleteBookmarkModal';
import { ArticleDraftInterface, HeadProps, BookmarkItemInterface } from '../../Interfaces';
import { BsPencilSquare } from 'react-icons/bs';
import { useUserContext } from '../../context/UserContext';
import { usePageContext } from '../../context/PageContext';
import { usePostContext } from '../../context/PostContext';
import { useModalContext } from '../../context/ModalContext';
import { useSearchContext } from '../../context/SearchContext';
import { useBookmarkContext } from '../../context/BookmarkContext';
import { trimArticle } from '../../utils/trimArticle';
import { getBookmarkById } from '../../utils/getBookmarkById';
import { handleDraftArticle } from '../../utils/handleDraftArticle';
import { useUserBookmarkIds } from '../../utils/useUserBookmarkIds';
import { updateBookmarkNoAuth } from '../../utils/updateBookmarkNoAuth';
import { getAllSharedBookmarks } from '../../utils/getAllSharedBookmarks';
import { useBodyOverflowHidden } from '../../utils/useBodyOverflowHidden';
import { useGetPrevePageDetails } from '../../utils/useGetPrevePageDetails';
import { useHandleSetPostDetails } from '../../utils/useHandleSetPostDetails';
import { handleCategoryBookmarkFn } from '../../utils/handleCategoryBookmarkFn';
import { handleConfirmBookmarkTwo } from '../../utils/handleConfirmBookmarkTwo';
import { defaultDescription, defaultPicture, headData } from '../../utils/headData';
import { useRouter } from 'next/router';
import HeadItem from '../../Components/HeadItem';
import { trimTitle } from '../../utils/trimTitle';
import { trimTitleDetails } from '../../utils/trimTitleDetails';
import { post } from 'request';
import DateInDetails from '../../Components/DateInDetails';

interface PageProps extends HeadProps {
    postData: BookmarkItemInterface | null
    post_id: string
    defaultPicture: string
    defaultDescription: string
}

const BookmarkDetails = ({ postData, post_id, headObject, defaultPicture, defaultDescription } : PageProps) => {
    const userContext = useUserContext()
    if ( !userContext ) {
        return null;
    }
    const postContext = usePostContext()
    if ( !postContext ) {
        return null;
    }
    const modalContext = useModalContext()
    if ( !modalContext ) {
        return null;
    }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
        return null;
    }
    const pageContext = usePageContext()
    if ( !pageContext ) {
        return null;
    }
    const searchContext = useSearchContext()
    if ( !searchContext ) {
        return null;
    }
    const {userId, userStatus, setUserBookmarkIds, isLoggedin, userBookmarkIds} = userContext
    const { showMessageModal, setShowMessageModal, 
            message, setMessage,
            showArticleModal,setShowArticleModal,
            myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, 
        } = modalContext  

    const {myBookmarkDeleteItem, setMyBookmarkAddItem, setCategoryBookmarks} = bookmarkContext 
    const {timeoutId, setTimeoutId, loadingClickBookmark, spMenuState} = pageContext
    //bookmarkPost state is a single bookmark post
    const [bookmarkPost, setBookmarkPost] = useState<BookmarkItemInterface | null>(null)
    
    const [draftPost, setDraftPost] = useState<ArticleDraftInterface | null>(null)
    
    useHandleSetPostDetails({postData: postData, setPost: setBookmarkPost})    

    const [parentPage, setParentPage] = useState("")

    useGetPrevePageDetails(setParentPage) 

    useBodyOverflowHidden({showModal: showArticleModal})

    useUserBookmarkIds({userId, setUserBookmarkIds, isLoggedin})

    const handleConfirm = async () => {
        if(loadingClickBookmark) {
            console.log("clicked while loading");
            return
        }
        handleConfirmBookmarkTwo({ item: bookmarkPost, isLoggedin, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds})
    }

    const onClickArticle = () => {
                        bookmarkPost && handleDraftArticle({
                        setShow: setShowArticleModal, 
                        setDraft: setDraftPost, 
                        _id: undefined,
                        imageId: bookmarkPost.imageId, 
                        title: bookmarkPost.imageTitle ?? "", 
                        url: bookmarkPost.imageUrl,
                        sharedUrl: post_id,
                        description: bookmarkPost.imageDescription ?? "", 
                        platform: bookmarkPost.platform, 
                        category: bookmarkPost.category, 
                        categoryValue: bookmarkPost.categoryValue, 
                        originallyCreatedAt: bookmarkPost.originallyCreatedAt
                    })}
    const router = useRouter()

    return (
    <>
        <HeadItem
            imageUrl={postData ? postData.imageUrl : defaultPicture}
            title={postData  && typeof postData.imageTitle === "string"? postData.imageTitle : "Polygonal Space "}
            description={postData && postData.imageDescription ? trimArticle(postData.imageDescription) : defaultDescription} 
            noIndex={true}
            defaultURL={false}
        />
        <ArticleModal draft={draftPost} setDraft={setDraftPost} currentTitle={""} currentArticle={""} update={false}/>
        <ConfirmDeleteBookmarkModal 
        item={myBookmarkDeleteItem}/>
        <ConfirmAddBookmarkModal />
        <div className="detailsOuter">
            {bookmarkPost ? 
               <div className="detailsInner" key={bookmarkPost._id}>
                   <div className={`${spMenuState && "pt-36"}`}></div>
                    <h1 className="detailsTitle">
                        {bookmarkPost.imageTitle && trimTitleDetails(bookmarkPost.imageTitle)}
                    </h1>
                    <DateInDetails 
                        createdAt={bookmarkPost.createdAt} 
                        updatedAt={bookmarkPost.updatedAt} />
                    <h2>
                        <Image item={bookmarkPost}/>
                    </h2>
                    <div className="detailsInnerTwo">
                        <div className="flex mb-5 md:mb-8">
                            <div className="detailsLike">
                                <Like 
                                updateNoAuth={updateBookmarkNoAuth}
                                post={bookmarkPost} 
                                setPost={setBookmarkPost}/>
                            </div>
                            <div>
                            </div>
                                <ul className="w-40 flex justify-between">
                                        {!isLoggedin && 
                                        <li className="ml-6">
                                            <BookmarkButtonTwo handleConfirm={handleConfirm} />
                                        </li>}
                                        {isLoggedin && !userBookmarkIds.includes(bookmarkPost.imageId) && 
                                        <li className="ml-6">
                                            <BookmarkButtonTwo handleConfirm={handleConfirm} />
                                        </li>}
                                        {isLoggedin && userBookmarkIds.includes(bookmarkPost.imageId) && 
                                        <li className="ml-6 pt-4">
                                            <TrashBookmark item={bookmarkPost}  />
                                        </li>}
                                    {(userStatus === "admin" || userStatus === "editor") && 
                                        <li className="mt-4 ml-5">
                                            <button className="text-red-600 hover:text-red-400 text-4xl" onClick={onClickArticle}>
                                                <BsPencilSquare />
                                            </button>
                                        </li>}  
                                </ul>
                        </div>
                        <h2 className="detailsCategory">
                            {handleCategoryBookmarkFn({
                                category: bookmarkPost.category, 
                                title: bookmarkPost.imageTitle ?? "", 
                                description: bookmarkPost.imageDescription ?? "", 
                                router,
                                setCategoryBookmarks,
                                })}
                        </h2>
                        <h2 className="mb-5">
                            <OriginallyCreated originallyCreated={bookmarkPost.originallyCreatedAt}  />
                        </h2>
                        {/* <ul className="w-40 flex">
                                {!isLoggedin && 
                                <li className="ml-6">
                                    <BookmarkButtonTwo handleConfirm={handleConfirm} />
                                </li>}
                                {isLoggedin && !userBookmarkIds.includes(bookmarkPost.imageId) && 
                                <li className="ml-6">
                                    <BookmarkButtonTwo handleConfirm={handleConfirm} />
                                </li>}
                                {isLoggedin && userBookmarkIds.includes(bookmarkPost.imageId) && 
                                <li className="ml-6 pt-4">
                                    <TrashBookmark item={bookmarkPost}  />
                                </li>}
                            {(userStatus === "admin" || userStatus === "editor") && 
                                <li className="mt-4 ml-5">
                                    <button className="text-red-600 hover:text-red-400 text-4xl" onClick={onClickArticle}>
                                        <BsPencilSquare />
                                    </button>
                                </li>}  
                        </ul> */}
                        <div className="detailsDescription">
                            {parse(`<div>${bookmarkPost.imageDescription}</div>`)}
                            <DataSource platform={bookmarkPost.platform} imageOnly={false}/>
                        </div>
                    </div>
                        <SNS title={bookmarkPost.imageTitle ?? ""} href={window.location.href}/>
                </div>                
                 : <div className="detailsLoaderSmall">
                     <LoaderSmall />
                 </div>
            }
        </div>
        </>
    )

}
export default BookmarkDetails

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const { params } : any = context
    const _id: string = params && params._id
    const idToSend = { bookmarkId: _id }
    const data = await getBookmarkById(idToSend)
    const headFn = (x: {page: string;
                        title: string;
                        imageUrl: string;
                        description: string;}) => {
        return x.page === "bookmark_details"
    }
    const headObject = headData.find(headFn) ?? {}
    const picture = defaultPicture
    const description = defaultDescription

      return {
            props: { postData: data, post_id: _id, headObject: headObject && headObject, defaultPicture: picture, defaultDescription: description }, 
            revalidate: 10
                }
}

export  const getStaticPaths = async () => {
const data: BookmarkItemInterface[] = await getAllSharedBookmarks()
const paths = data.map(blog => {
    return blog._id &&  {
        params: { _id: blog._id.toString() }
    }
})
return {
    paths: paths,
    fallback: true
  };
}

