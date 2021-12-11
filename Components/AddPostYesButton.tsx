import React from 'react'
import { useRouter } from 'next/router';
import { usePostContext } from '../context/PostContext';
import { useUserContext } from '../context/UserContext';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { handlePublishPost } from '../utils/handlePublishPost';

const AddPostYesButton = () => {
    const userContext = useUserContext()
        if ( !userContext ) {
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
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const postContext = usePostContext()
        if ( !postContext ) {
            return null;
        }
    const {userEmail, setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, loginType, setLoginType} = userContext    
    const {  showMessageModal, setShowMessageModal, showArticleModal, setShowArticleModal, message, setMessage} = modalContext  
    const {timeoutId, setTimeoutId} = pageContext    
    const {setUserBookmark} = bookmarkContext
    const {draftConfirm, setDraftConfirm, readyToPublish, setReadyToPublish,} = postContext
    const router = useRouter()


    const handleOnclick = async () => {
        handlePublishPost({
            setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark, router, readyToPublish, setDraftConfirm, setShowArticleModal, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
        }
    return (
        <>
            <button className="buttonIndigo mr-4" onClick={handleOnclick}>Yes</button>            
        </>
    )
}

export default AddPostYesButton
