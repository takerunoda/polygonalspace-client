import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language'
import { BookmarkItemInterface, ImageInterface } from '../Interfaces'
interface FunctionProps {
    item: any
    isLoggedin: boolean
    setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
    setMyBookmarkAddItem: Dispatch<SetStateAction<ImageInterface | BookmarkItemInterface | null>>
    userBookmarkIds: string[]
    handleMessageModal: ({ messageData }: {
        messageData: string | JSX.Element;
    }) => void
}

export const handleConfirmBookmarkTwo = ({ item, isLoggedin, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds, handleMessageModal} : FunctionProps) => {
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
        
        handleMessageModal({messageData})
        return
    }  
        if(userBookmarkIds.includes(item.imageId)){
            const  messageData = <Language jp={<p>ブックマーク済みのアイテムです。<span className="text-lg"> </span></p>} en={<p>Already Bookmarked</p>}/>
        handleMessageModal({messageData})
        return
    }

        item && setMyBookmarkAddItem(item)
        setAddBookmarkModalToggleConfirm(true) 
    
}
