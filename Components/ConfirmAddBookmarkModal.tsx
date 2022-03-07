import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'

const ConfirmAddBookmarkModal = () => {
    const {loadingClickBookmark} = usePageContext()
    const {addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, } = useModalContext()  

    return <ConfirmModal
                loadingModal={loadingClickBookmark}
                modalToggleConfirm={addBookmarkModalToggleConfirm}
                setModalToggleConfirm={setAddBookmarkModalToggleConfirm}
                translationKey={"addBookmark"}
            />
}

export default ConfirmAddBookmarkModal
