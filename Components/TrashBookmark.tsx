import React from 'react'
import { usePageContext } from '../context/PageContext'
import { useFunctionsContext } from '../context/FunctionsContext'
import { BookmarkItemInterface } from '../Interfaces'
import LoaderSmall from './LoaderSmall'
import { FaTrash } from 'react-icons/fa'

interface ComponentProps {
    item:  BookmarkItemInterface
}

const TrashBookmark = ({ item } : ComponentProps) => {
    const { loadingDeleteBookmark } = usePageContext()  
    const { handleOnclickDeleteBookmarkFn }  = useFunctionsContext()

    return (
        <>
            <div className="h-12">
                {!loadingDeleteBookmark ?  
                <button className="bg-transparent-500 text-4xl sm:text-4xl text-gray-500 hover:text-gray-400 font-bold rounded ml-4" 
                onClick={() => handleOnclickDeleteBookmarkFn({item})}>
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
