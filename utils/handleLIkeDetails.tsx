import { Dispatch, SetStateAction } from "react"
import { PostInterface, BookmarkItemInterface } from "../Interfaces"

interface ObjectProps {
    id: string, 
    item: BookmarkItemInterface | PostInterface
}

interface FunctionProps {
        updateNoAuth:  ({ id, item }: ObjectProps) => Promise<void>
        post: BookmarkItemInterface | PostInterface, 
        setPost: Dispatch<SetStateAction<BookmarkItemInterface | PostInterface | null>>
}

export const handleLikeDetails = ({updateNoAuth, post, setPost} : FunctionProps) => {
        if(post){
        
        let updateItem = {...post, likeStatus: !post.likeStatus}
        const currentLike = updateItem.like ?? 0        
            
        let updateItemData
        if(!post.likeStatus){
                updateItemData = {...updateItem, like: currentLike + 1}
        } else {
                 const newLike = currentLike !== 0 ? currentLike - 1 : currentLike
                updateItemData = {...updateItem, like: newLike}
        }

            setPost(updateItemData)
            post._id && updateNoAuth({id: post._id, item: updateItemData})
        } 
    }