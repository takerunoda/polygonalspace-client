import React, { FormEvent, useRef } from 'react'
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import { useFunctionsContext } from '../context/FunctionsContext';
import Language from '../Components/Language';
import Breadcrumb from '../Components/Breadcrumb';
import NasaSearchH1 from '../Components/NasaSearchH1';
import PageSubTitle from '../Components/PageSubTitle';
import LinkButtonTwo from '../Components/LinkButtonTwo';
import SearchResults from '../Components/SearchResults';
import NASA_HubbleModal from '../Components/NASA_HubbleModal';
import SearchSettingModal from '../Components/SearchSettingModal';
import SearchSettingsButton from '../Components/SearchSettingsButton';

const NasaSearchCustomComponent = () => {
    const {language} = usePageContext()    
    const { query, preQuery,} = useSearchContext()
    const { showDetailsModal, } = useModalContext()  
    const {handleSearchSubmitFn, handleListFn, handleSettPreQueryFn} = useFunctionsContext()
    const inputRef = useRef<HTMLInputElement>(null);
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => handleSearchSubmitFn(e)
    const breadcrumb_1 = null
    const breadcrumb_2 = { 
        name: `NASAの宇宙画像を検索 (カスタム)`, 
        name_EN: `Custom Search for NASA Space images`, 
        url: `/nasa-search-custom`
    }

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <SearchSettingModal />
            <div className="mt-8 mb-48">
                <div className="text-center mb-10">
                    <div className="">
                        <NasaSearchH1 custom={true}/>
                        <PageSubTitle 
                                jp={"NASAウェブサイトにアクセスして記事を取得できます 🚀✨"} 
                                en={"Retrieve articles from NASA website 🚀✨"}/>
                    </div>                 
                    <div className="h3 text-red-500"><Language jp={"＊英語のみ＊"} en={""} /></div>
                        <SearchSettingsButton  />
                    <form onSubmit={handleOnSubmit}>
                        <h2>
                            <input ref={inputRef} className="border rounded p-4 text-xl sm:text-2xl border-black text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"  placeholder={language ? `キーワードを入力` : `Input Keywords`} type="text" value={preQuery} onChange={handleSettPreQueryFn} />
                        </h2>
                        <div className="mt-10">
                            <div className="my-4 mr-3" onClick={()  => preQuery && handleListFn({item: {id: Math.random().toString(36).substring(2,11), jp: preQuery, en: preQuery, category: preQuery}})}>
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
    
    </>
  )
}

export default NasaSearchCustomComponent