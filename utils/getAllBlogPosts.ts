import { handleRequest } from "./handleRequest";
import { send_all_blog_posts } from "./urls";

export const getAllBlogPosts = async () => { 
   try{ 
        const response = await handleRequest({
                urlName: send_all_blog_posts,
                requestType: "POST",
                inputData: null,
        })

        const x = await response.data.blogPosts
        const ok = await response.data.ok
                if(ok === true){
                        return x
                } else {
                        return []
                }
  } catch(err){ console.log(err)
    return
  }
}