import { handleRequest } from "./handleRequest";
import { send_all_shared_bookmarks } from "./urls";

export const getAllSharedBookmarks = async () => { 
  try { 
            const response = await handleRequest({
                    urlName: send_all_shared_bookmarks,
                    requestType: "POST",
                    inputData: null,
            })
    const ok = response.data.ok
    if(ok !== true) {
      throw new Error("request failed")
    }
    const x = response.data.BookmarkItems 
    const y = x.filter((item: any) => item.public === true)   
    return y
  } catch(err) { 
      console.log(err) 
    return
  }
}