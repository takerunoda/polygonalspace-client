import React from 'react'
import { BsBookmarkPlus } from 'react-icons/bs'

interface FunctionProps {
    handleConfirm: any
}

const BookmarkButton = ({handleConfirm} : FunctionProps) => {
    return (
        <>
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
        </>
    )
}

export default BookmarkButton
