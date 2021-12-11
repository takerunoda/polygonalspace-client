import React from 'react'
import { useRouter } from 'next/router';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { handleResendConfirmation } from '../utils/handleResendConfirmation';

const ResendConfirmationYesButton = () => {
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
    const { inputDataResend, setInputDataResend } = userContext
    const {image, language, timeoutId, setTimeoutId, loadingResend, setLoadingResend,} = pageContext
    const {showMessageModal, setShowMessageModal, message, setMessage, setResendConfirmModalToggleConfirm } = modalContext
    const router = useRouter()

    return (
        <>
            <button className="buttonIndigo mr-4" onClick={() => 
                handleResendConfirmation({inputData: inputDataResend, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, language, setLoadingGeneral: setLoadingResend, setResendConfirmModalToggleConfirm})
                }>Yes</button>            
        </>
    )
}

export default ResendConfirmationYesButton
