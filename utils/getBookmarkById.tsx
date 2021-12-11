import { handleRequest } from "./handleRequest";
import { get_one_bookmark_post } from "./urls";

export const getBookmarkById = async (idDataToSend: {bookmarkId: string}) => {
        const response = await handleRequest({
                urlData: get_one_bookmark_post,
                requestType: "POST",
                inputData: idDataToSend,
        })
    
        const ok = await response.data.ok
                if(ok === true){
                        return response.data.postData
                } else {
                        return
                }
        }