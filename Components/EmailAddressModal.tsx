import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import CopyEmail from './CopyEmail'
import { clickOutsideModal } from '../utils/clickOutsideModal'
import { useShowModalGeneral } from '../utils/useShowModalGeneral';
import { VscChromeClose } from 'react-icons/vsc';

interface ComponentProps {
    showEmailAddress: boolean
    setShowEmailAddress: Dispatch<SetStateAction<boolean>>
}

const EmailAddressModal = ({showEmailAddress, setShowEmailAddress} : ComponentProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    useShowModalGeneral({setShowModal: setShowEmailAddress })
    const [emailAddress] = useState(process.env.NEXT_PUBLIC_EMAIL_ADDRESS)
    
return <div 
        className={`fixed z-50 pt-0 right-0 bottom-0 w-full h-full overflow-auto sm:mx-auto leading-loose tracking-widest text-base md:text-lg font-bold bg-opacity-0 bg-gray ${showEmailAddress ? "block" : "hidden"}`} 
        onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal:setShowEmailAddress})}>
        {<div className="bg-white w-11/12 md:w-6/12  max-w-sm rounded border-2 border-blue-400 mt-21 mx-auto mt-12 pb-10 overflow-y-scroll z-50 relative" ref={modalRef}>
                            <div className="mt-4 w-12 left-0 mr-auto ml-5 sm:right-0 sm:ml-auto sm:mr-5 ">
                                <button className="text-purple-500" onClick={() => setShowEmailAddress(false)}>
                                    <div className="mt-1 mr-2 text-xl sm:text-3xl">
                                        <VscChromeClose />
                                    </div>
                                </button>
                            </div>
                            <div className="w-full mx-auto text-center">
                                    <p className="text-gray-700">{emailAddress}</p>
                                    <CopyEmail copyText={emailAddress ?? ""} />
                                                                
                            </div>
        </div>} 
</div>
}

export default EmailAddressModal
