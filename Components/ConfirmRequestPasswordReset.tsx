import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'

const ConfirmRequestPasswordReset = () => {
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const {loadingResetPassword, setLoadingResetPassword} = pageContext
    const {modalToggleConfirmRequestPasswordReset,
setModalToggleConfirmRequestPasswordReset } = modalContext  

    return <ConfirmModal
                loadingModal={loadingResetPassword}
                modalToggleConfirm={modalToggleConfirmRequestPasswordReset}
                setModalToggleConfirm={setModalToggleConfirmRequestPasswordReset}
                translationKey={"requestPasswordReset"}
            />
}

export default ConfirmRequestPasswordReset
