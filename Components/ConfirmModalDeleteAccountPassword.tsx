import React, { useRef, useState } from 'react'
import { useModalContext } from '../context/ModalContext'
import { useFunctionsContext } from '../context/FunctionsContext'
import Language from './Language'
import { translation } from '../utils/translation'
import { clickOutsideModal } from '../utils/clickOutsideModal'
import useModalToggleConfirmDeleteAccount from '../utils/useModalToggleConfirmDeleteAccount'

interface ComponentProps {
            inputData: {
                userEmail: string
                password: string
            }}

const ConfirmModalDeleteAccountPassword = (
    { inputData } : ComponentProps) => {
    const { handleDeleteAccountFn} = useFunctionsContext()   
    const { modalToggleConfirmDeleteAccount,
            setModalToggleConfirmDeleteAccount } = useModalContext()
    const modalRef = useRef<HTMLDivElement>(null)
    const [translationObject] = useState(translation.filter(item => item.key === "deleteAccountPassword")[0])
    useModalToggleConfirmDeleteAccount()

    return <div 
        className={`fixed z-50 pt-0 right-0 bottom-0 w-full h-full overflow-auto sm:mx-auto leading-loose tracking-widest text-base md:text-xl bg-opacity-0 bg-gray ${modalToggleConfirmDeleteAccount ? "block" : "hidden"}`} 
        onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal:setModalToggleConfirmDeleteAccount})}>
            {<div className="bg-white w-72 sm:w-96 rounded border-2 border-blue-400 mt-56 mx-auto py-4 px-1 overflow-y-scroll z-50 relative" ref={modalRef}>
                <div className="w-full mx-auto text-center">
                    <div className="p-5">
                        <div className="font-bold mb-4 sm:mb-8">
                            <Language jp={translationObject.jp} en={translationObject.en}/>                            
                        </div>
                            <div className="mt-2">
                                <button className="buttonIndigo mr-4" onClick={() => handleDeleteAccountFn({inputData})}>Yes</button>            
                                <button className="buttonPurple" onClick={() => setModalToggleConfirmDeleteAccount(false)}>No</button>
                            </div>
                    </div>                    
                </div>
            </div>}
    </div>}

export default ConfirmModalDeleteAccountPassword
