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

export const handlePageChangeBookmark = ({setLoadingGeneral, setCurrentPageGeneral, currentPageGeneral, setTotalPagesGeneral, totalPagesGeneral, hasMoreGeneral, setHasMoreGeneral, data, setData, urlName, accessToken} : FunctionProps) => {
        const itemsPerPage = 12
        if(hasMoreGeneral === false) return
        try {
                const handlePageChange = async () => {
                setLoadingGeneral(true)
                const inputData = { currentPage: currentPageGeneral}
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

                const unique: any[] = []
                const allData = items && [...new Set([...data, ...items])]
                allData.forEach((item: any)=> {
                const ifExists = unique.find(x => x._id === item._id )
                if(!ifExists) {
                        unique.push(item)}
                })
                const sorted = unique .sort((a, b) => {
                if(!a.dateAdded || !b.dateAdded) return 0
                const A = a.dateAdded ? new Date(a.dateAdded).getTime() : 0
                const B = b.dateAdded ? new Date(b.dateAdded).getTime() : 0
                return B - A
        })
                setData(sorted)
                setCurrentPageGeneral(prevPage => prevPage + 1)
                setHasMoreGeneral(itemsLeft > 0)
                setTotalPagesGeneral(totalPages)
                setLoadingGeneral(false)
        }
                if(!hasMoreGeneral) return
                if(currentPageGeneral > totalPagesGeneral){
                        setHasMoreGeneral(false) 
                        return
                }
                (currentPageGeneral >= 2) && handlePageChange()
        } catch (err) {
                console.log(err);    
        }
}