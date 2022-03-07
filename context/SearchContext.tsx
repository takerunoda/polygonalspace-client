import { createContext, Dispatch, MutableRefObject, RefObject, SetStateAction, useContext, useRef, useMemo, useState } from "react"
import { CancelTokenSource } from "axios";
import { ChildrenProps, nasaStateDataInterface, SearchKeywordType } from "../Interfaces";

type SearchContextType = {
        query: string
        setQuery: Dispatch<SetStateAction<string>>
        searchCurrentPage: number
        setSearchCurrentPage: Dispatch<SetStateAction<number>>
        searchTotalPages: number
        setSearchTotalPages: Dispatch<SetStateAction<number>>
        nasaState: nasaStateDataInterface[] | undefined
        setNasaState: Dispatch<SetStateAction<nasaStateDataInterface[] | undefined>>
        totalPosts: number | undefined
        setTotalPosts: Dispatch<SetStateAction<number | undefined>>
        hasMore: boolean
        setHasMore: Dispatch<SetStateAction<boolean>>
        mediaPreference: number
        setMediaPreference: Dispatch<SetStateAction<number>>
        sortPreference: boolean
        setSortPreference: Dispatch<SetStateAction<boolean>>
        showSearchSettings: boolean
        setShowSearchSettings: Dispatch<SetStateAction<boolean>>
        searchKeyword: SearchKeywordType | undefined | null
        setSearchKeyword: Dispatch<SetStateAction<SearchKeywordType | undefined | null>>
        categoryRef: RefObject<HTMLDivElement>
        keywordRef: MutableRefObject<null>
        resultsRef: MutableRefObject<null>  
        scrollToRefCurrent: (ref: any) => void
        cancelSourceSearch: CancelTokenSource | undefined
        setCancelSourceSearch: Dispatch<SetStateAction<CancelTokenSource | undefined>>
        categoryState: {
                            catName: string;
                            value: string;
                            en: string;
                        } | undefined
        setCategoryState: Dispatch<SetStateAction<{
                            catName: string;
                            value: string;
                            en: string;
                        } | undefined>>
        preQuery: string
        setPreQuery: Dispatch<SetStateAction<string>>
      }

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchWrapper({ children } : ChildrenProps ) {
    const [query, setQuery] = useState<string>('')    
    const [nasaState, setNasaState] = useState<nasaStateDataInterface[]>();
    const [totalPosts, setTotalPosts] = useState<number>()   
    const [searchKeyword, setSearchKeyword] = useState<{id: number | string, jp: string, en: string, category: any, url?: string} | null>()
    const [searchCurrentPage, setSearchCurrentPage] = useState<number>(1) 
    const [searchTotalPages, setSearchTotalPages] =useState(2)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [cancelSourceSearch, setCancelSourceSearch] = useState<CancelTokenSource | undefined>()
    const [mediaPreference, setMediaPreference] = useState<number>(1)
    const [sortPreference, setSortPreference] = useState<boolean>(true)    
    const [showSearchSettings, setShowSearchSettings] = useState<boolean>(false)
    const [categoryState, setCategoryState] = useState<{catName: string, value: string, en: string}>()
    const [preQuery, setPreQuery] = useState<string>("")
    const categoryRef = useRef(null)
    const keywordRef = useRef(null)    
    const resultsRef = useRef(null)    
    const scrollRef =  (ref : any) => {
      window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        behavior: "smooth"
      })   
    }
  const scrollToRef = useRef(scrollRef)
  const scrollToRefCurrent = scrollToRef.current
          
  const searchValue = useMemo(() => ({
            query, setQuery,
            nasaState, setNasaState,
            totalPosts, setTotalPosts,
            searchKeyword, setSearchKeyword,
            categoryRef,
            keywordRef,
            resultsRef,
            scrollToRefCurrent,
            searchCurrentPage, setSearchCurrentPage, 
            searchTotalPages, setSearchTotalPages,
            hasMore, setHasMore,
            mediaPreference, setMediaPreference,
            sortPreference, setSortPreference,
            showSearchSettings, setShowSearchSettings,
            cancelSourceSearch, setCancelSourceSearch,
            categoryState, setCategoryState,
            preQuery, setPreQuery
    }), [   query, setQuery,
            nasaState, setNasaState,
            totalPosts, setTotalPosts,
            searchKeyword, setSearchKeyword,
            categoryRef,
            keywordRef,
            resultsRef,
            scrollToRefCurrent,
            searchCurrentPage, setSearchCurrentPage,
            searchTotalPages, setSearchTotalPages,
            hasMore, setHasMore,
            mediaPreference, setMediaPreference,
            sortPreference, setSortPreference,
            showSearchSettings, setShowSearchSettings,
            cancelSourceSearch, setCancelSourceSearch,
            categoryState, setCategoryState,
            preQuery, setPreQuery,
    ])

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
    const context = useContext(SearchContext)
        if (context === undefined) {
            throw new Error('useContext(SearchContext) is undefined')
        }
    return context
}