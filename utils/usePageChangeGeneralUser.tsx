import { Dispatch, SetStateAction, useEffect } from 'react'
import { BookmarkItemInterface, PostInterface } from '../Interfaces'
import { handleRequest } from './handleRequest'

interface FunctionProps {
        setLoadingGeneral: Dispatch<SetStateAction<boolean>>
        currentPageGeneral: number
        setCurrentPageGeneral: Dispatch<SetStateAction<number>>
        totalPagesGeneral: number
        setTotalPagesGeneral: Dispatch<SetStateAction<number>>
        setHasMoreGeneral: Dispatch<SetStateAction<boolean>>
        data: BookmarkItemInterface[] | PostInterface[]
        setData: Dispatch<SetStateAction<BookmarkItemInterface[] | PostInterface[]>>
        isVisibleGeneral: boolean
        urlName: string
        userId: string
}

export const usePageChangeGeneralUser = ({setLoadingGeneral, setCurrentPageGeneral, currentPageGeneral, setTotalPagesGeneral, totalPagesGeneral, setHasMoreGeneral, data, setData, isVisibleGeneral, urlName, userId} : FunctionProps) => {
        useEffect(() => {
                const getInitialData = async () => {
                try {
                setLoadingGeneral(true)                
                const inputData = { currentPage: currentPageGeneral, userId: userId }
            const response = await handleRequest({
                    urlData: urlName,
                    requestType: "POST",
                    inputData: inputData,})
                const ok = await response.data.ok
                if(ok !== true){
                        throw new Error("request failed")
                }

                const items = await response.data.items 
                const totalPages = await response.data.totalPages
                if(currentPageGeneral > totalPagesGeneral) return
                setLoadingGeneral(false)
                setHasMoreGeneral(items.length > 0)
                const newItemsSet = [...new Set([...items])]
                const newItems = newItemsSet.sort((a, b) => {
                if(!a.createdAt || !b.createdAt) return 0
                const A = a.createdAt ? new Date(a.createdAt).getTime() : 0
                const B = b.createdAt ? new Date(b.createdAt).getTime() : 0
                return B - A
                })
                newItems && setData(newItems)                
                setTotalPagesGeneral(totalPages)
                } catch (err) {
                        console.log(err);
                }
        }
              (data.length === 0) && (currentPageGeneral === 1) && getInitialData()
        }, [])
        useEffect(() => {
                const handlePageChange = async () => {
                try {
                        setLoadingGeneral(true)
                        setCurrentPageGeneral(prevPage => prevPage + 1)
                const inputData = { currentPage: currentPageGeneral + 1, userId: userId}
            const response = await handleRequest({
                    urlData: urlName,
                    requestType: "POST",
                    inputData: inputData,})
                const ok = await response.data.ok
                if(ok !== true){
                        throw new Error("request failed")
                }

                const items = await response.data.items 
                const totalPages = await response.data.totalPages
                if(currentPageGeneral > totalPagesGeneral) return
                setLoadingGeneral(false)
                setHasMoreGeneral(items.length > 0)
                data && items && setData(prevState => { return prevState && 
                        [...new Set([...prevState, ...items])]
                        .sort((a, b) => {
                                if(!a.createdAt || !b.createdAt) return 0
                                const A = a.createdAt ? new Date(a.createdAt).getTime() : 0
                                const B = b.createdAt ? new Date(b.createdAt).getTime() : 0
                                return B - A })})
                setTotalPagesGeneral(totalPages)
                        
                } catch (err) {
                        console.log(err);
                        
                }
        }
                if(currentPageGeneral + 1 > totalPagesGeneral) return
                isVisibleGeneral && handlePageChange()
        }, [isVisibleGeneral])
}