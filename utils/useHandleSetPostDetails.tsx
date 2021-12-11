import { Dispatch, SetStateAction, useEffect } from 'react'
import { PostInterface, BookmarkItemInterface } from '../Interfaces'

interface FunctionProps {
    postData: PostInterface | BookmarkItemInterface | null,
    setPost: Dispatch<SetStateAction<PostInterface | BookmarkItemInterface | null>>
}

export const useHandleSetPostDetails = ({postData, setPost} : FunctionProps) => {
    useEffect(() => {
        postData && setPost(postData)
    }, [postData])
}
