import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie';
import Language from '../Components/Language';
import HeadItem from '../Components/HeadItem';
import LoaderPage from '../Components/LoaderPage';
import LoaderSmall from '../Components/LoaderSmall';
import ConfirmDeleteBookmarkModal from '../Components/ConfirmDeleteBookmarkModal';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { useScrollPosition } from '../utils/useScrollPosition';
import { handleBookmarkItems } from '../utils/handleBookmarkItems';
import { useBodyOverflowHidden } from '../utils/useBodyOverflowHidden';
import { usePageChangeMyBookmark } from '../utils/usePageChangeMyBookmark';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { verify_access_token_send_bookmark_by_page } from '../utils/urls';
import { BsBookmarks } from 'react-icons/bs';

const MyPage = () => {
    const [hasMoreMyBookmark, setHasMoreMyBookmark] = useState(true)
    const [isVisibleMyBookmark, setIsVisibleMyBookmark] = useState(false)
    const [loadingMyBookmark, setLoadingMyBookmark] = useState<boolean>(false)            
    const userContext = useUserContext()
        if ( !userContext ) {
        return null;
    }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
        return null;
    }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
    }    
    const { accessToken,
            isLoggedin,
            userBookmarkIds
        } = userContext            
    const { userBookmark, setUserBookmark,
            myBookmarkDeleteItem, setMyBookmarkDeleteItem            
        }  = bookmarkContext
    const { showArticleModal, 
        } = modalContext
    const currentPageCookie = Cookies.get("currentPageMyBookmark")
    const [currentPageMyBookmark, setCurrentPageMyBookmark] = 
               useState((userBookmark.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    const totalPageCookie = Cookies.get("totalPagesMyBookmark")
    const [totalPagesMyBookmark, setTotalPagesMyBookmark] =
                    useState((userBookmark.length > 0) && totalPageCookie ? JSON.parse(totalPageCookie) : 2)
    const observerMyBookmarkRef = useRef<HTMLDivElement>(null)

     useHandleObserverGeneral({ 
            setIsVisibleGeneral: setIsVisibleMyBookmark, 
            loadingGeneral: loadingMyBookmark, 
            hasMoreGeneral: hasMoreMyBookmark, 
            observerGeneralRef: observerMyBookmarkRef })

    usePageChangeMyBookmark({
        setLoadingMyBookmark, 
        setCurrentPageMyBookmark, 
        currentPageMyBookmark,
        setTotalPagesMyBookmark, 
        totalPagesMyBookmark, 
        setHasMoreMyBookmark, 
        userBookmark, 
        setUserBookmark, 
        isVisibleMyBookmark,
        urlName: verify_access_token_send_bookmark_by_page,
        accessToken,
        userBookmarkIds,
    })

    //redirect if not logged in
    // useIfNotLoggedIn({isLoggedin, router})
    
    //handles body overflow hidden
    useBodyOverflowHidden({showModal: showArticleModal})

    useScrollPosition({path: "myBookmarkScroll"})

    useSetPageCookiesGeneral({
        currentPage: currentPageMyBookmark, 
        currentPageCookie: "currentPageMyBookmark", 
        totalPages: totalPagesMyBookmark, 
        totalPagesCookie: "totalPagesMyBookmark",})
   
    return (
    isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"My Page | ブックマーク"}
            description={""}
            noIndex={true}
            defaultURL={true}
        />    
        <div className="w-full mx-auto mb-64">
            <ConfirmDeleteBookmarkModal item={myBookmarkDeleteItem}/>
        {/* if user state is neither null nor undefined, display items here based on the bookmark array*/}
        <h1 className="h1 flexJustifyCenter">
            <div className="text-indigo-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                <BsBookmarks />
            </div>
            <div className="pt-1">
                <Language jp={`ブックマーク`} en={`My Bookmarks`} />
            </div>
        </h1>
        <div className="outer">
            {handleBookmarkItems({userBookmark, observerMyBookmarkRef})}
        </div>
        {loadingMyBookmark && <div className="text-center my-10"><LoaderSmall /></div>}
    </div>
    </> :
    <LoaderPage />)
}
export default MyPage
