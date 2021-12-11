import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language'
import { BookmarkItemInterface, ImageInterface } from '../Interfaces'
import { handleMessageModal } from './handleMessageModal'
interface FunctionProps {
    item: any
    isLoggedin: boolean
    showMessageModal: boolean
    setShowMessageModal: Dispatch<SetStateAction<boolean>>
    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
    timeoutId: NodeJS.Timeout | null | undefined
    setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
    addBookmarkModalToggleConfirm: boolean
    setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
    setMyBookmarkAddItem: Dispatch<SetStateAction<ImageInterface | BookmarkItemInterface | null>>
    userBookmarkIds: string[]
}

export const handleConfirmBookmarkTwo = ({ item, isLoggedin, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds} : FunctionProps) => {
    if(!isLoggedin){
        const messageData = <Language jp={<>
            <p>ブックマークするにはログインが必要です
                <span className="text-lg"> 🔐</span>
            </p>
        </>} en={<>
            <p>Login is required to bookmark
                <span className="text-lg"> 🔐</span>
            </p>
        </>}/>
        
        handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
        return
    }  
        if(userBookmarkIds.includes(item.imageId)){
            const  messageData = <Language jp={<p>ブックマーク済みのアイテムです。<span className="text-lg"> </span></p>} en={<p>Already Bookmarked</p>}/>
        handleMessageModal({
            showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
        return
    }

        item && setMyBookmarkAddItem(item)
        setAddBookmarkModalToggleConfirm(true) 
    
}
