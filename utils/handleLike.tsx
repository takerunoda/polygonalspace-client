import { Dispatch, SetStateAction } from 'react'
import { BookmarkItemInterface, PostInterface } from '../Interfaces'

interface ObjectProps {
    id: string, 
    item: PostInterface | BookmarkItemInterface
}

interface FunctionProps {
    item: PostInterface | BookmarkItemInterface,
    updateNoAuth:  ({ id, item }: ObjectProps) => Promise<void>
    postData: PostInterface[] | BookmarkItemInterface[],
    setPostData: Dispatch<SetStateAction<PostInterface[] | BookmarkItemInterface[]>>
}

export const handleLike = ({item, updateNoAuth, postData, setPostData} : FunctionProps) => {
        //step 1: update like status
        let updateItem = {...item, likeStatus: !item.likeStatus}
        const currentLike = updateItem.like ?? 0        

        //step 2: update like count 
        let updateItemData: BookmarkItemInterface | PostInterface
        if(!item.likeStatus){
            updateItemData = {...updateItem, like: currentLike + 1}
        } else {
            const newLike = currentLike !== 0 ? currentLike - 1 : currentLike
                updateItemData = {...updateItem, like: newLike}
        }
        item._id && updateNoAuth({id: item._id, item: updateItemData})
        
        //Finally, updateItemData is integrated into allPostData
        let allPostData = postData
        allPostData = allPostData.map((x: PostInterface | BookmarkItemInterface) => x._id === item._id ?
        updateItemData : x)

        setPostData(allPostData)
    }