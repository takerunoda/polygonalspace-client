import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { GetStaticPropsContext } from 'next';
import Cookies from 'js-cookie';
import { usePostContext } from '../../context/PostContext';
import { UserMemoContextType, UserPostPageProps } from '../../Interfaces';
import HeadItemGeneral from '../../Components/HeadItemGeneral';
import UserMemoComponent from '../../Components/UserMemoComponent';
import { getAllUserIds } from '../../utils/getAllUserIds';
import { handlePageChange } from '../../utils/handlePageChange';
import { useScrollPosition } from '../../utils/useScrollPosition';
import { getInitialMemoUser } from '../../utils/getInitialMemoUser';
import { handleUserWhoPosts } from '../../utils/handleUserWhoPosts';
import { send_user_posts_by_page } from '../../utils/urls';
import { useSetPageCookiesGeneral } from '../../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../../utils/useHandleObserverGeneral';
import { defaultPicture, headData } from '../../utils/headData';
import { handlePageChangeInitial } from '../../utils/handlePageChangeInitial';
import { useHandleObserverGeneralInitial } from '../../utils/useHandleObserverGeneralInitial';

const UserMemoContext = createContext<UserMemoContextType | undefined>(undefined)

const UserPosts = ({ 
                    userId, 
                    headObject, 
                    userIdShort, 
                    initialData, 
                    totalPages, 
                    itemsLength, 
                    siteUrl, 
                    baseName, 
                    twitterID, 
                    MyName  }: UserPostPageProps) => {
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)    
    const [isVisibleGeneralInitial, setIsVisibleGeneralInitial] = useState<boolean>(false)
    const {userPost, setUserPost} = usePostContext();
    const currentPageCookie = Cookies.get("currentPagePostUser")
    const [currentPage, setCurrentPage] = 
               useState((userPost.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    const elementRef = useRef(null)
    const elementInitialRef = useRef(null)
    const pageChangeInitial = useCallback(() => handlePageChangeInitial({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: userPost, 
            setData: setUserPost, 
            urlName: send_user_posts_by_page,
            itemsLength
    }), [currentPage, hasMoreGeneral, itemsLength, setUserPost, totalPages, userPost])
    const pageChange = useCallback(() => handlePageChange({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: userPost,
            setData: setUserPost, 
            urlName: send_user_posts_by_page,
            itemsLength
    }), [currentPage, hasMoreGeneral, itemsLength, setUserPost, totalPages, userPost])
    useHandleObserverGeneral({
            pageChange,
            setIsVisibleGeneral,
            elementRef,
            items: userPost,
         })
    useHandleObserverGeneralInitial({ 
            pageChangeInitial,
            setIsVisibleGeneralInitial,
            elementInitialRef,
         })
    useScrollPosition({path: "postUserScroll"})
    useSetPageCookiesGeneral({
        currentPage,
        currentPageCookie: "currentPagePostUser", 
        totalPages,
        totalPagesCookie: "totalPagesPostUser",})
    const memoValue = useMemo(() => ({
            userId, loadingGeneral, initialData, elementRef, elementInitialRef, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial
    }), [userId, loadingGeneral, initialData, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial])

    return (
    <UserMemoContext.Provider value={memoValue}>
        {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItemGeneral
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {`user-memo/${userId}`}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <UserMemoComponent />
    </UserMemoContext.Provider>
    )}

export default UserPosts

export function useUserMemoContext(){
    const context = useContext(UserMemoContext)
        if(context === undefined){
            throw new Error("useContext(useUserMemoContext) is undefined")
        }
        return context
    }


export const getStaticProps = async (context:GetStaticPropsContext) => {
            const { params } = context
            let userId = params && params.userId
            if(userId && typeof userId !== "string"){
                userId = userId.toString()
            }
            const initialData = userId && await getInitialMemoUser({userId}) 
            const items = initialData && initialData.items
            const totalPages = initialData && initialData.totalPages
            const itemsLength = initialData && initialData.itemsLength
            const headObject = headData.find(x => x.page === "user_posts")
            const userIdShort = userId && handleUserWhoPosts(userId)
            const siteUrl = process.env.SITE_URL
            const baseName = process.env.BASE_SITE_NAME
            const twitterID = process.env.TWITTER_ID
            const MyName = process.env.MYNAME
            const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
            const description = `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。このページでは、ユーザー: ${userId} が書いたメモを表示しています。This page shows a list of the notes written by ${userIdShort}.`
            const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl, description: description}

      return {
            props: {    userId: userId && userId, 
                        userIdShort: userIdShort, 
                        headObject: updatedHeadObject && updatedHeadObject,
                        initialData: items,
                        totalPages: totalPages,
                        itemsLength: itemsLength,
                        siteUrl: siteUrl,
                        baseName: baseName,
                        twitterID: twitterID,
                        MyName: MyName,
                    },
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