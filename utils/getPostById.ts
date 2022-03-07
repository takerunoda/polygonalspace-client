import { handleRequest } from "./handleRequest";
import { get_one_post_post } from "./urls";

export const getPostById = async (idToSend: {postId: string}) => {
            const response = await handleRequest({
                    urlName: get_one_post_post,
                    requestType: "POST",
                    inputData: idToSend,
            })
        const ok = await response.data.ok
                if(ok === true){
                        return response.data.postData
                } else {
                        return
                }
    }