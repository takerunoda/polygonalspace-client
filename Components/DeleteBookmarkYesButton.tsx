import React from 'react'
import { useUserContext } from '../context/UserContext';
import { useFunctionsContext } from '../context/FunctionsContext';

const DeleteBookmarkYesButton = () => {
    const { myBookmarkDeleteItem } = useUserContext()  
    const { handleDeleteBookmarkFn } = useFunctionsContext()

    return (
        <>
            <button 
            className="buttonIndigo mr-4" 
            onClick={() => myBookmarkDeleteItem && handleDeleteBookmarkFn({
                item: myBookmarkDeleteItem})}>Yes</button>
        </>
    )
}

export default DeleteBookmarkYesButton
