import { Dispatch, SetStateAction } from "react";
import { BookmarkItemInterface } from "../Interfaces";
import { change_public_status } from "./urls";
import { handleRequestAccessToken } from "./handleRequestAccessToken";

interface FuncctionProps {
    item: BookmarkItemInterface
    allBookmarks: BookmarkItemInterface[]
    setAllBookmarks: Dispatch<SetStateAction<BookmarkItemInterface[]>>
    accessToken: string
}
    export const handlePublic = async({item, allBookmarks, setAllBookmarks, accessToken} : FuncctionProps ) => {
        const newItem : BookmarkItemInterface = {...item, public: !item.public}
        try {       
            const response = await handleRequestAccessToken({
                    urlData: change_public_status,
                    requestType: "POST",
                    inputData: {itemId: item._id, publicStatus: item.public},
                    accessToken: accessToken,})

                    const ok = await response.data.ok
                    if(ok === true) {
                        const newData = allBookmarks.map(x => x._id !== item._id ? x : newItem)
                        newData && setAllBookmarks(newData)} else {
                            throw new Error("not successful")
                        }          
        } catch (err: any) {
            console.log(err) 
        }
    }
