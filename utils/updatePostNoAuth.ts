import { PostInterface } from "../Interfaces";
import { handleRequest } from "./handleRequest";
import { post_update_no_auth } from "./urls";

interface FunctionProps {
                            id: string, 
                            item: PostInterface
                        }

export const updatePostNoAuth = async ({id, item} : FunctionProps) => {
        try { 
                const response = await handleRequest({
                        urlName: post_update_no_auth,
                        requestType: "PUT",
                        inputData: {postId: id, updateItem: item},
                })
                if(response.data.ok === true){
                    return
                } else  {
                    throw new Error("update failed")
                }} 
            catch (err: any) {
                    console.log(err)
                    return
                }
            }