import React from 'react'
import { usePostContext } from '../context/PostContext'
import { useCategoryPostsContext } from '../pages/category-memo/[categoryValue]'
import PostItem from './PostItem'
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import PageSubTitle from './PageSubTitle';
import { handleScrollPosition } from '../utils/handleScrollPosition'
import DataSourceList from './DataSourceList';

const CategoryMemoComponent = () => {
    const { initialData, loadingGeneral,
            elementRef, category, categoryValue, 
            elementInitialRef, 
            currentPage, 
            hasMoreGeneral, 
            isVisibleGeneral, 
            isVisibleGeneralInitial} = useCategoryPostsContext()
    const {categoryPost: data} = usePostContext()
    const handlePosition = () => handleScrollPosition({path: "postCategoryScroll"})
    const breadcrumb_1 = { name: "メモ", name_EN: "Memo", url: `/memo`}
    const breadcrumb_2 = { name: category, name_EN: category, url: `/tag/${categoryValue}`}
    
  return (
      <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="mt-8">
            <h1 className="w-10/12 mx-auto h1">
                <Language jp={<>キーワード <span className="text-purple-500">{category} </span>を含む記事</>} en={<>Posts with Keyword <span className="text-purple-500"> &quot;{category}&quot;</span></>}/>
            </h1>
        <PageSubTitle 
                jp={"NASAの宇宙画像についてのメモ書きです 📝"} 
                en={"Memos on NASA space pictures (Japanese) 📝"}/>
            <div className="outer">
            {initialData && initialData.map((item: any, index: any) => {
                if(initialData.length === index + 1){
                return <PostItem 
                            item={item} 
                            elementRef={elementInitialRef} 
                            currentPage={currentPage}
                            hasMore={hasMoreGeneral}
                            isVisible={isVisibleGeneral}
                            isVisibleInitial={isVisibleGeneralInitial}
                            key={item._id}
                            handlePosition={handlePosition}
                            last={true} />

                } else {
                return <PostItem 
                            item={item} 
                            elementRef={elementInitialRef} 
                            currentPage={currentPage}
                            hasMore={hasMoreGeneral}
                            isVisible={isVisibleGeneral}
                            isVisibleInitial={isVisibleGeneralInitial}
                            key={item._id}
                            handlePosition={handlePosition}
                            last={false} />
                        }
                })}
                {data && 
                (data.map((item: any, index: any) => {
                    if(data.length === index + 1){
                        return <PostItem 
                                    item={item} 
                                    elementRef={elementRef} 
                                    currentPage={currentPage}
                                    hasMore={hasMoreGeneral}
                                    isVisible={isVisibleGeneral}
                                    isVisibleInitial={isVisibleGeneralInitial}
                                    key={item._id}
                                    handlePosition={handlePosition}
                                    last={true} />

                        } else {
                        return <PostItem 
                                    item={item} 
                                    elementRef={elementRef} 
                                    currentPage={currentPage}
                                    hasMore={hasMoreGeneral}
                                    isVisible={isVisibleGeneral}
                                    isVisibleInitial={isVisibleGeneralInitial}
                                    key={item._id}
                                    handlePosition={handlePosition}
                                    last={false} />
                                }
                            }))}
            </div>
        <DataSourceList imageOnly={true}/>
        {loadingGeneral && <div className="loaderSmallGettingItems"><LoaderSmall /></div>}
        </div>
      </>
  )
}

export default CategoryMemoComponent