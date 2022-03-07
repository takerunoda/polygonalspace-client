import { Dispatch, SetStateAction } from "react"
import { handleRequest } from "./handleRequest"
interface FunctionProps {
        setLoadingGeneral: Dispatch<SetStateAction<boolean>>
        currentPage: number
        setCurrentPage: Dispatch<SetStateAction<number>>
        totalPages: number
        hasMoreGeneral: boolean
        setHasMoreGeneral: Dispatch<SetStateAction<boolean>>
        data: any[]
        setData: Dispatch<SetStateAction<any[]>>
        urlName: string
        itemsLength: number
}

export const handlePageChangeInitial = ({setLoadingGeneral, setCurrentPage, currentPage, totalPages, hasMoreGeneral, setHasMoreGeneral, data, setData, urlName, itemsLength} : FunctionProps) => {
        const itemsPerPage = 12
        if(hasMoreGeneral === false) return
        try {   
        const getInitialData = async () => {
                setLoadingGeneral(true)
                const inputData = { currentPage: 2 }
                const response = await handleRequest({
                    urlName,
                    requestType: "POST",
                    inputData,})
                const ok = response && await response.data.ok
                if(ok !== true){
                        throw new Error("request failed")
                }
                const items = response && await response.data.items 
                const itemsSoFar = itemsPerPage * (currentPage - 1) + items.length
                const itemsLeft = itemsLength - itemsSoFar
                const newItemsSet = [...new Set([...items])]
                const newItems = newItemsSet.sort((a, b) => {
                if(!a.createdAt || !b.createdAt) return 0
                const A = a.createdAt ? new Date(a.createdAt).getTime() : 0
                const B = b.createdAt ? new Date(b.createdAt).getTime() : 0
                return B - A
                })
                newItems && setData(newItems)   
                setCurrentPage(prevPage => prevPage + 1)
                setHasMoreGeneral(itemsLeft > 0)
                setLoadingGeneral(false)
        }
                if(currentPage > totalPages) return
              (data === undefined || data.length === 0) && (currentPage === 2) && getInitialData()
        } catch (err) {
                console.log(err);  
        }
}