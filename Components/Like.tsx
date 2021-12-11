import React, { Dispatch, SetStateAction } from 'react'
import { PostInterface, BookmarkItemInterface } from '../Interfaces'
import { handleLikeDetails } from '../utils/handleLIkeDetails'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

interface ObjectProps {
    id: string, 
    item: BookmarkItemInterface | PostInterface
}

interface FunctionProps {
    updateNoAuth:  ({ id, item }: ObjectProps) => Promise<void>
    post: BookmarkItemInterface | PostInterface, 
    setPost: Dispatch<SetStateAction<BookmarkItemInterface | PostInterface | null>>
}

const Like = ({post, setPost, updateNoAuth} : FunctionProps) => {
        const handleOnclick = () => {
                handleLikeDetails({ updateNoAuth,
                                    post, 
                                    setPost})
                                }
            return (<div className="flex justify-between w-12 md:w-14 cursor-pointer" onClick={handleOnclick}>
                        <div className="mr-2 sm:mr-3">
                            {!post.likeStatus && 
                            <AiOutlineLike 
                                className="likeBtn"/>}
                            {post.likeStatus && 
                            <AiFillLike 
                                className="likeBtn"/>}
                        </div>
                            <div className="likeNumber mt-1 sm:mt-2">{post.like}</div>
                    </div>
                    )
                }

export default Like
