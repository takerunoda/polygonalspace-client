import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import { BookmarkItemInterface } from '../Interfaces'

interface FunctionProps {
            item: BookmarkItemInterface | null
        }

const ConfirmDeleteBookmarkModal = ({ item } : FunctionProps) => {
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const { myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm,          
        } = modalContext
    const {loadingDeleteBookmark, setLoadingDeleteBookmark } = pageContext

    return !loadingDeleteBookmark ? <ConfirmModal
                loadingModal={loadingDeleteBookmark}
                modalToggleConfirm={myBookmarkModalToggleConfirm}
                setModalToggleConfirm={setMyBookmarkModalToggleConfirm}
                translationKey={"deleteBookmark"} /> : <></>
            }

export default ConfirmDeleteBookmarkModal
