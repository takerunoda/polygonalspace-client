import React, { useEffect, useRef } from 'react'
import Language from './Language'
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext'
import { useSearchContext } from '../context/SearchContext'
import { useBookmarkContext } from '../context/BookmarkContext'
import { clickOutsideModal } from '../utils/clickOutsideModal'
import { VscChromeClose } from 'react-icons/vsc';

const SearchSettingModal = () => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }    
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const searchContext = useSearchContext()
    if ( !searchContext ) {
            return null;
        }
    const {showMessageModal} = modalContext  
    const { mediaPreference, setMediaPreference,
            sortPreference, setSortPreference,
            showSearchSettings, setShowSearchSettings   } = searchContext
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        showMessageModal && setShowSearchSettings(false)
    }, [showMessageModal])


return <div 
        className={`fixed z-50 pt-0 right-0 bottom-0 w-full h-full overflow-auto sm:mx-auto leading-loose tracking-widest text-base md:text-lg bg-opacity-0 bg-gray ${showSearchSettings ? "block" : "hidden"}`} 
        onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal:setShowSearchSettings})}>
        {<div className="bg-white w-72 xs:w-8/12  max-w-sm rounded border-2 border-green-400 mt-21 mx-auto mt-12 pb-16 overflow-y-scroll z-50 relative" ref={modalRef}>
                            <div className="mt-4 w-12 left-0 mr-auto ml-5 sm:right-0 sm:ml-auto sm:mr-5 ">
                                <button className="text-purple-500" onClick={() => setShowSearchSettings(false)}>
                                    <div className="mt-1 mr-2 text-2xl sm:text-4xl">
                                        <VscChromeClose />
                                    </div>
                                </button>
                            </div>
            <div className="w-full mx-auto text-center">
                <div className=" w-10/12 sm:w-8/12 mx-auto ">
                    <div className="mb-5 sm:mb-10">
                        <div className="
                        text-base sm:text-lg font-bold mt-3 text-left mx-auto text-gray-500">
                            <Language jp={"表示順"} en={"Sort by"}/></div>
                        <div className="flex mt-3 text-left mx-auto text-sm sm:text-base">
                            <div className="flex">
                                <button className={`leading-6 border px-3 py-2 border-blue-500  rounded ${sortPreference ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`} onClick={() => setSortPreference(true)}>
                                <Language jp={"新しい順"} en={"Newest"}/>
                                </button>
                                <button className={`leading-6 ml-5 border px-3 py-2 border-blue-500  rounded ${!sortPreference ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`} onClick={() => setSortPreference(false)}>
                                    <Language jp={"古い順"} en={"Oldest"}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="
                        text-base sm:text-lg font-bold mt-3 text-left mx-auto text-gray-500">
                            <Language jp={"メディアの種類"} en={"Media Types"}/>
                        </div>
                        <div className="text-sm sm:text-base flex flex-wrap">
                            <label className={`flex mt-3 cursor-pointer mr-5 py-2 px-3 rounded  border border-blue-500 ${mediaPreference === 1 ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`}>
                                <span className="hidden"><input type="radio" checked={mediaPreference === 1} onChange={() => setMediaPreference(1)}/></span>
                                <p className="">
                                    <Language jp={"画像"} en={"Image"}/>
                                </p>
                            </label>
                            <label className={`flex mt-3 cursor-pointer mr-5 py-2 px-3 rounded  border border-blue-500 ${mediaPreference === 2 ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`}>
                                <span className="hidden"><input type="radio" checked={mediaPreference === 2} onChange={() => setMediaPreference(2)}/></span>
                                <p className="">
                                    <Language jp={"動画"} en={"Video"}/>
                                </p>
                            </label>
                            <label className={`flex mt-3 cursor-pointer mr-5 py-2 px-3 rounded  border border-blue-500 ${mediaPreference === 3 ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`}>
                                <span className="hidden"><input type="radio" checked={mediaPreference === 3} onChange={() => setMediaPreference(3)}/></span>
                                <p className="">
                                    <Language jp={"音声"} en={"Audio"}/>
                                </p>
                            </label>
                            <label className={`flex mt-3 cursor-pointer mr-5 py-2 px-3 rounded  border border-blue-500 ${mediaPreference === 4 ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`}>
                                <span className="hidden"><input type="radio" checked={mediaPreference === 4} onChange={() => setMediaPreference(4)}/></span>
                                <p className=""><Language jp={"画像 & 動画"} en={"Image & Video"}/></p>
                            </label>
                            <label className={`flex mt-3 cursor-pointer mr-5 py-2 px-3 rounded  border border-blue-500 ${mediaPreference === 5 ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`}>
                                <span className="hidden"><input type="radio" checked={mediaPreference === 5} onChange={() => setMediaPreference(5)}/></span>
                                <p className=""><Language jp={"画像 & 音声"} en={"Image & Audio"}/></p>
                            </label>
                            <label className={`flex mt-3 cursor-pointer mr-5 py-2 px-3 rounded  border border-blue-500 ${mediaPreference === 6 ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`}>
                                <span className="hidden"><input type="radio" checked={mediaPreference === 6} onChange={() => setMediaPreference(6)}/></span>
                                <p className=""><Language jp={"動画 & 音声"} en={"Video & Audio"}/></p>
                            </label>
                            <label className={`flex mt-3 cursor-pointer mr-5 py-2 px-3 rounded  border border-blue-500 ${mediaPreference === 7 ? "bg-blue-500 text-white" : "text-blue-500 bg-white"}`}>
                                <span className="hidden"><input type="radio" checked={mediaPreference === 7} onChange={() => setMediaPreference(7)}/></span>
                                <p className=""><Language jp={"全て"} en={"All"}/></p>
                            </label>
                        </div>

                    </div>
                    
                </div>

            </div>
        </div>} 
</div>
}

export default SearchSettingModal
