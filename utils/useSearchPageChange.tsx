import{ Dispatch, SetStateAction, useEffect } from 'react'
import { ImageInterface, nasaStateDataInterface } from '../Interfaces';
import { data, nasa } from './urls';
import { handleRequest } from './handleRequest';

interface FunctionProps {
            searchCurrentPage: number
            setSearchCurrentPage: Dispatch<SetStateAction<number>>
            searchTotalPages: number
            setSearchTotalPages: Dispatch<SetStateAction<number>>
            setImage: Dispatch<SetStateAction<ImageInterface | null | undefined>>
            setLoadingSearchResults: Dispatch<SetStateAction<boolean>>
            query: string
            nasaState: nasaStateDataInterface[] | undefined
            setNasaState: Dispatch<SetStateAction<nasaStateDataInterface[] | undefined>>
            isVisible: boolean
            loading: boolean
            setHasMore: Dispatch<SetStateAction<boolean>>
            mediaPreference: number
            sortPreference: boolean
}

export const useSearchPageChange = ({searchCurrentPage, setSearchCurrentPage, searchTotalPages, setSearchTotalPages, setImage, setLoadingSearchResults, query, nasaState, setNasaState, isVisible, loading, setHasMore, mediaPreference, sortPreference} : FunctionProps) => {
        // Change page
        useEffect(() => {
                        const handlePageChange =  async () => {
                        try {   setImage(null)
                                setLoadingSearchResults(true)
                                const inputData = { 
                                        query: query, 
                                        currentPage: searchCurrentPage + 1,
                                        mediaPreference: mediaPreference, 
                                        sortPreference: sortPreference,     
                                        }
                                const response = await handleRequest({
                                        urlData: `${nasa}/${data}`,
                                        requestType: "POST",
                                        inputData: inputData,
                                })
                                const ok = await response.data.ok
                                if(ok !== true){
                                        throw new Error("request failed")
                                }
                                const returnedNASAData: nasaStateDataInterface[] = response.data.nasaStateData
                                const totalPages = response.data.totalPages
                                setLoadingSearchResults(false)
                                setHasMore(returnedNASAData.length > 0)
                                 nasaState && returnedNASAData && setNasaState(prevState => { return prevState && 
                                [...new Set([...prevState, ...returnedNASAData])]
                                .sort((a, b) => {
                                        if(!a.dateCreated || !b.dateCreated) return 0
                                        const A = a.dateCreated ? new Date(a.dateCreated).getTime() : 0
                                        const B = b.dateCreated ? new Date(b.dateCreated).getTime() : 0
                                        const X = inputData.sortPreference === true ? 
                                        B - A : A - B
                                        return X })})
                                setSearchTotalPages(totalPages)
                                setSearchCurrentPage(prevPage => prevPage + 1)
                        } catch (err) {
                             console.log(err)
                        }       
                }
                if(searchCurrentPage + 1 > searchTotalPages) return
               !loading && (nasaState && nasaState.length !== 0) && isVisible && handlePageChange()
            }, [loading, isVisible])
}
