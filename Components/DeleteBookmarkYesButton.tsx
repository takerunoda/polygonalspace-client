import React from 'react'
import { useRouter } from 'next/router';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { handleDeleteBookmark } from '../utils/handleDeleteBookmark';

const DeleteBookmarkYesButton = () => {
    const userContext = useUserContext()
        if ( !userContext ) {
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
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const { setAccessToken, 
            setUserEmail, 
            setUserId, 
            setIsLoggedin,
            setUserStatus, 
            setLoginType,
            userBookmarkIds, setUserBookmarkIds,      
        } = userContext  
    const { userBookmark, 
            setUserBookmark,
            myBookmarkDeleteItem,
        } = bookmarkContext
    const { setShowBookmarkModal,
            showMessageModal, 
            setShowMessageModal, 
            setMessage,
        } = modalContext
    const {timeoutId, setTimeoutId, loadingMyBookmarkModal, setLoadingDeleteBookmark } = pageContext
    const router = useRouter()

    return (
        <>
            <button 
            className="buttonIndigo mr-4" 
            onClick={() => myBookmarkDeleteItem && handleDeleteBookmark({item: myBookmarkDeleteItem, setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, router, setLoadingDeleteBookmark, userBookmark, setUserBookmark, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setShowBookmarkModal, userBookmarkIds, setUserBookmarkIds
            })}>Yes</button>
        </>
    )
}

export default DeleteBookmarkYesButton
