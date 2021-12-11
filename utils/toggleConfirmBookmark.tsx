import { Dispatch, SetStateAction } from "react";
import { BookmarkItemInterface } from "../Interfaces";

interface FunctionProps {
    id: string, 
    confirm: boolean, 
    data: BookmarkItemInterface[], 
    setData: Dispatch<SetStateAction<BookmarkItemInterface[]>>
}

export const toggleConfirmBookmark =  ({id, confirm, data, setData} : FunctionProps) => {
        let userPostData = data
         userPostData.forEach(y => y.confirm = false)
             userPostData = userPostData.map(
            x => x.imageId === id ? 
            {...x, confirm: !confirm}
            : x)
                setData(userPostData)
    }