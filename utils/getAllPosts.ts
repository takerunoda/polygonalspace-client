import { handleRequest } from "./handleRequest";
import { send_all_posts } from "./urls";

export const getAllPosts = async () => { 
   try{ 
        const response = await handleRequest({
                urlName: send_all_posts,
                requestType: "POST",
                inputData: null,
        })
        const x = await response.data.userPost
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