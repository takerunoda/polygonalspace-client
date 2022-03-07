import { handleRequest } from "./handleRequest";
import { blog_update_no_auth } from "./urls";

interface FunctionProps {
                            id: string, 
                            slug: string, 
                            updatedLike: any
                        }

export const updateBlogNoAuth = async ({id, slug, updatedLike} : FunctionProps) => {
        try { 
                const response = await handleRequest({
                        urlName: blog_update_no_auth,
                        requestType: "PUT",
                        inputData: {postId: id, slug: slug, updateItem: updatedLike},
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