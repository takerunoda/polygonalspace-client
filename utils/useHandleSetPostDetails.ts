import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { PostInterface, BookmarkItemInterface } from '../Interfaces'

interface FunctionProps {
    postData: PostInterface | BookmarkItemInterface | null,
    setPost: Dispatch<SetStateAction<PostInterface | BookmarkItemInterface | null>>
}

export const useHandleSetPostDetails = ({postData, setPost} : FunctionProps) => {
    const setPostRef = useRef(setPost)
    useEffect(() => {
        const setPostCurrent = setPostRef.current
        postData && setPostCurrent(postData)
    }, [postData])
}
