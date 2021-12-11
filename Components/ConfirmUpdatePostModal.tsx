import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext';
import { usePostContext } from '../context/PostContext';

const ConfirmUpdatePostModal = ({}) => {
    const pageContext = usePageContext()
        if (!pageContext ) {
            return null;
        }
    const postContext = usePostContext()
        if (!postContext ) {
            return null;
        }
    const {loadingAddPost, setLoadingAddPost,} = pageContext
    const {draftConfirmUpdate, setDraftConfirmUpdate} = postContext

    return <ConfirmModal
                loadingModal={loadingAddPost}
                modalToggleConfirm={draftConfirmUpdate}
                setModalToggleConfirm={setDraftConfirmUpdate}
                translationKey={"updatePost"}
            />
            }

export default ConfirmUpdatePostModal
