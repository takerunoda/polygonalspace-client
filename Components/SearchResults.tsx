import React, { useRef, useState } from 'react'
import Language from './Language'
import ResultItem from './ResultItem'
import LoaderSmall from './LoaderSmall'
import ConfirmAddBookmarkModal from './ConfirmAddBookmarkModal'
import { usePageContext } from '../context/PageContext'
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext'
import { useSearchContext } from '../context/SearchContext'
import { useUserBookmarkIds } from '../utils/useUserBookmarkIds'
import { useSearchPageChange } from '../utils/useSearchPageChange'
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral'
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral'
import { FiLink } from 'react-icons/fi'


const SearchResults = () => {
    const [isVisible, setIsVisible] = useState(false)

    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const searchContext = useSearchContext()
        if ( !searchContext ) {
            return null;
        }
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const { language, setImage, loading, setLoading, loadingSearchResults, setLoadingSearchResults, loadingClickBookmark} = pageContext
    const {userId, setUserBookmarkIds, isLoggedin} = userContext
    const { query,
            nasaState, setNasaState,
            totalPosts,
            searchKeyword,
            keywordRef,
            resultsRef,
            searchCurrentPage, setSearchCurrentPage,
            searchTotalPages, setSearchTotalPages,
            hasMore, setHasMore,
            mediaPreference, 
            sortPreference
        } = searchContext
    const observerRef = useRef<HTMLDivElement>(null)

    useHandleObserverGeneral({ 
        setIsVisibleGeneral: setIsVisible, 
        loadingGeneral: loadingSearchResults, 
        hasMoreGeneral: hasMore, 
        observerGeneralRef: observerRef })
        
    useSearchPageChange({
        searchCurrentPage, setSearchCurrentPage, 
        searchTotalPages, setSearchTotalPages,
        setImage, 
        setLoadingSearchResults, 
        query, 
        nasaState, setNasaState, 
        isVisible, 
        loading, 
        setHasMore,
        mediaPreference,
        sortPreference,
     })

    useSetPageCookiesGeneral({
        currentPage: searchCurrentPage, 
        currentPageCookie: "searchCurrentPage", 
        totalPages: searchTotalPages, 
        totalPagesCookie: "searchTotalPages",})

    useUserBookmarkIds({userId, setUserBookmarkIds, isLoggedin})   

    return (
    <div className="mb-48">
    {!loadingClickBookmark && <ConfirmAddBookmarkModal />}
    {searchKeyword && <div className="text-center mb-10 mt-32">
            <div className={`pb-24 xs:pb-16`} ref={keywordRef}></div>
                <h2 className="h2 w-60 sm:w-96 mx-auto">
                    <p className="text-indigo-500"><Language jp={"キーワード"} en={"Keyword"}/></p>
                    <p className="my-2 sm:my-3 text-lg sm:text-2xl">"{query}"</p>
                    <p className="text-lg sm:text-2xl">
                        {language && searchKeyword && (searchKeyword.en !== searchKeyword.jp) && `[ ${searchKeyword.jp} ]`}
                    </p>
                </h2>
        {nasaState && nasaState !== [] && !loading && 
        <h3 className="h3 text-green-500">
            <Language jp={<div>検索結果: <span className="text-red-700">{totalPosts && totalPosts}</span> 件 </div>} en={<div>Results: <span className="text-red-700">{totalPosts && totalPosts}</span> articles</div>}/>
        </h3>}
                {searchKeyword && searchKeyword.url && 
                <h3 className="h3 w-60 sm:w-96 mx-auto">
                    <a className="flex justify-center hover:underline cursor-pointer
                    text-center text-xl sm:text-2xl font-bold text-blue-500 hover:text-purple-500" 
                    href={language && searchKeyword ? searchKeyword.url : searchKeyword.url_en} target="_blank">
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
                                            <Language jp={<>「{searchKeyword ? searchKeyword.jp : query}」
                                        </>} en={"Definition of"}/>
                                        </p>
                                    </li>     
                                </ul>
                                <Language jp={<>の解説</>} en={<p>"{searchKeyword ? searchKeyword.en : query}"</p>}/>
                            </>
                            {searchKeyword.url && searchKeyword.url.includes("astro-dic.jp") && <Language jp={<p>(天文学辞典のリンク)</p>} en={<></>}/>}
                            {searchKeyword.url && searchKeyword.url.includes("spacex.com") && <Language jp={"(SpaceXのリンク)"} en={"(SpaceX)"}/>}
                            {searchKeyword.url && searchKeyword.url.includes("wikipedia.org") && <Language jp={"(Wikipediaのリンク)"} en={"(Wikipedia)"}/>}
                            </>)}
                        </div>
                    </a>
                </h3>}
            </div>}
        {loading && <div className="text-center my-10"><LoaderSmall /></div>}
        <ul className="outer" ref={resultsRef}>
            {nasaState ? 
            (!loading && nasaState.map((item, index) => {
                if(nasaState.length === index + 1){
                    return  <ResultItem 
                                item={item} 
                                key={item.key}
                                observerRef={observerRef} 
                                last={true}
                                />
                } else {
                    return  <ResultItem 
                                item={item} 
                                key={item.key}
                                observerRef={observerRef} 
                                last={false}
                                />
                }
            }))
            : null}
        </ul>
        {!loading && loadingSearchResults && <div className="loaderSmallGettingItems"><LoaderSmall /></div>}
    </div>
    )
}

export default SearchResults
