import { handleRequest } from "./handleRequest";
import { get_one_blog_post } from "./urls";

export const getBlogPostById = async (idToSend: {postId: string}) => {
            const response = await handleRequest({
                    urlName: get_one_blog_post,
                    requestType: "POST",
                    inputData: idToSend,
            })
            
    const ok = await response.data.ok
        if(ok === true){
                const data = response.data.blogPosts
                return data
        } else {
                return
        }
    }