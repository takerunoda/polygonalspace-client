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

export const handlePageChangeBlogs = ({setLoadingGeneral, setCurrentPage, currentPage, totalPages, hasMoreGeneral, setHasMoreGeneral, data, setData, urlName, itemsLength} : FunctionProps) => {
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
                const ifExists = unique.find(x => x.id === item.id )
                if(!ifExists) {
                        unique.push(item)}
                })
                const sorted = unique.sort((a, b) => {
                                        if(!a.updated_at || !b.updated_at) return 0
                                        const A = a.updated_at ? new Date(a.updated_at).getTime() : 0
                                        const B = b.updated_at ? new Date(b.updated_at).getTime() : 0
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