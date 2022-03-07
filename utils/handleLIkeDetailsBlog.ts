import { Dispatch, SetStateAction } from "react"
import { updateBlogNoAuth } from "./updateBlogNoAuth"

interface FunctionProps {
        post: any, 
        setPost: Dispatch<SetStateAction<any | null>>
}

export const handleLikeDetailsBlog = ({post, setPost} : FunctionProps) => {
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
            const updatedLike = {like: updateItemData.like}
            post.id && updateBlogNoAuth({id: post.id, slug: post.slug, updatedLike: updatedLike})
        } 
    }