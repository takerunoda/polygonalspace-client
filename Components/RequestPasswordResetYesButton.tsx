import React from 'react'
import { useRouter } from 'next/router';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { handleRequestPasswordReset } from '../utils/handleRequestPasswordReset';

const RequestPasswordResetYesButton = () => {
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
    const {inputDataRequestPasswordReset} = userContext
    const {image, language, timeoutId, setTimeoutId, loadingResetPassword, setLoadingResetPassword} = pageContext
    const {showMessageModal, setShowMessageModal, message, setMessage, setModalToggleConfirmRequestPasswordReset} = modalContext
    const router = useRouter()

    return (
        <>
            <button className="buttonIndigo mr-4" onClick={() => handleRequestPasswordReset({inputData: inputDataRequestPasswordReset, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, language, setLoadingResetPassword, setModalToggleConfirmRequestPasswordReset})}>Yes</button>            
        </>
    )
}

export default RequestPasswordResetYesButton
