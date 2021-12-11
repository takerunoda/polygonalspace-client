import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'

const ConfirmResendConfirmation = () => {
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const {loadingResend} = pageContext
    const {resendConfirmModalToggleConfirm,
setResendConfirmModalToggleConfirm } = modalContext  

    return <ConfirmModal
                loadingModal={loadingResend}
                modalToggleConfirm={resendConfirmModalToggleConfirm}
                setModalToggleConfirm={setResendConfirmModalToggleConfirm}
                translationKey={"resendConfirmation"}
            />
}

export default ConfirmResendConfirmation
