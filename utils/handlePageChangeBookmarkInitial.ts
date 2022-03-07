import { Dispatch, SetStateAction } from "react"
import { handleRequestAccessToken } from "./handleRequestAccessToken"
interface FunctionProps {
                setLoadingGeneral: Dispatch<SetStateAction<boolean>>
                currentPageGeneral: number
                setCurrentPageGeneral: Dispatch<SetStateAction<number>>
                totalPagesGeneral: number
                setTotalPagesGeneral: Dispatch<SetStateAction<number>>
                hasMoreGeneral: boolean
                setHasMoreGeneral: Dispatch<SetStateAction<boolean>>
                data: any[]
                setData: Dispatch<SetStateAction<any[]>>
                urlName: string
                accessToken: string
        }

export const handlePageChangeBookmarkInitial = ({setLoadingGeneral, setCurrentPageGeneral, currentPageGeneral, setTotalPagesGeneral, totalPagesGeneral, hasMoreGeneral, setHasMoreGeneral, data, setData, urlName, accessToken} : FunctionProps) => {
        const itemsPerPage = 12
        if(hasMoreGeneral === false) return
        try {   
        const getInitialData = async () => {
                setLoadingGeneral(true)
                const inputData = { currentPage: 1 }
                const getData = await handleRequestAccessToken({
                        urlName,
                        requestType: "POST",
                        inputData,
                        accessToken,})
                const ok = getData && await getData.data.ok
                if(ok !== true){
                        throw new Error("request failed")
                }
                const items = getData && await getData.data.items
                const totalPages = getData && await getData.data.totalPages
                const itemsLength = getData && await getData.data.itemsLength
                const itemsSoFar = itemsPerPage * (currentPageGeneral - 1) + items.length
                const itemsLeft = itemsLength - itemsSoFar
                const newItemsSet = [...new Set([...items])]
                const newItems = newItemsSet.sort((a, b) => {
                if(!a.dateAdded || !b.dateAdded) return 0
                const A = a.dateAdded ? new Date(a.dateAdded).getTime() : 0
                const B = b.dateAdded ? new Date(b.dateAdded).getTime() : 0
                return B - A
                })
                newItems && setData(newItems)   
                setCurrentPageGeneral(prevPage => prevPage + 1)
                setHasMoreGeneral(itemsLeft > 0)
                setTotalPagesGeneral(totalPages)
                setLoadingGeneral(false)
        }
                if(currentPageGeneral > totalPagesGeneral) return
              (data === undefined || data.length === 0) && (currentPageGeneral === 1) && getInitialData()
        } catch (err) {
                console.log(err);  
        }
}