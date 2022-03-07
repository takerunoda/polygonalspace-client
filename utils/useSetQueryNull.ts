import { useEffect, useRef } from 'react'
import { useSearchContext } from '../context/SearchContext'

export const useSetQueryNull = () => {
    const {setQuery, setSearchKeyword, setNasaState} = useSearchContext()
    const setQueryRef = useRef(setQuery)
    const setSearchKeywordRef = useRef(setSearchKeyword)
    const setNasaStateRef = useRef(setNasaState)
    
    useEffect(() => {
        const setQueryCurrent = setQueryRef.current        
        const setSearchKeywordCurrent = setSearchKeywordRef.current        
        const setNasaStateCurrent = setNasaStateRef.current        
        setQueryCurrent("")
        setSearchKeywordCurrent(null)
        setNasaStateCurrent([])
    }, [])
}