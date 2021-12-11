import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'

const ConfirmAddBookmarkCategoryModal = () => {
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const {loadingClickBookmark, setLoadingClickBookmark} = pageContext
    const {addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, } = modalContext  

    return <ConfirmModal
                loadingModal={loadingClickBookmark}
                modalToggleConfirm={addBookmarkModalToggleConfirm}
                setModalToggleConfirm={setAddBookmarkModalToggleConfirm}
                translationKey={"addBookmarkCategory"}
            />
}

export default ConfirmAddBookmarkCategoryModal
