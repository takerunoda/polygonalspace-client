import React, { Dispatch, SetStateAction, useRef } from 'react'
import { clickOutsideModal } from '../utils/clickOutsideModal'

interface PageProps {
    message: string | JSX.Element, 
    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
    showMessageModal: boolean, 
    setShowMessageModal: Dispatch<SetStateAction<boolean>>
}

const MessageModal = ({message, setMessage, showMessageModal, setShowMessageModal} : PageProps) => {

    const modalRef = useRef<HTMLDivElement>(null)   

    return message ? (
    <div 
        className={`fixed z-50 pt-0 left-0 top-0 w-full h-full overflow-auto sm:mx-auto leading-loose tracking-widest text-base md:text-xl bg-opacity-0 bg-gray ${showMessageModal ? "block" : "hidden"}`} 
        onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal:setShowMessageModal})}>
            <div className="bg-white w-10/12 sm:w-2/3 max-w-xl rounded border-2 border-blue-400 mt-10 mx-auto py-4 px-3 overflow-y-scroll z-50 relative" ref={modalRef}>
                <div className="text-center">
                        <div className="text-base font-bold">{message}</div>
                </div>
            </div>
    </div>
    ) : null
}

export default MessageModal
