import React from 'react'
import { useFunctionsContext } from '../context/FunctionsContext';
import { useUserContext } from '../context/UserContext';

const AddBookmarkYesButton = () => {
    const { myBookmarkAddItem } = useUserContext()
    const { clickBookmarkFunction } = useFunctionsContext()

    return (
        <>
            <button className="buttonIndigo mr-4" onClick={() => myBookmarkAddItem && myBookmarkAddItem.imageId && 
            clickBookmarkFunction()
                }>Yes</button>            
        </>)}

export default AddBookmarkYesButton
