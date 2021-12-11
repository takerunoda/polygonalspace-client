import { PostInterface } from "../Interfaces";
import { post } from "./urls";
import { handleRequestAccessToken } from "./handleRequestAccessToken";

interface FunctionProps {
   response: any, 
   userPostData: PostInterface     
}

export const publishPost = async ({response, userPostData} : FunctionProps) => {
                const accessToken = await response.accessToken
                  try { 
                        const response = await handleRequestAccessToken({
                                urlData: post,
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