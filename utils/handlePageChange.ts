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

export const handlePageChange = ({setLoadingGeneral, setCurrentPage, currentPage, totalPages, hasMoreGeneral, setHasMoreGeneral, data, setData, urlName, itemsLength} : FunctionProps) => {
        const itemsPerPage = 12
        if(hasMoreGeneral === false) return
        try {
                const handlePageChange = async () => {
                setLoadingGeneral(true)
                const inputData = { currentPage}
                const getData = await handleRequest({
                    urlName,
                    requestType: "POST",
                    inputData})
                
                const ok = getData && await getData.data.ok 
                if(ok !== true){
                        throw new Error("request failed")
                }
                const items = getData && await getData.data.items 
                const itemsSoFar = itemsPerPage * (currentPage - 1) + items.length
                const itemsLeft = itemsLength - itemsSoFar

                const unique: any[] = []
                const allData = items && [...new Set([...data, ...items])]

                allData.forEach((item: any)=> {
                const ifExists = unique.find(x => x._id === item._id )
                if(!ifExists) {
                        unique.push(item)}
                })
                const sorted = unique.sort((a, b) => {
                                        if(!a.createdAt || !b.createdAt) return 0
                                        const A = a.createdAt ? new Date(a.createdAt).getTime() : 0
                                        const B = b.createdAt ? new Date(b.createdAt).getTime() : 0
                                        return B - A })
                setData(sorted)
                setCurrentPage(prevPage => prevPage + 1)
                setHasMoreGeneral(itemsLeft > 0)
                setLoadingGeneral(false)
        }
                if(!hasMoreGeneral) return
                if(currentPage > totalPages){
                        setHasMoreGeneral(false) 
                        return
                }
                (currentPage >= 2) && handlePageChange()
        } catch (err) {
                console.log(err);    
        }
}