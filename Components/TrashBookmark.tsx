import React from 'react'
import LoaderSmall from './LoaderSmall'
import { BookmarkItemInterface } from '../Interfaces'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import { useBookmarkContext } from '../context/BookmarkContext'
import { handleOnclickDeleteBookmark } from '../utils/handleOnclickDeleteBookmark'
import { FaTrash } from 'react-icons/fa'

interface ComponentProps {
    item:  BookmarkItemInterface
}

const TrashBookmark = ({ item } : ComponentProps) => {
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }
    const { setMyBookmarkModalToggleConfirm} = modalContext  
    const {setMyBookmarkDeleteItem} = bookmarkContext         
    const {loadingDeleteBookmark} = pageContext         
    
    return (
        <>
            <div className="h-12">
                {!loadingDeleteBookmark ?  
                <button className="bg-transparent-500 text-4xl sm:text-4xl text-gray-500 hover:text-gray-400 font-bold rounded ml-4" 
                onClick={() => handleOnclickDeleteBookmark({item: item, setMyBookmarkDeleteItem, setMyBookmarkModalToggleConfirm})}>
                    <FaTrash />
                </button> : 
                <div className="ml-1">
                    <LoaderSmall />
                </div>
                }
            </div>
        </>
    )
}

export default TrashBookmark
