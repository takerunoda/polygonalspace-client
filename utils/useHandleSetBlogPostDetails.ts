import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

interface FunctionProps {
    postData: any | null,
    setPost: Dispatch<SetStateAction<any | null>>
}

export const useHandleSetBlogPostDetails = ({postData, setPost} : FunctionProps) => {
        const setPostRef = useRef(setPost)
    useEffect(() => {
        const setPostCurrent = setPostRef.current
        postData && setPostCurrent(postData)
    }, [postData])
}
