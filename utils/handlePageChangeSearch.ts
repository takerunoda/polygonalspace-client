import { Dispatch, SetStateAction } from "react"
import { nasaStateDataInterface } from "../Interfaces"
import { handleRequest } from "./handleRequest"
interface FunctionProps {
                setLoadingGeneral: Dispatch<SetStateAction<boolean>>
                currentPageGeneral: number
                setCurrentPageGeneral: Dispatch<SetStateAction<number>>
                totalPagesGeneral: number
                setTotalPagesGeneral: Dispatch<SetStateAction<number>>
                hasMoreGeneral: boolean
                setHasMoreGeneral: Dispatch<SetStateAction<boolean>>
                data: nasaStateDataInterface[] | undefined
                setData: Dispatch<SetStateAction<nasaStateDataInterface[] | undefined>>
                urlName: string
                query: string
                mediaPreference: number
                sortPreference: boolean
        }

export const handlePageChangeSearch = ({setLoadingGeneral, setCurrentPageGeneral, currentPageGeneral, setTotalPagesGeneral, totalPagesGeneral, hasMoreGeneral, setHasMoreGeneral, data, setData, urlName, query, mediaPreference, sortPreference} : FunctionProps) => {
        const itemsPerPage = 12
        if(hasMoreGeneral === false) return
        try {
                const handlePageChange = async () => {
                setLoadingGeneral(true)
                const inputData = {
                        query,
                        currentPage: currentPageGeneral,
                        mediaPreference, 
                        sortPreference,     
                }
                const getData = await handleRequest({
                                        urlName,
                                        requestType: "POST",
                                        inputData,})
                const ok = getData && await getData.data.ok 
                if(ok !== true){
                        throw new Error("request failed")
                }
                const items = getData && await getData.data.nasaStateData 
                const totalPages = getData && await getData.data.totalPages
                const itemsLength = getData && await getData.data.itemsLength
                const itemsSoFar =  itemsPerPage * (currentPageGeneral - 1) + items.length
                const itemsLeft = itemsLength - itemsSoFar
                const unique: any[] = []
                const allData = data && [...new Set([...data, ...items])]
                allData && allData.forEach((item: any)=> {
                const ifExists = unique.find(x => x.key === item.key )
                if(!ifExists) {
                        unique.push(item)}
                })
                const sorted = unique.sort((a, b) => {
                                        if(!a.dateCreated || !b.dateCreated) return 0
                                        const A = a.dateCreated ? new Date(a.dateCreated).getTime() : 0
                                        const B = b.dateCreated ? new Date(b.dateCreated).getTime() : 0
                                        const X = inputData.sortPreference === true ? 
                                        B - A : A - B
                                        return X })
                setData(sorted)

                        // items && setData(prevState => { 
                        //         return prevState && [...new Set([...prevState, ...items])].sort((a, b) => {
                        //                 if(!a.dateCreated || !b.dateCreated) return 0
                        //                 const A = a.dateCreated ? new Date(a.dateCreated).getTime() : 0
                        //                 const B = b.dateCreated ? new Date(b.dateCreated).getTime() : 0
                        //                 const X = inputData.sortPreference === true ? 
                        //                 B - A : A - B
                        //                 return X })})
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
                (currentPageGeneral >= 1) && handlePageChange()
        } catch (err) {
                console.log(err);    
        }
}