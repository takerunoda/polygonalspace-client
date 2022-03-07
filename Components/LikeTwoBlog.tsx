import React, { Dispatch, SetStateAction } from 'react'
import { handleLikeBlog } from '../utils/handleLikeBlog'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

interface ObjectProps {
    id: string, 
    updatedLike: any
}

interface FunctionProps {
    post: any,
    updateNoAuth:  ({ id, updatedLike }: ObjectProps) => Promise<void>
    postData: any[],
    setPostData: Dispatch<SetStateAction<any[]>>
}

const LikeTwoBlog = ({post, updateNoAuth, postData, setPostData} : FunctionProps) => {
        const handleOnClick = () => {
                handleLikeBlog({
                    item: post, 
                    updateNoAuth, 
                    postData, 
                    setPostData})
                }
            return (<div className="flex justify-between w-12 cursor-pointer "
                     onClick={handleOnClick}>
                            <div className="mr-2 sm:mr-3">
                                {!post.likeStatus && <AiOutlineLike 
                                className="likeBtn"/>}
                                {post.likeStatus && <AiFillLike 
                                className="likeBtn"/>}
                            </div>
                            <div className="likeNumber mt-1 sm:mt-2">{post.like ?? 0}</div>
                    </div>
                    )
                }

export default LikeTwoBlog
