import React, { Dispatch, SetStateAction } from 'react'
import Language from './Language';
import { VscChromeClose } from 'react-icons/vsc';

interface ComponentProps {
    toggleModal: Dispatch<SetStateAction<boolean>>
}

const CloseModal = ({toggleModal}: ComponentProps) => {
    return (<div className="flex justify-between w-10/12 mx-auto">
                            <div className="mt-4">
                                <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-4 rounded" onClick={() => toggleModal(false)}>
                                    <div className="text-white flex font-bold">
                                        <div className="mt-1 mr-2 text-xl">
                                            <VscChromeClose />
                                        </div>
                                        <div className="text-lg">
                                            <Language jp={"モーダルを閉じる"} en={"Close Modal"}/>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        )
                    }

export default CloseModal