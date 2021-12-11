import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { HeadProps } from '../Interfaces';
import Language from '../Components/Language';
import LoaderSmall from '../Components/LoaderSmall';
import SharedBookmarkItem from '../Components/SharedBookmarkItem';
import ConfirmAddBookmarkModal from '../Components/ConfirmAddBookmarkModal';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { headData } from '../utils/headData';
import { useScrollPosition } from '../utils/useScrollPosition';
import { useUserBookmarkIds } from '../utils/useUserBookmarkIds';
import { handleScrollPosition } from '../utils/handleScrollPosition';
import { usePageChangeGeneral } from '../utils/usePageChangeGeneral';
import { useSetPrevePageDetails } from '../utils/useSetPrevePageDetails';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { send_shared_bookmarks_by_page } from '../utils/urls';
import { BiShareAlt } from 'react-icons/bi';
import HeadItem from '../Components/HeadItem';


const SharedBookmarks = ({ headObject } : HeadProps) => {
    const [loadingShared, setLoadingShared] = useState<boolean>(false)
    const [hasMoreShared, setHasMoreShared] = useState(true)
    const [isVisibleShared, setIsVisibleShared] = useState(false)    
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
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
    const searchContext = useSearchContext()
        if ( !searchContext ) {
            return null;
        }
    const {allBookmarks, setAllBookmarks} = bookmarkContext
    const {userId, setUserBookmarkIds, isLoggedin} = userContext
    const {pathName, loadingClickBookmark} = pageContext
    const currentPageCookie = Cookies.get("currentPageShared")
    const [currentPageShared, setCurrentPageShared] = 
               useState((allBookmarks.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    
    const totalPageCookie = Cookies.get("totalPagesShared")
    const [totalPagesShared, setTotalPagesShared] =
                    useState(totalPageCookie ? JSON.parse(totalPageCookie) : 2)
   
    const observerSharedRef = useRef<HTMLDivElement>(null)

     useHandleObserverGeneral({ 
            setIsVisibleGeneral: setIsVisibleShared, 
            loadingGeneral: loadingShared, 
            hasMoreGeneral: hasMoreShared, 
            observerGeneralRef: observerSharedRef })

    usePageChangeGeneral({
        setLoadingGeneral: setLoadingShared, 
        setCurrentPageGeneral: setCurrentPageShared, 
        currentPageGeneral: currentPageShared, 
        setTotalPagesGeneral: setTotalPagesShared, 
        totalPagesGeneral: totalPagesShared, 
        setHasMoreGeneral: setHasMoreShared, 
        data: allBookmarks, 
        setData: setAllBookmarks, 
        isVisibleGeneral: isVisibleShared,
        urlName: send_shared_bookmarks_by_page
    })

    useSetPrevePageDetails(pathName)

    useScrollPosition({path: "sharedScroll"})

    useSetPageCookiesGeneral({
        currentPage: currentPageShared, 
        currentPageCookie: "currentPageShared", 
        totalPages: totalPagesShared, 
        totalPagesCookie: "totalPagesShared",})

    useUserBookmarkIds({userId, setUserBookmarkIds, isLoggedin})

    return (<>
    <HeadItem
        imageUrl={headObject.imageUrl}
        title={headObject.title}
        description={headObject.description}
        noIndex={true}
        defaultURL={false}
    />
    {!loadingClickBookmark && <ConfirmAddBookmarkModal />}
    <div className="">
        <h1 className="h1 flexJustifyCenter">
            <div className="text-indigo-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                <BiShareAlt />
            </div>
            <div className="pt-1">
                <Language jp={"共有ブックマーク"} en={"Shared Bookmarks"}/>
            </div>
        </h1>
        <div className={allBookmarks ? "outer" : ""}>
            {allBookmarks ? 
            (allBookmarks.filter((item: any) => item.public === true).map((item, index) => {
                if(allBookmarks.length === index + 1){
                    return <SharedBookmarkItem 
                                item={item} 
                                items={allBookmarks} 
                                setItems={setAllBookmarks}  observerSharedRef={observerSharedRef} 
                                key={item._id}
                                handlePosition={() => handleScrollPosition({path: "sharedScroll"})}
                                last={true} />
                } else {
                    return <SharedBookmarkItem 
                                item={item} 
                                items={allBookmarks} 
                                setItems={setAllBookmarks}  
                                observerSharedRef={observerSharedRef} 
                                key={item._id}
                                handlePosition={() => handleScrollPosition({path: "sharedScroll"})}
                                last={false}    />
                            }
            }))
            :   <div className="loaderSmallItemNotExist">
                    <LoaderSmall />
                </div>}
        </div>
            {loadingShared && <div className="loaderSmallGettingItems"><LoaderSmall /></div>}
        </div>        
        </>
    )
}

export default SharedBookmarks

export const getStaticProps = async () => {
            const headObject = headData.find(x => x.page === "shared_bookmarks")

        return {
                props: { headObject: headObject && headObject }, 
                revalidate: 10
                }   
        }