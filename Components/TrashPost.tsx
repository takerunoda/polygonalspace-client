import React from 'react'
import { FaTrash } from 'react-icons/fa'
import LoaderSmall from './LoaderSmall'
import { PostInterface } from '../Interfaces'
import { usePostContext } from '../context/PostContext'
import { useModalContext } from '../context/ModalContext'
import { handleOnclickDeletePost } from '../utils/handleOnclickDeletePost'

interface ComponentProps {
    item:  PostInterface
}

const TrashPost = ({ item } : ComponentProps) => {
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const postContext = usePostContext()
        if ( !postContext ) {
            return null
        }
    const { setPostModalToggleConfirm} = modalContext  
    const {setPostDeleteItem, loadingDeletePost} = postContext         
    
    return (
        <>
            <div className="">
                {!loadingDeletePost ?  
                <button className="bg-transparent-500 text-2xl sm:text-3xl text-gray-500 hover:text-gray-400 font-bold rounded" 
                onClick={() => handleOnclickDeletePost({item: item, setPostDeleteItem, setPostModalToggleConfirm})}>
                    <FaTrash />
                </button> : 
                <div className="pr-8">
                    <LoaderSmall />
                </div>
                }
            </div>
        </>
    )
}

export default TrashPost
