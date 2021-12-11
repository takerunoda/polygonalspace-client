import React, { FormEvent } from "react"
import Language from "./Language"
import { usePageContext } from "../context/PageContext"
import { useModalContext } from "../context/ModalContext"
import { useSearchContext } from "../context/SearchContext"
import { handleList } from "../utils/handleList"
import { handleSearchSubmit } from "../utils/handleSearchSubmit"
import { handleNASAModalClose } from "../utils/handleNASAModalClose"

interface ComponentProps {
    category : string[] | undefined, 
    title : string, 
    description : string, 
}

const Category = ({
    category, 
    title, 
    description, 
} : ComponentProps) => {

    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const searchContext = useSearchContext()
        if ( !searchContext ) {
            return null
        }
    const {setLoading, timeoutId, setTimeoutId,postsPerPageNASA} = pageContext
    const { setShowDetailsModal, showMessageModal, setShowMessageModal, setMessage, setAddBookmarkModalToggleConfirm } = modalContext
    const { query,
            setQuery,
            setSearchKeyword,
            setNasaState,
            setTotalPosts,
            keywordRef,
            resultsRef,
            scrollRef,
            searchCurrentPage, setSearchCurrentPage,
            searchTotalPages, setSearchTotalPages,
            hasMore, setHasMore,
            mediaPreference, sortPreference,
            cancelSourceSearch, setCancelSourceSearch
        } = searchContext

const categories = category && category.filter(item => item !== title).filter(item => description.includes(item)).filter(item => item !== "").filter(item => item.length < 30)

    const handleHandleList = (item : any) => {
        const category = item
        const jp = item
        const en = item
        const id = Math.random().toString(36).substring(2,11);
        const data = {  category: category,
                        jp: jp,
                        en: en,
                        id: id,
                    }
        handleList({item: data, setQuery, setSearchKeyword})
        setTimeout(() => {
            handleNASAModalClose({setShowDetailsModal, setAddBookmarkModalToggleConfirm})
        }, 1000);
    }
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
            handleSearchSubmit(e, {setNasaState, setLoading, scrollRef, keywordRef, resultsRef, query, postsPerPageNASA, setTotalPosts, setSearchCurrentPage,  setSearchTotalPages,  setHasMore, cancelSourceSearch, setCancelSourceSearch, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, mediaPreference, sortPreference,})}
            
    return (<>
        <form onSubmit={handleOnSubmit}>
            {categories && categories.length > 0 && <ul className="flex flex-wrap">
                <li>
                    <span className="font-bold">
                        <Language jp={"キーワード"} en={"Keywords"}/>&nbsp;&nbsp;</span>
                </li>
                {categories && categories.map((item : any)=> 
                <li className="text-indigo-500" key={item}>
                    [&nbsp;<button className="hover:text-red-400 hover:underline cursor-pointer" 
                    onClick={() => handleHandleList(item)} 
                    type="submit">
                        {item}       
                    </button>&nbsp;]&nbsp;&nbsp; 
                </li>
                )} 
            </ul>}
        </form>
    </>)
}

export default Category