import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'

const ConfirmDeleteBookmarkModal = () => {
    const { myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm,          
        } = useModalContext()
    const {loadingDeleteBookmark } = usePageContext()

    return !loadingDeleteBookmark ? <ConfirmModal
                loadingModal={loadingDeleteBookmark}
                modalToggleConfirm={myBookmarkModalToggleConfirm}
                setModalToggleConfirm={setMyBookmarkModalToggleConfirm}
                translationKey={"deleteBookmark"} /> : <></>
            }

export default ConfirmDeleteBookmarkModal
