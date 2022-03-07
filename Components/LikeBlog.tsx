import React, { Dispatch, SetStateAction } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { handleLikeDetailsBlog } from '../utils/handleLIkeDetailsBlog'

interface FunctionProps {
    post: any, 
    setPost: Dispatch<SetStateAction<any | null>>
}

const LikeBlog = ({post, setPost} : FunctionProps) => {
        const handleOnclick = () => {
                handleLikeDetailsBlog({ 
                                    post, 
                                    setPost})}
            return (post && <div className="flex justify-between w-12 md:w-14 cursor-pointer" onClick={handleOnclick}>
                        <div className="mr-2 sm:mr-3">
                            {!post.likeStatus && 
                            <AiOutlineLike 
                                className="likeBtn"/>}
                            {post.likeStatus && 
                            <AiFillLike 
                                className="likeBtn"/>}
                        </div>
                            <div className="likeNumber mt-1 sm:mt-2">{post.like}</div>
                    </div>)}

export default LikeBlog
