import React from 'react'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import ConfirmModal from './ConfirmModal'

const ConfirmRequestPasswordReset = () => {
    const {loadingResetPassword} = usePageContext()
    const {modalToggleConfirmRequestPasswordReset,
            setModalToggleConfirmRequestPasswordReset 
        } = useModalContext()  

    return <ConfirmModal
                loadingModal={loadingResetPassword}
                modalToggleConfirm={modalToggleConfirmRequestPasswordReset}
                setModalToggleConfirm={setModalToggleConfirmRequestPasswordReset}
                translationKey={"requestPasswordReset"}
            />
}

export default ConfirmRequestPasswordReset
