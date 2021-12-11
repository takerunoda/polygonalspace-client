import { Dispatch, SetStateAction } from 'react'
import { PostInterface } from '../Interfaces'

interface FunctionProps {
    item: PostInterface
    setPostDeleteItem: Dispatch<SetStateAction<PostInterface | null>>
    setPostModalToggleConfirm: Dispatch<SetStateAction<boolean>>
}

export const handleOnclickDeletePost = ({item, setPostDeleteItem, setPostModalToggleConfirm} : FunctionProps) => {
        setPostDeleteItem(item)
        setPostModalToggleConfirm(true)
    }
