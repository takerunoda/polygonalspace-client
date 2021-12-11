import { PostInterface } from "../Interfaces";
import { post, update_post } from "./urls";
import { handleRequestAccessToken } from "./handleRequestAccessToken";

interface FunctionProps {
   response: any, 
   userPostData: any     
}

export const updatePost = async ({response, userPostData} : FunctionProps) => {
                const accessToken = await response.accessToken
                  try { 
                        const response = await handleRequestAccessToken({
                                urlData: update_post,
                                requestType: "POST",
                                inputData: {userPostData: userPostData},
                                accessToken: accessToken,})
                        const ok = await response.data.ok
                        if(ok !== true){
                                throw new Error("request failed")
                        }
                        const publishedData = await response.data.postData
                        } 
                    catch (err: any) {
                            console.log(err)
                            return
                    }
                }