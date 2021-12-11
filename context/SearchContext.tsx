import { createContext, Dispatch, MutableRefObject, RefObject, SetStateAction, useContext, useRef, useMemo, useState } from "react"
import Cookies from "js-cookie";
import { CancelTokenSource } from "axios";
import { ChildrenProps, nasaStateDataInterface } from "../Interfaces";


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
        categoryState: {
                            catName: string
                            value: string
                            en: string
                        } | undefined
        setCategoryState: Dispatch<SetStateAction<{
                            catName: string
                            value: string
                            en: string
                        } | undefined>>
        searchKeyword: {
                            id: number | string
                            jp: string
                            en: string
                            category: any;
                            url?: string;
                            url_en?: string;
                        } | undefined | null
        setSearchKeyword: Dispatch<SetStateAction<{
                            id: number | string
                            jp: string
                            en: string
                            category: any
                            url?: string;
                            url_en?: string;
                        } | undefined | null>>
        categoryRef: RefObject<HTMLDivElement>
        keywordRef: MutableRefObject<null>
        resultsRef: MutableRefObject<null>  
        nasaModalRef: MutableRefObject<null>  
        scrollRef: (ref: any) => void
        cancelSourceSearch: CancelTokenSource | undefined
        setCancelSourceSearch: Dispatch<SetStateAction<CancelTokenSource | undefined>>
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchWrapper({ children } : ChildrenProps ) {
    const [query, setQuery] = useState('')    
    const [nasaState, setNasaState] = useState<nasaStateDataInterface[]>();
    const [totalPosts, setTotalPosts] = useState<number>()   
    const [categoryState, setCategoryState] = useState<{catName: string, value: string, en: string}>()
    const [searchKeyword, setSearchKeyword] = useState<{id: number | string, jp: string, en: string, category: any, url?: string} | null>()
    const currentPageCookie = Cookies.get("currentPageShared")
    const [searchCurrentPage, setSearchCurrentPage] = 
               useState((nasaState && nasaState.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1) 
    const totalPageCookie = Cookies.get("totalPagesShared")
    const [searchTotalPages, setSearchTotalPages] =
                    useState(totalPageCookie ? JSON.parse(totalPageCookie) : 2)
    const [hasMore, setHasMore] = useState(true)
    const [cancelSourceSearch, setCancelSourceSearch] = useState<CancelTokenSource | undefined>()
    const [mediaPreference, setMediaPreference] = useState<number>(1)
    const [sortPreference, setSortPreference] = useState<boolean>(true)    
    const [showSearchSettings, setShowSearchSettings] = useState<boolean>(false)
    const categoryRef = useRef<HTMLDivElement>(null)
    const keywordRef = useRef(null)    
    const resultsRef = useRef(null)    
    const nasaModalRef = useRef(null)
    const scrollRef =  (ref : any) => {
      window.scrollTo({
        top: ref.current.offsetTop,
        left: 0,
        behavior: "smooth"
      })   
    }

  const searchValue = useMemo(() => ({
            query, setQuery,
            nasaState, setNasaState,
            totalPosts, setTotalPosts,
            categoryState, setCategoryState,
            searchKeyword, setSearchKeyword,
            categoryRef,
            keywordRef,
            resultsRef,
            nasaModalRef,
            scrollRef,
            searchCurrentPage, setSearchCurrentPage, 
            searchTotalPages, setSearchTotalPages,
            hasMore, setHasMore,
            mediaPreference, setMediaPreference,
            sortPreference, setSortPreference,
            showSearchSettings, setShowSearchSettings,
            cancelSourceSearch, setCancelSourceSearch,
    }), [   query, setQuery,
            nasaState, setNasaState,
            totalPosts, setTotalPosts,
            categoryState, setCategoryState,
            searchKeyword, setSearchKeyword,
            categoryRef,
            keywordRef,
            resultsRef,
            nasaModalRef,
            scrollRef,
            searchCurrentPage, setSearchCurrentPage,
            searchTotalPages, setSearchTotalPages,
            hasMore, setHasMore,
            mediaPreference, setMediaPreference,
            sortPreference, setSortPreference,
            showSearchSettings, setShowSearchSettings,
            cancelSourceSearch, setCancelSourceSearch,
    ])

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  return useContext(SearchContext);
}