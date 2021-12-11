import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Language from './Language'
import { usePageContext } from '../context/PageContext'
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext'
import { translation } from '../utils/translation'
import { clickOutsideModal } from '../utils/clickOutsideModal'
import { handleDeleteAccount } from '../utils/handleDeleteAccount'


interface ComponentProps {
            loadingModal: boolean
            modalToggleConfirm: boolean
            setModalToggleConfirm: Dispatch<SetStateAction<boolean>>
            translationKey: string
            inputData: {
                userEmail: string
                password: string
            }
            setErrorData: Dispatch<SetStateAction<{
                userEmailError: string
                passwordError: string
            }>>

        }

const ConfirmModalDeleteAccountGoogle = (
    { loadingModal, modalToggleConfirm, setModalToggleConfirm, translationKey, inputData, setErrorData } : ComponentProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const { accessToken,
            setAccessToken, 
            setUserId, 
            setUserEmail, 
            setUserStatus, 
            setLoginType, 
            isLoggedin, setIsLoggedin            
        } = userContext            
    const { showMessageModal, 
            setShowMessageModal, 
            message, 
            setMessage            
        } = modalContext
    const {language, timeoutId, setTimeoutId, loadingDeleteAccount, setLoadingDeleteAccount} = pageContext
    const router = useRouter()
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        showMessageModal && setModalToggleConfirm(false)
    }, [showMessageModal])

    const [translationObject] = useState(translation.filter(item => item.key === translationKey)[0])

    return <div 
        className={`fixed z-50 pt-0 right-0 bottom-0 w-full h-full overflow-auto sm:mx-auto leading-loose tracking-widest text-base md:text-xl bg-opacity-0 bg-gray ${modalToggleConfirm ? "block" : "hidden"}`} 
        onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal:setModalToggleConfirm})}>
            {<div className="bg-white w-72 sm:w-96 rounded border-2 border-blue-400 mt-56 mx-auto py-4 px-1 overflow-y-scroll z-50 relative" ref={modalRef}>
                <div className="w-full mx-auto text-center">
                    <div className="p-5">
                        <div className="font-bold">
                            <Language jp={translationObject.jp} en={translationObject.en}/>                            
                        </div>
                            <div className="mt-2">
                                <button className="buttonIndigo mr-4" onClick={() => handleDeleteAccount({inputData, setErrorData, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, language, setLoadingDeleteAccount, accessToken, setModalToggleConfirm})}>Yes</button>            
                                <button className="buttonPurple" onClick={() => setModalToggleConfirm(false)}>No</button>
                            </div>
                    </div>                    
                </div>
            </div>}
    </div>
}

export default ConfirmModalDeleteAccountGoogle
