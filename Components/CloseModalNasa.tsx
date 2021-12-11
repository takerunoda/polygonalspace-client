import React, { Dispatch, SetStateAction } from 'react'
import Language from './Language';
import { VscChromeClose } from 'react-icons/vsc';

interface ComponentProps {
    toggleModal: Dispatch<SetStateAction<boolean>>
}

const CloseModalNasa = ({toggleModal} : ComponentProps) => {
    return (
                        <div className="flex justify-center w-full mx-auto bg-gray-500 bg-opacity-70 py-4 sm:py-8 px-8 sm:px-12">
                            <div className="">
                                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-4 px-4 rounded" onClick={() => toggleModal(false)}>
                                    <div className="text-white flex font-bold">
                                        <div className="mt-1 mr-2 text-xl">
                                            <VscChromeClose />
                                        </div>
                                        <div className="text-base sm:text-lg">
                                                <Language jp={"モーダルを閉じる"} en={"Close Modal"}/>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        )}

export default CloseModalNasa