import { Dispatch, SetStateAction, useEffect } from 'react'
import { BookmarkItemInterface, PostInterface } from '../Interfaces'
import { handleRequestAccessToken } from './handleRequestAccessToken'

interface FunctionProps {
        setLoadingMyBookmark: Dispatch<SetStateAction<boolean>>
        currentPageMyBookmark: number
        setCurrentPageMyBookmark: Dispatch<SetStateAction<number>>
        totalPagesMyBookmark: number
        setTotalPagesMyBookmark: Dispatch<SetStateAction<number>>
        setHasMoreMyBookmark: Dispatch<SetStateAction<boolean>>
        userBookmark: BookmarkItemInterface[] | PostInterface[]
        setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[] | PostInterface[]>>
        isVisibleMyBookmark: boolean
        urlName: string
        accessToken: string
        userBookmarkIds: string[]
}

export const usePageChangeMyBookmark = ({setLoadingMyBookmark, setCurrentPageMyBookmark, currentPageMyBookmark, totalPagesMyBookmark, setTotalPagesMyBookmark, setHasMoreMyBookmark, userBookmark, setUserBookmark, isVisibleMyBookmark, urlName, accessToken, userBookmarkIds} : FunctionProps) => {
        useEffect(() => {
        const getInitialData = async () => {
                setLoadingMyBookmark(true)                
                const inputData = { currentPage: currentPageMyBookmark }
                const getData = await handleRequestAccessToken({
                        urlData: urlName,
                        requestType: "POST",
                        inputData: inputData,
                        accessToken: accessToken,})

                const ok = await getData.data.ok
                if(ok !== true){
                    throw new Error("request failed")
                }
                const items = await getData.data.items
                
                const totalPages = await getData.data.totalPages
                if(currentPageMyBookmark > totalPagesMyBookmark) return
                setLoadingMyBookmark(false)
                setHasMoreMyBookmark(items.length > 0)
                const newItemsSet = [...new Set([...items])]
                const newItems = newItemsSet.sort((a, b) => {
                if(!a.dateAdded || !b.dateAdded) return 0
                const A = a.dateAdded ? new Date(a.dateAdded).getTime() : 0
                const B = b.dateAdded ? new Date(b.dateAdded).getTime() : 0
                return B - A
                })
                newItems && setUserBookmark(newItems)                
               setTotalPagesMyBookmark(totalPages)
        }
              (userBookmark.length === 0) && (currentPageMyBookmark === 1) && getInitialData()
        }, [])
        useEffect(() => {
                setCurrentPageMyBookmark(1)
        }, [userBookmarkIds])

        useEffect(() => {
                const handlePageChange = async () => {
                try {
                        setLoadingMyBookmark(true)
                        setCurrentPageMyBookmark(prevPage => prevPage + 1)
                const inputData = { currentPage: currentPageMyBookmark + 1}
                const getData = await handleRequestAccessToken({
                    urlData: urlName,
                    requestType: "POST",
                    inputData: inputData,
                    accessToken: accessToken,})

                const ok = await getData.data.ok
                if(ok !== true){
                    throw new Error("request failed")
                }

                const items = await getData.data.items 
                const totalPages = await getData.data.totalPages
                if(currentPageMyBookmark > totalPagesMyBookmark) return
                setLoadingMyBookmark(false)
                setHasMoreMyBookmark(items.length > 0)
                userBookmark && items && setUserBookmark(prevState => { return prevState && 
                        [...new Set([...prevState, ...items])]
                        .sort((a, b) => {
                                if(!a.dateAdded || !b.dateAdded) return 0
                                const A = a.dateAdded ? new Date(a.dateAdded).getTime() : 0
                                const B = b.dateAdded ? new Date(b.dateAdded).getTime() : 0
                                return B - A })})
                setTotalPagesMyBookmark(totalPages)
                         
                } catch (err) {
                        console.log(err)
                }
               }
                if(currentPageMyBookmark + 1 > totalPagesMyBookmark) return
                isVisibleMyBookmark && handlePageChange()
        }, [isVisibleMyBookmark])
}