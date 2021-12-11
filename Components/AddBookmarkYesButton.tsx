import React from 'react'
import { useRouter } from 'next/router';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { clickBookmark } from '../utils/clickBookmark';

const AddBookmarkYesButton = () => {
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

    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }

    const {userEmail, isLoggedin, setUserEmail, setAccessToken, setUserId, setIsLoggedin, userStatus, setUserStatus, loginType, setLoginType, userBookmarkIds, setUserBookmarkIds } = userContext

    const {timeoutId, setTimeoutId, loadingClickBookmark, setLoadingClickBookmark} = pageContext

    const {userBookmark, setUserBookmark, myBookmarkAddItem, setMyBookmarkAddItem,} = bookmarkContext

    const {showMessageModal, setShowMessageModal, message, setMessage, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, showDetailsModal, setShowDetailsModal,} = modalContext

    const router = useRouter()

    return (
        <>
            <button className="buttonIndigo mr-4" onClick={() => myBookmarkAddItem && myBookmarkAddItem.imageId && clickBookmark(
                {id: myBookmarkAddItem.imageId, userBookmark, setUserBookmark, showMessageModal, setShowMessageModal, userEmail, setUserEmail, setAccessToken, setUserId, isLoggedin, setIsLoggedin, userStatus, setUserStatus, setLoginType, router, image: myBookmarkAddItem, setShowDetailsModal, setAddBookmarkModalToggleConfirm, setMessage,
                timeoutId, setTimeoutId,
                userBookmarkIds, setUserBookmarkIds, loadingClickBookmark, setLoadingClickBookmark
                }
                )}>Yes</button>            
        </>
    )
}

export default AddBookmarkYesButton
