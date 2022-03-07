import React from 'react'
import { usePageContext } from '../context/PageContext'
import LoaderSmall from './LoaderSmall'
import { BsBookmarkPlus } from 'react-icons/bs'

interface FunctionProps {  handleConfirm: () => Promise<void>  }

const BookmarkButtonTwo = (
    {handleConfirm} : FunctionProps) => {
    const { loadingClickBookmark } = usePageContext()

    return (<>
        <div className="h-16 w-16 mx-auto">
            {!loadingClickBookmark ? <div className=" hover:opacity-60">
                <button className="
                text-blue-500 
                border-blue-500
                border-2 
                p-3 
                md:p-4 
                rounded-full 
                text-3xl 
                md:text-4xl 
                hover:text-purple-500
                hover:border-purple-500" 
                onClick={handleConfirm}>
                    <BsBookmarkPlus />
                </button>
            </div> :
            <div className="pt-4">
                <LoaderSmall />
            </div>}
        </div>
    </>)}

export default BookmarkButtonTwo