import React from 'react'
import ConfirmModal from './ConfirmModal'
import { usePageContext } from '../context/PageContext';
import { usePostContext } from '../context/PostContext';

const ConfirmAddPostModal = ({}) => {
    const pageContext = usePageContext()
        if (!pageContext ) {
            return null;
        }
    const postContext = usePostContext()
        if (!postContext ) {
            return null;
        }
    const {loadingAddPost, setLoadingAddPost,} = pageContext
    const {draftConfirm, setDraftConfirm} = postContext

    return <ConfirmModal
                loadingModal={loadingAddPost}
                modalToggleConfirm={draftConfirm}
                setModalToggleConfirm={setDraftConfirm}
                translationKey={"addPost"}
            />
            }

export default ConfirmAddPostModal
