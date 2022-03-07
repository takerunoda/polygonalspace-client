import React from 'react'
import { usePostContext } from '../context/PostContext'
import { useBlogsContext } from '../pages/blogs'
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import BlogPostItem from './BlogPostItem'
import PageSubTitle from './PageSubTitle';
import { handleScrollPosition } from '../utils/handleScrollPosition'
import { FcNews } from 'react-icons/fc';
import DataSourceList from './DataSourceList';

const BlogsComponent = () => {
    const {blogPost: data} = usePostContext()
    const { initialData, loadingGeneral,
            elementRef, 
            elementInitialRef, 
            currentPage, 
            hasMoreGeneral, 
            isVisibleGeneral, 
            isVisibleGeneralInitial} = useBlogsContext()
    const handlePosition = () => handleScrollPosition({path: "sharedScroll"})
    const breadcrumb_1 = null
    const breadcrumb_2 = { name: "ブログ", name_EN: "Blogs", url: `/blogs`}

  return (
      <>
        <Breadcrumb 
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="mt-8">
            <h1 className="h1 flexJustifyCenter">
                <div className="transform text-indigo-500 text-4xl sm:text-5xl sm:mt-0 mr-1 sm:mr-2">
                    <FcNews />
                </div>
                <div className="pt-1">
                    <Language jp={"ブログ"} en={"Blog"}/>
                </div>
            </h1>
            <PageSubTitle 
                    jp={"宇宙トピックについてのブログ記事です🚀✨"} 
                    en={"Blog articles on space🚀✨"}/>
            <div className="outer">
            {initialData && initialData.map((item, index) => {
                if(initialData.length === index + 1){
                    return <BlogPostItem 
                                item={item} 
                                elementRef={elementInitialRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item.id}
                                handlePosition={handlePosition}
                                last={true} />
                } else {
                    return <BlogPostItem 
                                item={item} 
                                elementRef={elementInitialRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item.id}
                                handlePosition={handlePosition}
                                last={false} />
                            }
                })}
            {data && 
                data.map((item, index) => {
                    if(data.length === index + 1){
                    return <BlogPostItem 
                                item={item} 
                                elementRef={elementRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item.id}
                                handlePosition={handlePosition}
                                last={true} />
                    } else {
                    return <BlogPostItem 
                                item={item} 
                                elementRef={elementRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item.id}
                                handlePosition={handlePosition}
                                last={false} />
                    }})}
                </div>
            <DataSourceList imageOnly={true}/>
            {loadingGeneral && 
            <div className="loaderSmallGettingItems">
                <LoaderSmall />
            </div>}
        </div>
      </>
)}

export default BlogsComponent