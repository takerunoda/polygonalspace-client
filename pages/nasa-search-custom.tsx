import React, { FormEvent, useRef, useState } from 'react'
import { HeadProps } from '../Interfaces';
import HeadItem from '../Components/HeadItem';
import Language from '../Components/Language';
import NasaSearchH1 from '../Components/NasaSearchH1';
import LinkButtonTwo from '../Components/LinkButtonTwo';
import SearchResults from '../Components/SearchResults';
import NASA_HubbleModal from '../Components/NASA_HubbleModal';
import SearchSettingModal from '../Components/SearchSettingModal';
import SearchSettingsButton from '../Components/SearchSettingsButton';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import { headData } from '../utils/headData';
import { handleList } from '../utils/handleList';
import { useSetQueryNull } from '../utils/useSetQueryNull';
import { handleSearchSubmit } from '../utils/handleSearchSubmit';
import { useBodyOverflowHidden } from '../utils/useBodyOverflowHidden';

const NASA = ({headObject} : HeadProps) => {
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }
    const searchContext = useSearchContext()
        if ( !searchContext ) {
            return null
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const {setLoading, language, timeoutId, setTimeoutId, postsPerPageNASA} = pageContext
    
    const { query, setQuery,
            setNasaState,
            setTotalPosts,
            searchKeyword, setSearchKeyword,
            keywordRef,
            resultsRef, 
            scrollRef,
            searchCurrentPage, setSearchCurrentPage,
            searchTotalPages, setSearchTotalPages,
            hasMore, setHasMore,
            mediaPreference, setMediaPreference,
            sortPreference, setSortPreference,
            showSearchSettings, setShowSearchSettings,
            cancelSourceSearch, setCancelSourceSearch,
         } = searchContext
    const { showMessageModal, setShowMessageModal, setMessage, showDetailsModal } = modalContext  
    const inputRef = useRef<HTMLInputElement>(null);
    const [preQuery, setPreQuery] = useState<string>("")
    const handleChange = (e: FormEvent<HTMLInputElement>)=> {
            setNasaState([])
            setQuery("")
            setPreQuery((e.target as HTMLTextAreaElement).value)
        }
    useSetQueryNull({setQuery, setSearchKeyword, setNasaState})
    useBodyOverflowHidden({showModal: showDetailsModal})
    useBodyOverflowHidden({showModal: showSearchSettings})
    const handleSettings = () => {
        setShowSearchSettings(true)
    }
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
            handleSearchSubmit(e, {setNasaState, setLoading, scrollRef, keywordRef, resultsRef, query, postsPerPageNASA, setTotalPosts, setSearchCurrentPage,  setSearchTotalPages,  setHasMore, cancelSourceSearch, setCancelSourceSearch, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, mediaPreference, sortPreference,})}

    return (<>
        <HeadItem
            imageUrl={headObject.imageUrl}
            title={headObject.title}
            description={headObject.description}
            noIndex={false}
            defaultURL={false} />
        <SearchSettingModal />
            <div className="mt-8 mb-48">
                <div className="text-center mb-10">
                    <div className="mb-12 sm:mb-18">
                        <NasaSearchH1 custom={true}/>
                        <SearchSettingsButton  handleSettings={handleSettings} />
                    </div>                 
                    <div className="h3"><Language jp={"(英語のみ)"} en={""} /></div>
                    <form onSubmit={handleOnSubmit}>
                        <h2>
                            <input ref={inputRef} className="border rounded p-4 text-xl sm:text-2xl border-black text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"  placeholder={language ? `キーワードを入力` : `Input Keywords`} type="text" value={preQuery} onChange={handleChange} />
                        </h2>
                        <div className="mt-10">
                            <div className="my-4 mr-3" onClick={()  => preQuery && handleList({item: {id: Math.random().toString(36).substring(2,11), jp: preQuery, en: preQuery, category: preQuery}, setQuery, setSearchKeyword})}>
                                <input className="buttonGreenBigger" type="submit" value={language ? "検索" : "Search"} />
                            </div>
                        </div>
                    </form> 
                </div>
                <div className="text-center text-xl sm:text-2xl font-bold text-blue-500 hover:text-purple-500 hover:underline">
                    <LinkButtonTwo
                        jp={"用語リストからキーワードを選ぶ"} 
                        en={"Choose from Keyword List"} 
                        url={"nasa-search"} 
                        type={""}
                    />
                </div>       
                {showDetailsModal && <NASA_HubbleModal />}              
                {query && <SearchResults />}
        </div>
    </>)}

export default NASA

export const getStaticProps = async () => {
    const headObject = headData.find(x => x.page === "nasa_images_custom")
      return {
            props: {headObject: headObject && headObject}, 
            revalidate: 10
  }
}