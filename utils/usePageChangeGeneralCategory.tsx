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
        categoryValue: string
}

export const usePageChangeGeneralCategory = ({setLoadingGeneral, setCurrentPageGeneral, currentPageGeneral, setTotalPagesGeneral, totalPagesGeneral, setHasMoreGeneral, data, setData, isVisibleGeneral, urlName, categoryValue} : FunctionProps) => {
        useEffect(() => {
                const getInitialData = async () => {
                        setLoadingGeneral(true)
                
                const inputData = { currentPage: currentPageGeneral, categoryValue: categoryValue }
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
                // {currentPageGeneral}
                // {totalPagesGeneral}
                setLoadingGeneral(false)
                if(currentPageGeneral > totalPages) return
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
        }
              (data.length === 0) && (currentPageGeneral === 1) && getInitialData()
        }, [])
        useEffect(() => {
                const handlePageChange = async () => {
                        setLoadingGeneral(true)
                        setCurrentPageGeneral(prevPage => prevPage + 1)
                        
                const inputData = { currentPage: currentPageGeneral + 1, categoryValue: categoryValue   }
                const response = await handleRequest({
                        urlData: urlName,
                        requestType: "POST",
                        inputData: inputData,
                })
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
                }
                if(currentPageGeneral + 1 > totalPagesGeneral) return
                isVisibleGeneral && handlePageChange()
        }, [isVisibleGeneral])
}