import React, { Dispatch, SetStateAction } from 'react'
import { PostInterface, BookmarkItemInterface } from '../Interfaces'
import { handleLike } from '../utils/handleLike'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

interface ObjectProps {
    id: string, 
    item: PostInterface | BookmarkItemInterface
}

interface FunctionProps {
    post: PostInterface | BookmarkItemInterface,
    updateNoAuth:  ({ id, item }: ObjectProps) => Promise<void>
    postData: PostInterface[] | BookmarkItemInterface[],
    setPostData: Dispatch<SetStateAction<PostInterface[] | BookmarkItemInterface[]>>
}

const LikeTwo = ({post, updateNoAuth, postData, setPostData} : FunctionProps) => {
        const handleOnClick = () => {
                handleLike({
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

export default LikeTwo
