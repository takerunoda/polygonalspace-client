import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { usePostContext } from '../context/PostContext';
import { BookmarkPageProps, SharedContextType } from '../Interfaces';
import HeadItemNoIndex from '../Components/HeadItemNoIndex';
import SharedComponent from '../Components/SharedComponent';
import { handlePageChange } from '../utils/handlePageChange';
import { getInitialShared } from '../utils/getInitialShared';
import { useScrollPosition } from '../utils/useScrollPosition';
import { useUserBookmarkIds } from '../utils/useUserBookmarkIds';
import { handlePageChangeInitial } from '../utils/handlePageChangeInitial';
import { defaultPicture, headData } from '../utils/headData';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { send_shared_bookmarks_by_page } from '../utils/urls';
import { useHandleObserverGeneralInitial } from '../utils/useHandleObserverGeneralInitial';

const SharedContext = createContext<SharedContextType | undefined>(undefined)

const Shared = ({ headObject, initialData, totalPages, itemsLength, siteUrl, baseName, twitterID, MyName } : BookmarkPageProps) => {
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)    
    const [isVisibleGeneralInitial, setIsVisibleGeneralInitial] = useState<boolean>(false)
    const {allBookmarks, setAllBookmarks} = usePostContext()
    const currentPageCookie = Cookies.get("currentPageShared")
    const [currentPage, setCurrentPage] = 
               useState((allBookmarks.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 2)    
    const elementRef = useRef(null)
    const elementInitialRef = useRef(null)

    const pageChangeInitial = useCallback(() => handlePageChangeInitial({
        setLoadingGeneral,setCurrentPage, currentPage, totalPages, hasMoreGeneral, setHasMoreGeneral, data: allBookmarks, setData: setAllBookmarks, urlName: send_shared_bookmarks_by_page,itemsLength
    }), [allBookmarks, currentPage, hasMoreGeneral, itemsLength, setAllBookmarks, totalPages])

    const pageChange = useCallback(() => handlePageChange({
        setLoadingGeneral, setCurrentPage, currentPage, totalPages, hasMoreGeneral, setHasMoreGeneral, data: allBookmarks, setData: setAllBookmarks, urlName: send_shared_bookmarks_by_page,itemsLength
    }), [allBookmarks, currentPage, hasMoreGeneral, itemsLength, setAllBookmarks, totalPages])

    useHandleObserverGeneral({
            pageChange,
            setIsVisibleGeneral, 
            elementRef,
            items: allBookmarks,
         })

    useHandleObserverGeneralInitial({ 
            pageChangeInitial,
            setIsVisibleGeneralInitial, 
            elementInitialRef,
         })
    useScrollPosition({path: "sharedScroll"})
    useSetPageCookiesGeneral({
        currentPage, 
        currentPageCookie: "currentPageShared", 
        totalPages, 
        totalPagesCookie: "totalPagesShared",})
    useUserBookmarkIds()

    const sharedValue = useMemo(() => ({
            loadingGeneral, initialData, elementRef, elementInitialRef, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial
        }), [currentPage, hasMoreGeneral, initialData, isVisibleGeneral, isVisibleGeneralInitial, loadingGeneral])
        
    return (
    <SharedContext.Provider value={sharedValue}>
        {headObject && siteUrl && baseName && twitterID && MyName && <HeadItemNoIndex
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {headObject.slug}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <SharedComponent  />
    </SharedContext.Provider>
    )}

export default Shared

export function useSharedContext(){
    const context = useContext(SharedContext)
        if(context === undefined){
            throw new Error("useContext(useSharedContext) is undefined")
        }
        return context
    }

export const getStaticProps = async () => {
            const headObject = headData.find(x => x.page === "shared_bookmarks")
            const initialData = await getInitialShared()
            const items = initialData.items
            const totalPages = initialData.totalPages
            const itemsLength = initialData.itemsLength
            const siteUrl = process.env.SITE_URL
            const baseName = process.env.BASE_SITE_NAME
            const twitterID = process.env.TWITTER_ID
            const MyName = process.env.MYNAME
            const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
            const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl}

        return {
                props: { 
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