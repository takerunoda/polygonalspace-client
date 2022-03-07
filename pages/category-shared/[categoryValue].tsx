import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import router from 'next/router';
import { GetStaticPropsContext } from 'next';
import Cookies from 'js-cookie';
import { CategoryPostPageProps, CategorySharedContextType } from '../../Interfaces';
import { useScrollPosition } from '../../utils/useScrollPosition';
import { useSetPageCookiesGeneral } from '../../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../../utils/useHandleObserverGeneral';
import { getAllCategoriesBookmarks } from '../../utils/getAllCategoriesBookmarks';
import { send_category_sharedbookmarks_by_page } from '../../utils/urls';
import { defaultDescription, defaultPicture, headData } from '../../utils/headData';
import { getInitialSharedCategory } from '../../utils/getInitialSharedCategory';
import HeadItemNoIndex from '../../Components/HeadItemNoIndex';
import { handlePageChangeInitial } from '../../utils/handlePageChangeInitial';
import { handlePageChange } from '../../utils/handlePageChange';
import { useHandleObserverGeneralInitial } from '../../utils/useHandleObserverGeneralInitial';
import CategorySharedComponent from '../../Components/CategorySharedComponent';
import { usePostContext } from '../../context/PostContext';

const CategorySharedContext = createContext<CategorySharedContextType | undefined>(undefined)

const SharedBookmarks = ({ category, categoryValue, headObject, initialData, totalPages, itemsLength, siteUrl, baseName, twitterID, MyName } :CategoryPostPageProps) => {
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)    
    const [isVisibleGeneralInitial, setIsVisibleGeneralInitial] = useState<boolean>(false)
    const {categoryBookmarks, setCategoryBookmarks} = usePostContext()
    const currentPageCookie = Cookies.get("currentPageSharedCategory")
    const [currentPage, setCurrentPage] =
               useState((categoryBookmarks.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)    
    const elementRef = useRef(null)
    const elementInitialRef = useRef(null)
    const pageChangeInitial = useCallback(() => handlePageChangeInitial({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: categoryBookmarks, 
            setData: setCategoryBookmarks, 
            urlName: send_category_sharedbookmarks_by_page,
            itemsLength,
    }), [categoryBookmarks, currentPage, hasMoreGeneral, itemsLength, setCategoryBookmarks, totalPages])
    const pageChange = useCallback(() => handlePageChange({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: categoryBookmarks,
            setData: setCategoryBookmarks, 
            urlName: send_category_sharedbookmarks_by_page,
            itemsLength,
    }), [categoryBookmarks, currentPage, hasMoreGeneral, itemsLength, setCategoryBookmarks, totalPages])
    useHandleObserverGeneral({
            pageChange,
            setIsVisibleGeneral,
            elementRef,
            items: categoryBookmarks,
         })
    useHandleObserverGeneralInitial({ 
            pageChangeInitial,
            setIsVisibleGeneralInitial,
            elementInitialRef,
         })
    useScrollPosition({path: "sharedCategoryScroll"})
    useSetPageCookiesGeneral({
        currentPage,
        currentPageCookie: "currentPageSharedCategory", 
        totalPages,
        totalPagesCookie: "totalPagesSharedCategory",})
    useEffect(() => {
        router.reload
    }, [category])

    const sharedValue = useMemo(() => ({
            category, categoryValue, loadingGeneral, initialData, elementRef, elementInitialRef, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial
        }), [category, categoryValue, currentPage, hasMoreGeneral, initialData, isVisibleGeneral, isVisibleGeneralInitial, loadingGeneral])

    return (
    <CategorySharedContext.Provider value={sharedValue}>
        {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItemNoIndex
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {`category-shared/${categoryValue}`}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <CategorySharedComponent />
    </CategorySharedContext.Provider>
    )}

export default SharedBookmarks

export function useCategorySharedContext(){
    const context = useContext(CategorySharedContext)
        if(context === undefined){
            throw new Error("useContext(useCategorySharedContext) is undefined")
        }
        return context
    }


export const getStaticProps = async (context: GetStaticPropsContext) => {
            const { params } = context
            let categoryValue = params && params.categoryValue
            if(categoryValue && typeof categoryValue !== "string"){
                categoryValue = categoryValue.toString()
            }
            const x = await getAllCategoriesBookmarks()
            const dataTwo = x && x.categoryAndValue
            const y = dataTwo && dataTwo.find(item => item.categoryValue === categoryValue)
            const category = y.category
            const initialData = categoryValue && await getInitialSharedCategory({categoryValue}) 
            const items = initialData && initialData.items
            const totalPages = initialData && initialData.totalPages
            const itemsLength = initialData && initialData.itemsLength
            const headObject = headData.find(x => x.page === "category_bookmarks")
            const siteUrl = process.env.SITE_URL
            const baseName = process.env.BASE_SITE_NAME
            const twitterID = process.env.TWITTER_ID
            const MyName = process.env.MYNAME
            const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
            const description = `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。このページでは、キーワード: ${category}の共有ブックマーク一覧を表示しています。This page shows a list of shared bookmark items with a keyword of ${category}. ${defaultDescription}`
            const title = `${category.toUpperCase()}`
            const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl, description: description, title: title}

      return {
            props: {    category: category, 
                        categoryValue: categoryValue && categoryValue, 
                        headObject: updatedHeadObject && updatedHeadObject,
                        initialData: items,
                        totalPages: totalPages,
                        itemsLength: itemsLength,
                        siteUrl: siteUrl,
                        baseName: baseName,
                        twitterID: twitterID,
                        MyName: MyName,
                    }, 
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