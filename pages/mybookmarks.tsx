import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { useUserContext } from '../context/UserContext';
import { MyBookmarkContextType, PageProps } from '../Interfaces';
import LoaderPage from '../Components/LoaderPage';
import HeadItemNoIndex from '../Components/HeadItemNoIndex';
import MyBookmarksComponent from '../Components/MyBookmarksComponent';
import { useScrollPosition } from '../utils/useScrollPosition';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { handlePageChangeBookmark } from '../utils/handlePageChangeBookmark';
import { defaultPicture, headData } from '../utils/headData';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { handlePageChangeBookmarkInitial } from '../utils/handlePageChangeBookmarkInitial';
import { verify_access_token_send_bookmark_by_page } from '../utils/urls';

const MyBookmarkContext = createContext<MyBookmarkContextType | undefined>(undefined)

const MyPage = ({ headObject, siteUrl, baseName, twitterID, MyName } : PageProps) => {
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)    
    const [isVisibleGeneralInitial] = useState<boolean>(false)
    const { userState: 
            { isLoggedin, accessToken },
            userBookmark, setUserBookmark,
        } = useUserContext()   
    const currentPageCookie = Cookies.get("currentPageMyBookmark")
    const [currentPageGeneral, setCurrentPageGeneral] = 
               useState((userBookmark.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    const totalPageCookie = Cookies.get("totalPagesMyBookmark")
    const [totalPagesGeneral, setTotalPagesGeneral] =
                    useState((userBookmark.length > 0) && totalPageCookie ? JSON.parse(totalPageCookie) : 2)
    const elementRef = useRef(null)
    const pageChangeInitial = useCallback(() => handlePageChangeBookmarkInitial({
            setLoadingGeneral,
            setCurrentPageGeneral,
            currentPageGeneral,
            setTotalPagesGeneral,
            totalPagesGeneral,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: userBookmark, 
            setData: setUserBookmark, 
            urlName: verify_access_token_send_bookmark_by_page,
            accessToken
    }), [accessToken, currentPageGeneral, hasMoreGeneral, setUserBookmark, totalPagesGeneral, userBookmark])
    const pageChange = useCallback(() => handlePageChangeBookmark({
            setLoadingGeneral,
            setCurrentPageGeneral,
            currentPageGeneral,
            setTotalPagesGeneral,
            totalPagesGeneral,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: userBookmark, 
            setData: setUserBookmark, 
            urlName: verify_access_token_send_bookmark_by_page,
            accessToken
    }), [accessToken, currentPageGeneral, hasMoreGeneral, setUserBookmark, totalPagesGeneral, userBookmark])
    const pageChangeInitialRef = useRef(pageChangeInitial)
    useEffect(() => {
        const pageChangeInitialCurrent = pageChangeInitialRef.current
        isLoggedin && pageChangeInitialCurrent()
    }, [isLoggedin])
    useHandleObserverGeneral({
            pageChange,
            setIsVisibleGeneral,
            elementRef,
            items: userBookmark,
         })
    useScrollPosition({path: "myBookmarkScroll"})
    useSetPageCookiesGeneral({
        currentPage: currentPageGeneral, 
        currentPageCookie: "currentPageMyBookmark", 
        totalPages: totalPagesGeneral, 
        totalPagesCookie: "totalPagesMyBookmark",})

    const myBookmarkValue = useMemo(() => ({
            elementRef, currentPageGeneral, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial, loadingGeneral
        }), [currentPageGeneral, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial, loadingGeneral])

    return (
    isLoggedin ? <MyBookmarkContext.Provider value={myBookmarkValue}>
    {headObject && siteUrl && baseName && twitterID && MyName && <HeadItemNoIndex
                    headObject= {headObject}
                    siteUrl= {siteUrl}
                    slug= {headObject.slug}
                    baseName= {baseName}
                    twitterID= {twitterID}
                    MyName= {MyName}            
                />}
        <MyBookmarksComponent />
    </MyBookmarkContext.Provider> :
    <LoaderPage />)
}
export default MyPage


export function useMyBookmarkContext(){
    const context = useContext(MyBookmarkContext)
        if(context === undefined){
            throw new Error("useContext(useMyBookmarkContext) is undefined")
        }
        return context
    }


export const getStaticProps = async () => {
            const headObject = headData.find(x => x.page === "no-index")
            const siteUrl = process.env.SITE_URL
            const baseName = process.env.BASE_SITE_NAME
            const twitterID = process.env.TWITTER_ID
            const MyName = process.env.MYNAME
            const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
            const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl}

        return {
                props: { 
                    headObject: updatedHeadObject && updatedHeadObject,
                    siteUrl: siteUrl,
                    baseName: baseName,
                    twitterID: twitterID,
                    MyName: MyName,
                 }, 
                revalidate: 10
                }
            }
