import React, { useRef, useState } from 'react'
import { GetStaticPropsContext } from 'next';
import Cookies from 'js-cookie';
import { HeadProps } from '../../Interfaces';
import HeadItem from '../../Components/HeadItem';
import PostItem from '../../Components/PostItem';
import Language from '../../Components/Language';
import LoaderSmall from '../../Components/LoaderSmall';
import ConfirmDeletePostCategoryModal from '../../Components/ConfirmDeletePostCategoryModal';
import { useModalContext } from '../../context/ModalContext';
import { usePostContext } from '../../context/PostContext';
import { useScrollPosition } from '../../utils/useScrollPosition';
import { handleScrollPosition } from '../../utils/handleScrollPosition';
import { getAllCategoriesPosts } from '../../utils/getAllCategoriesPosts';
import { useSetPrevePageDetails } from '../../utils/useSetPrevePageDetails';
import { useSetPageCookiesGeneral } from '../../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../../utils/useHandleObserverGeneral';
import { send_category_posts_by_page } from '../../utils/urls';
import { usePageChangeGeneralCategory } from '../../utils/usePageChangeGeneralCategory';
import { defaultDescription, defaultPicture, headData } from '../../utils/headData';

interface PageProps extends HeadProps {
    category: string
    categoryValue: string
    defaultPicture: string, 
    defaultDescription: string
}

const CategoryPosts = ({ category, categoryValue, headObject, defaultPicture, defaultDescription } : PageProps) => {   

    const [hasMorePostCategory, setHasMorePostCategory] = useState(true)

    const [loadingPostCategory, setLoadingPostCategory] = useState<boolean>(false)

    const [isVisiblePostCategory, setIsVisiblePostCategory] = useState(false)

    //Context 
    //useUserContext is either UserContextType or undefined. it cannot be destructured until it is made sure as not undefined.
    const postContext = usePostContext()
        if ( !postContext ) {
        return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }

    const {allPost, setAllPost, categoryPost, setCategoryPost,} = postContext;
    
    const currentPageCookie = Cookies.get("currentPagePostCategory")
    const [currentPagePostCategory, setCurrentPagePostCategory] = 
               useState((allPost.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    
    const totalPageCookie = Cookies.get("totalPagesPostCategory")
    const [totalPagesPostCategory, setTotalPagesPostCategory] =
                    useState(totalPageCookie ? JSON.parse(totalPageCookie) : 2)

    const observerPostCategoryRef = useRef<HTMLDivElement>(null)

     useHandleObserverGeneral({ 
            setIsVisibleGeneral: setIsVisiblePostCategory, 
            loadingGeneral: loadingPostCategory, 
            hasMoreGeneral: hasMorePostCategory, 
            observerGeneralRef: observerPostCategoryRef })

    usePageChangeGeneralCategory({
        setLoadingGeneral: setLoadingPostCategory, 
        setCurrentPageGeneral: setCurrentPagePostCategory, 
        currentPageGeneral: currentPagePostCategory, 
        setTotalPagesGeneral: setTotalPagesPostCategory, 
        totalPagesGeneral: totalPagesPostCategory, 
        setHasMoreGeneral: setHasMorePostCategory, 
        data: categoryPost, 
        setData: setCategoryPost, 
        isVisibleGeneral: isVisiblePostCategory,
        urlName: send_category_posts_by_page,
        categoryValue: categoryValue
    })

    useSetPrevePageDetails(`/all_posts`)

    useScrollPosition({path: "postCategoryScroll"})

    useSetPageCookiesGeneral({
        currentPage: currentPagePostCategory, 
        currentPageCookie: "currentPagePostCategory", 
        totalPages: totalPagesPostCategory, 
        totalPagesCookie: "totalPagesPostCategory",})

    return (
    <>
    <HeadItem
        imageUrl={defaultPicture}
        title={`${category} | Posts`}
        description={`キーワード: ${category}の投稿一覧を表示しています。This page shows a list of posts with a keyword of ${category}. ${defaultDescription}`}
        noIndex={false}
        defaultURL={false}
        />
        <ConfirmDeletePostCategoryModal />
        <div className="mt-8">
            <h1 className="w-10/12 mx-auto h1">
                <Language jp={<>キーワード <span className="text-purple-500">{category} </span>を含む記事</>} en={<>Posts with Keyword <span className="text-purple-500"> "{category}"</span></>}/>
            </h1>
            <div className={categoryPost ? "outer" : ""}>
                {categoryPost ? 
                (categoryPost.map((item, index) => {
                    if(categoryPost.length === index + 1){
                        return <PostItem 
                                    item={item} 
                                    items={categoryPost} 
                                    setItems={setCategoryPost}      
                                    observerPostRef={observerPostCategoryRef} 
                                    key={item._id}
                                    handlePosition={() => handleScrollPosition({path: "postCategoryScroll"})}
                                    last={true} />
                    } else {
                        return <PostItem 
                                    item={item} items={categoryPost} 
                                    setItems={setCategoryPost}      
                                    observerPostRef={observerPostCategoryRef} 
                                    key={item._id}
                                    handlePosition={() => handleScrollPosition({path: "postCategoryScroll"})}
                                    last={false} />
                                }
                }))
                : <div className="loaderSmallItemNotExist"><LoaderSmall /></div>
                }
            </div>
        {loadingPostCategory && <div className="loaderSmallGettingItems"><LoaderSmall /></div>}
        </div>
        </>
    )
}

export default CategoryPosts

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

    const headObject = headData.find(x => x.page === "category_posts")

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
        const x = await getAllCategoriesPosts()
        const data = x && x.categoryValue
        const paths = data  &&  data.map((value : any) => ({ params: { categoryValue: value.toString()} }))
        
    return {
        paths,
        fallback:true
    }
}