import { Dispatch, SetStateAction } from 'react'
import { SearchKeywordType } from '../Interfaces'

interface FunctionProps {
    item: {id:number | string, jp: string, en: string, category: string, url?: string}, 
    setQuery: Dispatch<SetStateAction<string>>
    setSearchKeyword: Dispatch<SetStateAction<SearchKeywordType | undefined | null>>
}

export  const handleList = ({item, setQuery, setSearchKeyword} : FunctionProps) => {
        setQuery(item.en)
        setSearchKeyword(item)
    }
