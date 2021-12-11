import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router';
import { usePageContext } from '../context/PageContext';
import { usePostContext } from '../context/PostContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { deletePost } from '../utils/deletePost';
import { handleDeletePost } from '../utils/handleDeletePost';

interface ComponentProps {
    data: any
    setData: Dispatch<SetStateAction<any>>
}

const DeletePostYesButton = ({data, setData} : ComponentProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const postContext = usePostContext()
        if ( !postContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const { setAccessToken, 
            setUserEmail, 
            setUserId, 
            setIsLoggedin,
            setUserStatus, 
            loginType,
            setLoginType,
        } = userContext
            
    const { postDeleteItem, allPost, setAllPost }  = postContext    
    const { setUserBookmark }  = bookmarkContext
    const { showMessageModal, 
            setShowMessageModal, 
            setMessage,
            postModalToggleConfirm, setPostModalToggleConfirm,          
        } = modalContext
    const {timeoutId, setTimeoutId, loadingPostModal, setLoadingPostModal} = pageContext
    const router = useRouter()

    return (
        <>
            <button className="buttonIndigo mr-4" onClick={() => postDeleteItem && handleDeletePost({item: postDeleteItem, setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, loginType, setLoginType, setLoadingPostModal, router, deleteAction: deletePost, data, setData, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setPostModalToggleConfirm, setUserBookmark
            })}>Yes</button>            
        </>
    )
}

export default DeletePostYesButton
