import React from 'react'
import { useRouter } from 'next/router';
import { usePostContext } from '../context/PostContext';
import { useUserContext } from '../context/UserContext';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { handlePublishPost } from '../utils/handlePublishPost';
import { handleUpdatePost } from '../utils/handleUpdatePost';

const UpdatePostYesButton = () => {
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
    const {draftConfirmUpdate, setDraftConfirmUpdate, readyToPublish, setReadyToPublish,} = postContext
    const router = useRouter()


    const handleOnclick = async () => {
        handleUpdatePost({
            setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark, router, readyToPublish, setDraftConfirmUpdate, setShowArticleModal, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
        }
    return (
        <>
        {/* {`readyToPublish: ${JSON.stringify(readyToPublish)}`} */}
            <button className="buttonIndigo mr-4" onClick={handleOnclick}>Yes</button>            
        </>
    )
}

export default UpdatePostYesButton
