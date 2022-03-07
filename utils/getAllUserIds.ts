import { handleRequest } from "./handleRequest";
import { send_all_userIds } from "./urls";

export const getAllUserIds = async () => {
   try{ 
        const response = await handleRequest({
                urlName: send_all_userIds,
                requestType: "POST",
                inputData: null,})

    const x: string[] = await response.data.userIds
    const ok = await response.data.ok
        if(ok === true){
                return x
        } else {
                return []
        }
  } catch(err){ 
        console.log(err)
    return
  }
}
