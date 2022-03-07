import { handleRequest } from "./handleRequest";
import { get_one_post_post_slug } from "./urls";

export const getPostBySlug = async (slugToSend: {slug: string}) => {
                const response = await handleRequest({
                        urlName: get_one_post_post_slug,
                        requestType: "POST",
                        inputData: slugToSend,
                })
                const ok = await response.data.ok
                        if(ok === true){
                                return response.data.postData
                        } else {
                                return
                        }
                }