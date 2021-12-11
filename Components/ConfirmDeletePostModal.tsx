import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'

const ConfirmDeletePostModal = () => {
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const { postModalToggleConfirm, setPostModalToggleConfirm } = modalContext
    const {loadingPostModal, setLoadingPostModal} = pageContext

    return <ConfirmModal
                loadingModal={loadingPostModal}
                modalToggleConfirm={postModalToggleConfirm}
                setModalToggleConfirm={setPostModalToggleConfirm}
                translationKey={"deletePost"}
            />
}

export default ConfirmDeletePostModal
