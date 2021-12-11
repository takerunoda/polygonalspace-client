import { Dispatch, SetStateAction, useEffect } from 'react'
import { nasaStateDataInterface } from '../Interfaces'

interface FunctionProps {
setQuery: Dispatch<SetStateAction<string>>
setSearchKeyword: Dispatch<SetStateAction<{
                    id: number | string
                    jp: string
                    en: string
                    category: any
                    url?: string;
                    url_en?: string;
                } | undefined | null>>
setNasaState: Dispatch<SetStateAction<nasaStateDataInterface[] | undefined>>
}

export const useSetQueryNull = ({setQuery, setSearchKeyword, setNasaState} : FunctionProps) => {
    useEffect(() => {
        setQuery("")
        setSearchKeyword(null)
        setNasaState([])
    }, [])
}