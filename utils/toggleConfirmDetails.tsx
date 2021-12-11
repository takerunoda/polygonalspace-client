import { Dispatch, SetStateAction } from "react"
import { PostInterface } from "../Interfaces"

interface FunctionProps {
post: PostInterface | null, 
setPost: Dispatch<SetStateAction<PostInterface| null>>
}


export const toggleConfirmDetails = ({post, setPost} : FunctionProps) => {
        if(post){
            let postData = 
            {...post, confirm:!post.confirm}
                setPost(postData)
            }
    }