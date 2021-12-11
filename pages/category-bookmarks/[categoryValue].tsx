import React, { useEffect, useRef, useState } from 'react'
import router from 'next/router';
import { GetStaticPropsContext } from 'next';
import Cookies from 'js-cookie';
import { HeadProps } from '../../Interfaces';
import Language from '../../Components/Language';
import HeadItem from '../../Components/HeadItem';
import LoaderSmall from '../../Components/LoaderSmall';
import SharedBookmarkItem from '../../Components/SharedBookmarkItem';
import ConfirmAddBookmarkModal from '../../Components/ConfirmAddBookmarkModal';
import { usePageContext } from '../../context/PageContext';
import { useModalContext } from '../../context/ModalContext';
import { useBookmarkContext } from '../../context/BookmarkContext';
import { useScrollPosition } from '../../utils/useScrollPosition';
import { handleScrollPosition } from '../../utils/handleScrollPosition';
import { useSetPrevePageDetails } from '../../utils/useSetPrevePageDetails';
import { useSetPageCookiesGeneral } from '../../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../../utils/useHandleObserverGeneral';
import { getAllCategoriesBookmarks } from '../../utils/getAllCategoriesBookmarks';
import { usePageChangeGeneralCategory } from '../../utils/usePageChangeGeneralCategory';
import { send_category_sharedbookmarks_by_page } from '../../utils/urls';
import { defaultDescription, defaultPicture, headData } from '../../utils/headData';

interface PageProps extends HeadProps { 
    category: string
    categoryValue: string
    defaultPicture: string, 
    defaultDescription: string, 
}

const SharedBookmarks = ({ category, categoryValue, headObject, defaultPicture, defaultDescription } :PageProps) => {
    const [hasMoreSharedCategory, setHasMoreSharedCategory] = useState(true)
    const [loadingSharedCategory, setLoadingSharedCategory] = useState<boolean>(false)
    const [isVisibleSharedCategory, setIsVisibleSharedCategory] = useState(false)
     
    const modalContext = useModalContext()
    if ( !modalContext ) {
        return null;
    }
    const bookmarkContext = useBookmarkContext()
    if ( !bookmarkContext ) {
        return null;
    }   
    const pageContext = usePageContext()
    if ( !pageContext ) {
        return null;
    }   
    const {categoryBookmarks, setCategoryBookmarks} = bookmarkContext
    const {pathName, loadingClickBookmark} = pageContext

    const currentPageCookie = Cookies.get("currentPageSharedCategory")
    const [currentPageSharedCategory, setCurrentPageSharedCategory] = 
               useState((categoryBookmarks.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    
    const totalPageCookie = Cookies.get("totalPagesSharedCategory")
    const [totalPagesSharedCategory, setTotalPagesSharedCategory] =
                    useState(totalPageCookie ? JSON.parse(totalPageCookie) : 2)
    const observerSharedCategoryRef = useRef<HTMLDivElement>(null)

     useHandleObserverGeneral({ 
            setIsVisibleGeneral: setIsVisibleSharedCategory, 
            loadingGeneral: loadingSharedCategory, 
            hasMoreGeneral: hasMoreSharedCategory, 
            observerGeneralRef: observerSharedCategoryRef })

    usePageChangeGeneralCategory({
        setLoadingGeneral: setLoadingSharedCategory, 
        setCurrentPageGeneral: setCurrentPageSharedCategory, 
        currentPageGeneral: currentPageSharedCategory, 
        setTotalPagesGeneral: setTotalPagesSharedCategory, 
        totalPagesGeneral: totalPagesSharedCategory, 
        setHasMoreGeneral: setHasMoreSharedCategory, 
        data: categoryBookmarks, 
        setData: setCategoryBookmarks, 
        isVisibleGeneral: isVisibleSharedCategory,
        urlName: send_category_sharedbookmarks_by_page,
        categoryValue: categoryValue
    })

    useSetPrevePageDetails(`/shared_bookmarks`)
    useScrollPosition({path: "sharedCategoryScroll"})

    useSetPageCookiesGeneral({
        currentPage: currentPageSharedCategory, 
        currentPageCookie: "currentPageSharedCategory", 
        totalPages: totalPagesSharedCategory, 
        totalPagesCookie: "totalPagesSharedCategory",})

    useEffect(() => {
        router.reload
    }, [category])


    return (
    <>
    <HeadItem
        imageUrl={defaultPicture}
        title={`${category} | Shared Bookmarks`}
        description={`キーワード: ${category}の共有ブックマーク一覧を表示しています。This page shows a list of shared bookmark items with a keyword of ${category}. ${defaultDescription}`} 
        noIndex={true}
        defaultURL={false}
    />
    {!loadingClickBookmark && <ConfirmAddBookmarkModal />}
        <h1 className="w-10/12 mx-auto h2 leading-relaxed">            
                <Language 
                jp={<ul className="leading-relaxed">
                        <li>キーワード <span className="text-purple-500">"{category}" </span>を含む</li>
                        <li>共有ブックマーク</li>
                    </ul>} 
                en={<ul className="leading-relaxed">
                        <li>Posts with Keyword of</li>
                        <li><span className="text-purple-500">"{category}" </span></li>
                    </ul>}/>
        </h1>
        <div className="outer">
            {categoryBookmarks ? 
            (categoryBookmarks.map((item, index) => {
                if(categoryBookmarks.length === index + 1){
                    return <SharedBookmarkItem item={item} 
                    items={categoryBookmarks} 
                    setItems={setCategoryBookmarks}  
                    observerSharedRef={observerSharedCategoryRef} key={item._id}
                    handlePosition={() => handleScrollPosition({path: "sharedCategoryScroll"})}
                    last={true}
                    />
                } else {
                    return <SharedBookmarkItem 
                    item={item} 
                    items={categoryBookmarks} 
                    setItems={setCategoryBookmarks}  
                    observerSharedRef={observerSharedCategoryRef} 
                    key={item._id}
                    handlePosition={() => handleScrollPosition({path: "sharedCategoryScroll"})}
                    last={false}
                    />
                }
            })) 
            : <div className="loaderSmallItemNotExist"><LoaderSmall /></div>
            }
        </div>
        {loadingSharedCategory && 
        <div className="loaderSmallGettingItems"><LoaderSmall /></div>}
        </>
    )
}

export default SharedBookmarks

export const getStaticProps = async (context:GetStaticPropsContext) => {
    const { params } = context
    let categoryValue = params && params.categoryValue

    if(categoryValue && typeof categoryValue !== "string"){
        categoryValue = categoryValue.toString()
    }
    
    const x = await getAllCategoriesBookmarks()

    const dataTwo = x && x.categoryAndValue

    const y = dataTwo && dataTwo.find(item => item.categoryValue === categoryValue)

    const category = y.category

    const headObject = headData.find(x => x.page === "category_bookmarks")
    
    const picture = defaultPicture
    const description = defaultDescription

      return {
            props: {    category: category, 
                        categoryValue: categoryValue && categoryValue, 
                        headObject: headObject && headObject, 
                        defaultPicture: picture, 
                        defaultDescription: description }, 
            revalidate: 10
  }
}

export const getStaticPaths = async () => {
        const x = await getAllCategoriesBookmarks()
        const data = x && x.categoryValue
        const paths = data  &&  data.map((value : any) => ({ params: { categoryValue: value.toString()} }))   

    return {
        paths,
        fallback:true
    }
}