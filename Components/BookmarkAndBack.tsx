import React from 'react'
import Language from './Language'
import LoaderSmall from './LoaderSmall'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import { handleNASAModalClose } from '../utils/handleNASAModalClose'
import { BsBookmarkPlus } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'

interface FunctionProps { handleConfirm: () => Promise<void>}

const BookmarkAndBack = (
    {handleConfirm} : FunctionProps) => {
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const { loadingClickBookmark } = pageContext
    const {setShowDetailsModal, setAddBookmarkModalToggleConfirm} = modalContext  
    
    return (    <>
                <div className="flex justify-between w-56 my-7">
                    {!loadingClickBookmark ? <div className=" hover:opacity-60">
                        <button className="
                        text-blue-500 
                        border-blue-500
                        border-2 
                        p-4 
                        rounded-full 
                        text-4xl 
                        hover:text-purple-500
                        hover:border-purple-500" 
                        onClick={handleConfirm}>
                            <BsBookmarkPlus />
                        </button>
                    </div> :
                    <div className="my-4">
                        <LoaderSmall />
                    </div>
                    }
                    <div className="mt-2">
                        <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-4 rounded" 
                        onClick={
                            () => handleNASAModalClose({setShowDetailsModal,setAddBookmarkModalToggleConfirm})}>
                            <div className="text-white flex font-bold">
                                <div className="mt-1 mr-2 text-xl">
                                    <VscChromeClose />
                                </div>
                                <div className="text-lg">  
                                    <Language jp={"閉じる"} en={"Close"}/>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                </>
                
    )
}

export default BookmarkAndBack