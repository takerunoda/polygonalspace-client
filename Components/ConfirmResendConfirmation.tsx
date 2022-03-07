import React from 'react'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import ConfirmModal from './ConfirmModal'

const ConfirmResendConfirmation = () => {
    const {loadingResend} = usePageContext()
    const {resendConfirmModalToggleConfirm,
            setResendConfirmModalToggleConfirm
        } = useModalContext()  

    return <ConfirmModal
                loadingModal={loadingResend}
                modalToggleConfirm={resendConfirmModalToggleConfirm}
                setModalToggleConfirm={setResendConfirmModalToggleConfirm}
                translationKey={"resendConfirmation"}
            />}

export default ConfirmResendConfirmation
