import { handleRequest } from "./handleRequest";
import { get_one_blog_post_slug } from "./urls";

export const getBlogPostBySlug = async (slugToSend: {slug: string}) => {
        try {
            const response = await handleRequest({
                    urlName: get_one_blog_post_slug,
                    requestType: "POST",
                    inputData: slugToSend,
                })
            
        const ok = response && await response.data.ok
        if(ok === true){
                const data = response && response.data.blogPosts
                return data
        } else {
                throw new Error("getBlogPostBySlug request failed")
        }                
        } catch (err) {
                console.log(err);
                
        }
    }