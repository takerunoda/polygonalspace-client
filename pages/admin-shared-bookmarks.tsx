import React, { useRef, useState } from 'react'
import { useBookmarkContext } from '../context/BookmarkContext';
import { usePageContext } from '../context/PageContext';
import { BiShareAlt } from 'react-icons/bi';
import Cookies from 'js-cookie';
import Language from '../Components/Language';
import LoaderPage from '../Components/LoaderPage';
import LoaderSmall from '../Components/LoaderSmall';
import SharedBookmarkItemAdmin from '../Components/SharedBookmarkItemAdmin';
import { useUserContext } from '../context/UserContext';
import useSetUserStatusAdmin from '../utils/useSetUserStatusAdmin';
import { useScrollPosition } from '../utils/useScrollPosition';
import { usePageChangeGeneral } from '../utils/usePageChangeGeneral';
import { handleScrollPosition } from '../utils/handleScrollPosition';
import { useSetPrevePageDetails } from '../utils/useSetPrevePageDetails';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { send_shared_bookmarks_by_page_admin } from '../utils/urls';
import HeadItem from '../Components/HeadItem';

const AdminSharedBookmarks = () => {
    const [loadingSharedAdmin, setLoadingSharedAdmin] = useState<boolean>(false)
    const [hasMoreSharedAdmin, setHasMoreSharedAdmin] = useState(true)
    const [isVisibleSharedAdmin, setIsVisibleSharedAdmin] = useState(false)
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const {isLoggedin} = userContext    
    const {allBookmarks, setAllBookmarks} = bookmarkContext    
    const {pathName,} = pageContext
    const currentPageCookie = Cookies.get("currentPageSharedAdmin")
    const [currentPageSharedAdmin, setCurrentPageSharedAdmin] = 
               useState((allBookmarks.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    const totalPageCookie = Cookies.get("totalPagesSharedAdmin")
    const [totalPagesSharedAdmin, setTotalPagesSharedAdmin] =
                    useState(totalPageCookie ? JSON.parse(totalPageCookie) : 2)
    const observerSharedAdminRef = useRef<HTMLDivElement>(null)
    const [userStatusAdmin, setUserStatusAdmin] = useState<string | undefined>()

    useHandleObserverGeneral({ 
        setIsVisibleGeneral: setIsVisibleSharedAdmin, 
        loadingGeneral: loadingSharedAdmin, 
        hasMoreGeneral: hasMoreSharedAdmin, 
        observerGeneralRef: observerSharedAdminRef })

    usePageChangeGeneral({
        setLoadingGeneral: setLoadingSharedAdmin, 
        setCurrentPageGeneral: setCurrentPageSharedAdmin, 
        currentPageGeneral: currentPageSharedAdmin, 
        setTotalPagesGeneral: setTotalPagesSharedAdmin, 
        totalPagesGeneral: totalPagesSharedAdmin, 
        setHasMoreGeneral: setHasMoreSharedAdmin, 
        data: allBookmarks, 
        setData: setAllBookmarks, 
        isVisibleGeneral: isVisibleSharedAdmin,
        urlName: send_shared_bookmarks_by_page_admin
    })

    useSetPrevePageDetails(pathName)

    useScrollPosition({path: "sharedAdminScroll"})

    useSetPageCookiesGeneral({
        currentPage: currentPageSharedAdmin, 
        currentPageCookie: "currentPageSharedAdmin", 
        totalPages: totalPagesSharedAdmin, 
        totalPagesCookie: "totalPagesSharedAdmin",})

    useSetUserStatusAdmin({setUserStatusAdmin})

    return (isLoggedin && userStatusAdmin === "admin") ? (
    <>
        <HeadItem
            imageUrl={""}
            title={"[Admin] 共有 | Shared"}
            description={""}
            noIndex={true}
            defaultURL={true}
        />
            <h1 className="h1 flex justify-center">
                <div className="text-indigo-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                    <BiShareAlt />
                </div>
                <div className="pt-1">
                    <Language jp={`[ Admin ] 共有された記事`} en={`[ Admin ] Shared Articles`} />
                </div>
            </h1>
            <div className={allBookmarks ? "outer" : ""}>
                {allBookmarks ? 
                (allBookmarks.map((item, index) => {
                    if(allBookmarks.length === index + 1){
                           return  <SharedBookmarkItemAdmin 
                                        item={item} items={allBookmarks} 
                                        setItems={setAllBookmarks} observerSharedAdminRef={observerSharedAdminRef} 
                                        key={item._id}
                                        handlePosition={() => handleScrollPosition({path: "sharedAdminScroll"})}
                                        last={true} />
                    } else {
                           return  <SharedBookmarkItemAdmin 
                                        item={item}
                                        items={allBookmarks}
                                        setItems={setAllBookmarks}
                                        observerSharedAdminRef={observerSharedAdminRef}
                                        key={item._id}
                                        handlePosition={() => handleScrollPosition({path: "sharedAdminScroll"})}
                                        last={false} />
                                    }
                            })) :
                    <div className="loaderSmallItemNotExist">
                        <LoaderSmall />
                    </div>}
                </div>
            {loadingSharedAdmin && 
            <div className="loaderSmallGettingItems">
                <LoaderSmall />
            </div>}
        </>) 
    : <LoaderPage />
}
export default AdminSharedBookmarks