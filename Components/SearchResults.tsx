import React, { useCallback, useRef, useState } from 'react'
import { usePageContext } from '../context/PageContext'
import { useSearchContext } from '../context/SearchContext'
import Language from './Language'
import LoaderSmall from './LoaderSmall'
import DataSourceList from './DataSourceList'
import ResultsComponent from './ResultsComponent'
import ConfirmAddBookmarkModal from './ConfirmAddBookmarkModal'
import { data, nasa } from '../utils/urls'
import { useUserBookmarkIds } from '../utils/useUserBookmarkIds'
import { handlePageChangeSearch } from '../utils/handlePageChangeSearch'
import { useHandleObserverSearch } from '../utils/useHandleObserverSearch'
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral'
import { FiLink } from 'react-icons/fi'

const SearchResults = () => {
    const elementRef = useRef(null)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const { language, loadingSubmitSearch, loadingClickBookmark } = usePageContext()
    const { query,
            nasaState, setNasaState,
            totalPosts,
            searchKeyword,
            keywordRef,
            resultsRef,
            searchCurrentPage, setSearchCurrentPage,
            searchTotalPages, setSearchTotalPages,
            mediaPreference, 
            sortPreference
        } = useSearchContext()
  const [loadingSearchResults, setLoadingSearchResults] = useState<boolean>(false)  
    const pageChange = useCallback(() => handlePageChangeSearch({
            setLoadingGeneral: setLoadingSearchResults, 
            setCurrentPageGeneral: setSearchCurrentPage,
            currentPageGeneral: searchCurrentPage, 
            setTotalPagesGeneral: setSearchTotalPages, 
            totalPagesGeneral: searchTotalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: nasaState,
            setData: setNasaState, 
            urlName: `${nasa}/${data}`,
            query,
            mediaPreference,
            sortPreference,
    }), [hasMoreGeneral, mediaPreference, nasaState, query, searchCurrentPage, searchTotalPages, setNasaState, setSearchCurrentPage, setSearchTotalPages, sortPreference])
    useHandleObserverSearch({
            pageChange,
            setIsVisibleGeneral,
            elementRef,
            items: nasaState,
         })
    useSetPageCookiesGeneral({
        currentPage: searchCurrentPage, 
        currentPageCookie: "searchCurrentPage", 
        totalPages: searchTotalPages, 
        totalPagesCookie: "searchTotalPages",})
    useUserBookmarkIds()

    return (
    <>
    <div className={query ? "mb-48" : ""}>
    {!loadingClickBookmark && <ConfirmAddBookmarkModal />}
    
    {searchKeyword && <div className="text-center mb-10 mt-32">
            <div className={``} ref={keywordRef}></div>
                <h2 className="h2 w-60 sm:w-96 mx-auto">
                    <p className="text-indigo-500"><Language jp={"キーワード"} en={"Keyword"}/></p>
                    <p className="my-2 sm:my-3 text-lg sm:text-2xl">&quot;{query}&quot;</p>
                    <p className="text-lg sm:text-2xl">
                        {language && searchKeyword && (searchKeyword.en !== searchKeyword.jp) && `[ ${searchKeyword.jp} ]`}
                    </p>
                </h2>
        {nasaState && nasaState !== [] && !loadingSubmitSearch && 
        <h3 className="h3 text-green-500">
            <Language jp={<div>検索結果: <span className="text-red-700">{totalPosts && totalPosts}</span> 件 </div>} en={<div>Results: <span className="text-red-700">{totalPosts && totalPosts}</span> articles</div>}/>
        </h3>}
        <div ref={resultsRef}></div>
            {searchKeyword && searchKeyword.url && 
                <h3 className="h3 w-60 sm:w-96 mx-auto">
                    <a className="flex justify-center hover:underline cursor-pointer
                    text-center text-xl sm:text-2xl font-bold text-blue-500 hover:text-purple-500" 
                    href={language && searchKeyword ? searchKeyword.url : searchKeyword.url_en} target="_blank" rel="noreferrer">
                        <div>
                            {!searchKeyword.url.includes("astro-dic.jp") && searchKeyword.url.includes("spacex.com") && !searchKeyword.url.includes("wikipedia.org") ? <></> : 
                            (<>
                                <>
                                <ul className="flex justify-center">
                                    <li className="mt-1 mr-1">
                                        <FiLink />
                                    </li>
                                    <li>
                                        <p>
                                            <Language jp={<>「{searchKeyword ? searchKeyword.jp : query}」の解説
                                        </>} en={<p>Definition of&quot;{searchKeyword ? searchKeyword.en : query}&quot;</p>}/>
                                        </p>
                                    </li>     
                                </ul>
                            </>
                            {searchKeyword.url && searchKeyword.url.includes("astro-dic.jp") && <Language jp={<p>(天文学辞典のリンク)</p>} en={<></>}/>}
                            {searchKeyword.url && searchKeyword.url.includes("spacex.com") && <Language jp={"(SpaceXのリンク)"} en={"(SpaceX)"}/>}
                            {searchKeyword.url && searchKeyword.url.includes("wikipedia.org") && <Language jp={"(Wikipediaのリンク)"} en={"(Wikipedia)"}/>}
                            </>)}
                        </div>
                    </a>
                </h3>}
            </div>}
        {loadingSubmitSearch && <div className="text-center my-10"><LoaderSmall /></div>}
        <ResultsComponent
                data={nasaState} 
                elementRef={elementRef} 
                currentPage={searchCurrentPage} 
                hasMore={hasMoreGeneral} 
                isVisible={isVisibleGeneral} 
                />
        {!loadingSubmitSearch && loadingSearchResults && <DataSourceList imageOnly={false}/>}
        {!loadingSubmitSearch && loadingSearchResults && <div className="loaderSmallGettingItems"><LoaderSmall /></div>}
    </div>
    </>
    )
}

export default SearchResults
