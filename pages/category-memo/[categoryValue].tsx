import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { GetStaticPropsContext } from 'next';
import Cookies from 'js-cookie';
import { CategoryMemoContextType, CategoryPostPageProps } from '../../Interfaces';
import { usePostContext } from '../../context/PostContext';
import { handlePageChange } from '../../utils/handlePageChange';
import HeadItemGeneral from '../../Components/HeadItemGeneral';
import CategoryMemoComponent from '../../Components/CategoryMemoComponent';
import { useScrollPosition } from '../../utils/useScrollPosition';
import { getAllCategoriesPosts } from '../../utils/getAllCategoriesPosts'
import { getInitialMemoCategory } from '../../utils/getInitialMemoCategory';
import { handlePageChangeInitial } from '../../utils/handlePageChangeInitial';
import { useSetPageCookiesGeneral } from '../../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../../utils/useHandleObserverGeneral';
import { defaultPicture, headData } from '../../utils/headData';
import { send_category_posts_by_page } from '../../utils/urls';
import { useHandleObserverGeneralInitial } from '../../utils/useHandleObserverGeneralInitial';

const CategoryPostsContext = createContext<CategoryMemoContextType | undefined>(undefined)

const CategoryPosts = ({ category, categoryValue, headObject, initialData, totalPages, itemsLength, siteUrl, baseName, twitterID, MyName } : CategoryPostPageProps) => {
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(false)
    const [hasMoreGeneral, setHasMoreGeneral] = useState<boolean>(true)
    const [isVisibleGeneral, setIsVisibleGeneral] = useState<boolean>(false)    
    const [isVisibleGeneralInitial, setIsVisibleGeneralInitial] = useState<boolean>(false)
    const {categoryPost, setCategoryPost,} = usePostContext();    
    const currentPageCookie = Cookies.get("currentPagePostCategory")
    const [currentPage, setCurrentPage] = 
               useState((categoryPost.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 2)    
    const elementRef = useRef(null)
    const elementInitialRef = useRef(null)
    const pageChangeInitial = useCallback(() => handlePageChangeInitial({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: categoryPost, 
            setData: setCategoryPost, 
            urlName: send_category_posts_by_page,
            itemsLength
    }), [categoryPost, currentPage, hasMoreGeneral, itemsLength, setCategoryPost, totalPages])
    const pageChange = useCallback(() => handlePageChange({
            setLoadingGeneral,
            setCurrentPage,
            currentPage,
            totalPages,
            hasMoreGeneral,
            setHasMoreGeneral,
            data: categoryPost,
            setData: setCategoryPost, 
            urlName: send_category_posts_by_page,
            itemsLength
    }), [categoryPost, currentPage, hasMoreGeneral, itemsLength, setCategoryPost, totalPages])
    useHandleObserverGeneral({
            pageChange,
            setIsVisibleGeneral,
            elementRef,
            items: categoryPost,
         })
    useHandleObserverGeneralInitial({ 
            pageChangeInitial,
            setIsVisibleGeneralInitial,
            elementInitialRef,
         })
    useScrollPosition({path: "postCategoryScroll"})
    useSetPageCookiesGeneral({
        currentPage,
        currentPageCookie: "currentPagePostCategory", 
        totalPages,
        totalPagesCookie: "totalPagesPostCategory",})

    const categoryPostsValue = useMemo(() => ({
                    loadingGeneral, initialData, elementRef, elementInitialRef, currentPage, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial,
                    category, categoryValue, 
     }), [category, categoryValue, currentPage, hasMoreGeneral, initialData, isVisibleGeneral, isVisibleGeneralInitial, loadingGeneral])

    return (
    <CategoryPostsContext.Provider value={categoryPostsValue}>
        {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItemGeneral
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {`category-memo/${categoryValue}`}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <CategoryMemoComponent />
    </CategoryPostsContext.Provider>
    )
}

export default CategoryPosts

export function useCategoryPostsContext() {
    const context = useContext(CategoryPostsContext)
        if (context === undefined) {
            throw new Error('useContext(CategoryPostsContext) is undefined')
        }
        return context
}

export const getStaticProps = async (context:GetStaticPropsContext) => {
            const { params } = context
            let categoryValue = params && params.categoryValue
            if(categoryValue && typeof categoryValue !== "string"){
                categoryValue = categoryValue.toString()
            }    
            const x = await getAllCategoriesPosts()
            const dataTwo = x && x.categoryAndValue
            const y = dataTwo && dataTwo.find(item => item.categoryValue === categoryValue)
            const category = y.category
            const initialData = categoryValue && await getInitialMemoCategory({categoryValue}) 
            const items = initialData && initialData.items
            const totalPages = initialData && initialData.totalPages
            const itemsLength = initialData && initialData.itemsLength
            const headObject = headData.find(x => x.page === "category_posts")
            const siteUrl = process.env.SITE_URL
            const baseName = process.env.BASE_SITE_NAME
            const twitterID = process.env.TWITTER_ID
            const MyName = process.env.MYNAME
            const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
            const description = `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。このページでは、キーワード: ${category}の投稿一覧を表示しています。This page shows a list of posts with the keyword of ${category}.`
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
        const x = await getAllCategoriesPosts()
        const data = x && x.categoryValue
        const paths = data  &&  data.map((value : any) => ({ params: { categoryValue: value.toString()} }))
        
    return {
        paths,
        fallback:true
    }
}