import { Dispatch, SetStateAction } from 'react'

interface ObjectProps {
    id: string, 
    updatedLike: any
}

interface FunctionProps {
    item: any,
    updateNoAuth:  ({ id, updatedLike }: ObjectProps) => Promise<void>
    postData: any[],
    setPostData: Dispatch<SetStateAction<any[]>>
}

export const handleLikeBlog = ({item, updateNoAuth, postData, setPostData} : FunctionProps) => {
        //step 1: update like status
        let updateItem = {...item, likeStatus: !item.likeStatus}
        const currentLike = updateItem.like ?? 0
        //step 2: update like count 
        let updateItemData: any
        if(!item.likeStatus){
            updateItemData = {...updateItem, like: currentLike + 1}
        } else {
            const newLike = currentLike !== 0 ? currentLike - 1 : currentLike
                updateItemData = {...updateItem, like: newLike}
        }
            const updatedLike = {like: updateItemData.like}
        item.id && updateNoAuth({id: item.id, updatedLike: updatedLike})
        //Finally, updateItemData is integrated into allPostData
        let allPostData = postData
        allPostData = allPostData.map((x: any) => x._id === item._id ?
        updateItemData : x)

        setPostData(allPostData)
    }