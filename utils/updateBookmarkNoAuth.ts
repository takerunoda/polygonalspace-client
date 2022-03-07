import { BookmarkItemInterface } from "../Interfaces";
import { handleRequest } from "./handleRequest";
import { bookmark_update_no_auth } from "./urls";

interface FunctionProps {
                        id: string, 
                        item: BookmarkItemInterface
                }


export const updateBookmarkNoAuth = async ({id, item} : FunctionProps) => {
        try { 
            const response = await handleRequest({
                    urlName: bookmark_update_no_auth,
                    requestType: "PUT",
                    inputData: {bookmarkId: id, updateItem: item},
            })
            if(response.data.ok === true ){
                    return
            } else {
                    throw new Error("update failed")
            }
        } 
        catch (err: any) {
                console.log(err)
                return
        }
}