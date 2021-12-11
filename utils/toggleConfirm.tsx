import { Dispatch, SetStateAction } from "react";
import { PostInterface } from "../Interfaces";

interface FunctionProps {
    id: string, 
    confirm: boolean, 
    data: PostInterface[], 
    setData: Dispatch<SetStateAction<PostInterface[]>>
}

export const toggleConfirm =  ({id, confirm, data, setData} : FunctionProps) => {
        let userPostData = data
         userPostData.forEach(y => y.confirm = false)
             userPostData = userPostData.map(
            (x: PostInterface) => x._id === id ? 
            {...x, confirm: !confirm}
            : x)
                setData(userPostData)
    }