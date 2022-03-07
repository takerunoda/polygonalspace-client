import React from 'react'
import { PostInterface, BookmarkItemInterface } from '../Interfaces'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

interface FunctionProps {
    post: PostInterface | BookmarkItemInterface,
}

const LikeTwo = ({post} : FunctionProps) => {
            return (<div className="flex justify-between w-12">
                            <div className="mr-2 sm:mr-3">
                                {!post.likeStatus && <AiOutlineLike 
                                className="likeBtn"/>}
                                {post.likeStatus && <AiFillLike 
                                className="likeBtn"/>}
                            </div>
                            <div className="likeNumber mt-1 sm:mt-2">{post.like ?? 0}</div>
                    </div>)}

export default LikeTwo
