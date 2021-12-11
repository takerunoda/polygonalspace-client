import React, { FormEvent } from 'react'
import Link from 'next/link'
import { HeadProps } from '../Interfaces';
import HeadItem from '../Components/HeadItem';
import Language from '../Components/Language';
import NasaSearchH1 from '../Components/NasaSearchH1';
import SearchResults from '../Components/SearchResults';
import NASA_HubbleModal from '../Components/NASA_HubbleModal';
import SearchSettingModal from '../Components/SearchSettingModal';
import SearchSettingsButton from '../Components/SearchSettingsButton';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import { headData } from '../utils/headData';
import { onlyUnique } from '../utils/onlyUnique';
import { handleList } from '../utils/handleList';
import { useSetQueryNull } from '../utils/useSetQueryNull';
import { handleSearchSubmit } from '../utils/handleSearchSubmit';
import { useBodyOverflowHidden } from '../utils/useBodyOverflowHidden';
import { category, categoryParents, categoryParentsValues, glossary } from '../utils/glossary';

interface PageProps extends HeadProps{
    glossaryData: {
                    id: number | string;
                    jp: string;
                    en: string;
                    category: string;
                    url?: string;
                }[],
    categoryData: {
                    catName: string;
                    value: string;
                    en: string;
                    parent_value: string;
                    parent_jp: string;
                    parent_en: string;
                }[],
    categoryParentsData: {
                    parent_value: string;
                    parent_jp: string;
                    parent_en: any ;
                }[]
    categoryParentsValuesData: string[]
}

const NASAImages = ({
                glossaryData, 
                categoryData, 
                categoryParentsData,
                categoryParentsValuesData,
                headObject
            } : PageProps) => {

    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const searchContext = useSearchContext()
        if ( !searchContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const {setLoading, language, timeoutId, setTimeoutId, postsPerPageNASA} = pageContext
    const { query, setQuery,
            nasaState,
            setNasaState,
            setTotalPosts,
            categoryState, setCategoryState,
            searchKeyword, setSearchKeyword,
            categoryRef,
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
    const handleCategory = (itemValue: { catName: string; value: string; en:string} ) => {
        setQuery("")
        setSearchKeyword(null)
        setNasaState([])
        setCategoryState(itemValue)
        setTimeout(() => {
            scrollRef(categoryRef)                
        }, 500);
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
            defaultURL={false}
        />
        <SearchSettingModal />    
        <div className="mt-8 mb-48 max-w-5xl mx-auto">
            <NasaSearchH1 custom={false}/>            
            <SearchSettingsButton handleSettings={handleSettings} />
        <h2 className="h2"><Language jp={<><p className="text-indigo-500 mb-2 sm:mb-5">ステップ 1</p><p>カテゴリーを選択</p>
            </>} en={<><p className="text-indigo-500 mb-2 sm:mb-5">Step 1</p><p>Categories</p></> }/></h2>
        <div className="w-72 xs:w-full mx-auto mt-10 sm:mt-20">
            {categoryParentsValuesData.map(parent =>
            <div key={parent}>
                <h3 className="h2 text-purple-700">{categoryParentsData.filter(item =>  item.parent_value === parent).map(item => (language ? item.parent_jp : item.parent_en)).filter(onlyUnique)}</h3>
                <div className="flex flex-wrap">
                        {categoryData.filter(item => item.parent_value === parent).map(item => (
                            <h3 key={item.value} className="text-base w-1/2 sm:w-1/3  md:w-1/4 lg:w-1/6 xl:w-50 mb-5 text-center">
                                <button 
                                    className={categoryState && item.catName === categoryState.catName ?
                                    `w-32 xs:w-36 py-2 sm:py-3 px-1 border border-green-500 rounded bg-green-500 text-white overflow-scroll	${language && item.catName.length > 15 && "text-sm"}` : 
                                    `w-32 xs:w-36 py-2 sm:py-3 px-1 border border-green-400 rounded hover:text-green-500 overflow-scroll ${language && item.catName.length > 15 && "text-sm"}`
                                    } onClick={() => handleCategory(item)}>
                                    <Language jp={item.catName} en={item.en}/>
                                </button>
                            </h3>))}
                    </div>
                </div>)}
            <div className="mt-8">
                <Link href="/nasa-search-custom">
                    <h2 className="h3 text-purple-700 border-purple-400 hover:text-blue-500 hover:border-blue-400 hover:underline cursor:pointer w-60 xs:w-96 mx-auto py-5 sm:py-10 px-5 border rounded cursor-pointer">
                        <Language 
                            jp={<p>フリーワード検索 (英語)</p>} 
                            en={<><p>Custom Search</p><p>(English only)</p></>}/>
                    </h2>
                </Link>
            </div>
        </div>    
        <form onSubmit={handleOnSubmit}>
            <div className={`pb-4 xs:pb-1`} ref={categoryRef}></div>
            <div className="mt-24 sm:mb-5 w-72 sm:w-full mx-auto">
                {categoryState && <Language jp={<h2 className="h2 ">
                    <p className="text-indigo-500 mb-2">ステップ 2 </p>
                    <p className="mt-3 sm:mt-6">「{categoryState?.catName}」の</p>
                    <p>キーワードを選択</p>
                </h2>} en={<h2 className="h2">
                    <p className="text-indigo-500 mb-2">Step 2 </p>
                    <p>Keywords of { `"${categoryState?.en}"`}</p>                
                </h2>}/>}
            </div>
            <div className="w-72 xs:w-full my-12 sm:my-24 mx-auto flex flex-wrap">
                    {glossaryData.map(item => 
                        <h3 key={item && item.id} className={categoryState && item && item.category && item.category === categoryState.value ? "text-base w-1/2 sm:w-1/3  md:w-1/4 lg:w-1/6 xl:w-50 mb-5 text-center" : "hidden"}>
                            <button 
                            className={
                                searchKeyword && item &&item.en === searchKeyword.en ? 
                                `w-32 xs:w-36 py-2 sm:py-3 px-1 border border-green-500 rounded bg-green-500 text-white overflow-scroll	${language && item.jp.length > 15 && "text-sm"}` : 
                                        `w-32 xs:w-36 py-2 sm:py-3 px-1 border border-green-400 rounded hover:text-green-500 overflow-scroll ${language && item.jp.length > 15 && "text-sm"}`
                                    }
                                    onClick={()  => item && handleList({item: item, setQuery, setSearchKeyword})}>
                                <Language jp={item.jp} en={item.en}/>    
                                </button>
                        </h3>)}
            </div>
        </form>
            {showDetailsModal && <NASA_HubbleModal />}
        </div>
        {query && <SearchResults />}
    </>
    )
}

export default NASAImages

export const getStaticProps = async () => {
    const glossaryData = glossary
    const categoryData = category
    const categoryParentsData = categoryParents
    const categoryParentsValuesData = categoryParentsValues
    const headObject = headData.find(x => x.page === "nasa_images")
      return {
            props: {glossaryData: glossaryData,
                    categoryData: categoryData,
                    categoryParentsData,
                    categoryParentsValuesData,
                    headObject: headObject && headObject,
                }, 
            revalidate: 10
  }
}