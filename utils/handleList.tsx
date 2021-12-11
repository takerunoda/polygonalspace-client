import { Dispatch, SetStateAction } from 'react'

interface FunctionProps {
    item: {id:number | string, jp: string, en: string, category: string, url?: string}, 
    setQuery: Dispatch<SetStateAction<string>>
    setSearchKeyword: Dispatch<SetStateAction<{
                        id: number | string
                        jp: string
                        en: string
                        category: any
                        url?: string;
                        url_en?: string;
                    } | undefined | null>>
}

export  const handleList = ({item, setQuery, setSearchKeyword} : FunctionProps) => {
        setQuery(item.en)
        setSearchKeyword(item)
    }
