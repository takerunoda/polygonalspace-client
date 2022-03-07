import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import Language from './Language'
import LoaderSmall from './LoaderSmall'
import AddBookmarkYesButton from './AddBookmarkYesButton'
import DeleteBookmarkYesButton from './DeleteBookmarkYesButton'
import ResendConfirmationYesButton from './ResendConfirmationYesButton'
import RequestPasswordResetYesButton from './RequestPasswordResetYesButton'
import { translation } from '../utils/translation'
import { clickOutsideModal } from '../utils/clickOutsideModal'
import { useShowModalGeneral } from '../utils/useShowModalGeneral'

interface ComponentProps {
            loadingModal: boolean
            modalToggleConfirm: boolean
            setModalToggleConfirm: Dispatch<SetStateAction<boolean>>
            translationKey: string
        }

const ConfirmModal = (
    { loadingModal, modalToggleConfirm, setModalToggleConfirm, translationKey } : ComponentProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const [translationObject] = useState(translation.filter(item => item.key === translationKey)[0])
    useShowModalGeneral({setShowModal: setModalToggleConfirm })


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
    </div>}

export default ConfirmModal
