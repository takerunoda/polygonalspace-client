import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Language from './Language'
import LoaderSmall from './LoaderSmall'
import AddPostYesButton from './AddPostYesButton'
import DeletePostYesButton from './DeletePostYesButton'
import AddBookmarkYesButton from './AddBookmarkYesButton'
import DeleteBookmarkYesButton from './DeleteBookmarkYesButton'
import RequestPasswordResetYesButton from './RequestPasswordResetYesButton'
import { usePostContext } from '../context/PostContext'
import { useModalContext } from '../context/ModalContext'
import { translation } from '../utils/translation'
import { clickOutsideModal } from '../utils/clickOutsideModal'
import ResendConfirmationYesButton from './ResendConfirmationYesButton'
import UpdatePostYesButton from './UpdatePostYesButton'

interface ComponentProps {
            loadingModal: boolean
            modalToggleConfirm: boolean
            setModalToggleConfirm: Dispatch<SetStateAction<boolean>>
            translationKey: string
        }

const ConfirmModal = (
    { loadingModal, modalToggleConfirm, setModalToggleConfirm, translationKey } : ComponentProps) => {
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const postContext = usePostContext()
        if ( !postContext ) {
            return null;
        }
    const {showMessageModal, setShowMessageModal} = modalContext  
    const { allPost, setAllPost, userPost, setUserPost, categoryPost, setCategoryPost} = postContext  
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        showMessageModal && setModalToggleConfirm(false)
    }, [showMessageModal])

    const [translationObject] = useState(translation.filter(item => item.key === translationKey)[0])

    return <div 
        className={`fixed z-50 pt-0 right-0 bottom-0 w-full h-full overflow-auto sm:mx-auto leading-loose tracking-widest text-sm md:text-base bg-opacity-0 bg-gray ${modalToggleConfirm ? "block" : "hidden"}`} 
        onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal: setModalToggleConfirm})}>
            {!loadingModal ? <div className="bg-white w-72 sm:w-96 rounded border-2 border-blue-400 mt-56 mx-auto py-4 px-1 overflow-y-scroll z-50 relative" ref={modalRef}>
                <div className="w-full mx-auto text-center">
                    <div className="p-5">
                        <div className="font-bold mb-5">
                            <Language jp={translationObject.jp} en={translationObject.en} />
                        </div>
                            <div className="mt-2">
                                {translationObject.key === "addBookmark" && 
                                <AddBookmarkYesButton />}
                                {translationObject.key === "deleteBookmark" && <DeleteBookmarkYesButton />}
                                {translationObject.key === "addPost" && 
                                <AddPostYesButton />}
                                {translationObject.key === "updatePost" && 
                                <UpdatePostYesButton />}
                                {translationObject.key === "deletePost" && 
                                <DeletePostYesButton data={allPost} setData={setAllPost} />}
                                {translationObject.key === "deletePostUser" && 
                                <DeletePostYesButton  data={userPost} setData={setUserPost}/>}
                                {translationObject.key === "deletePostCategory" && 
                                <DeletePostYesButton  data={categoryPost} setData={setCategoryPost}/>}
                                {translationObject.key === "requestPasswordReset" && 
                                <RequestPasswordResetYesButton />}
                                {translationObject.key === "resendConfirmation" && 
                                <ResendConfirmationYesButton />}
                                <button className="buttonPurple" onClick={() => setModalToggleConfirm(false)}>No</button>
                            </div>
                    </div>                    
                </div>
            </div> : 
        <div className="mt-56 py-4">
            <LoaderSmall />
        </div>}
    </div>
}

export default ConfirmModal
