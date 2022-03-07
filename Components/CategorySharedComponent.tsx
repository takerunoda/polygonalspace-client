import React from 'react'
import { usePostContext } from '../context/PostContext'
import { useCategorySharedContext } from '../pages/category-shared/[categoryValue]'
import LoaderSmall from './LoaderSmall'
import SharedBookmarkItem from './SharedBookmarkItem'
import { handleScrollPosition } from '../utils/handleScrollPosition'
import Breadcrumb from './Breadcrumb'
import Language from './Language'
import PageSubTitle from './PageSubTitle'
import ConfirmAddBookmarkModal from './ConfirmAddBookmarkModal'
import { usePageContext } from '../context/PageContext'
import DataSourceList from './DataSourceList'

const CategorySharedComponent = () => {
    const { initialData, 
            elementRef, 
            elementInitialRef, 
            currentPage, 
            hasMoreGeneral, 
            isVisibleGeneral, 
            isVisibleGeneralInitial, 
            loadingGeneral, 
            category, categoryValue, } = useCategorySharedContext()
    const {categoryBookmarks: data} = usePostContext()
    const {loadingClickBookmark} = usePageContext()
    const handlePosition = () => handleScrollPosition({path: "sharedCategoryScroll"})
    const breadcrumb_1 = { name: "共有ブックマーク", name_EN: "Shared", url: `/shared`}
    const breadcrumb_2 = { name: category, name_EN: category, url: `/category-shared/${categoryValue}`}

  return (<>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        {!loadingClickBookmark && <ConfirmAddBookmarkModal />}
        <h1 className="w-10/12 mx-auto h2 leading-relaxed">            
                <Language 
                jp={<ul className="leading-relaxed">
                        <li>キーワード <span className="text-purple-500">&quot;{category}&quot; </span>を含む</li>
                        <li>共有ブックマーク</li>
                    </ul>} 
                en={<ul className="leading-relaxed">
                        <li>Posts with Keyword of</li>
                        <li><span className="text-purple-500">&quot;{category}&quot; </span></li>
                    </ul>}/>
        </h1>
        <PageSubTitle 
                jp={"選択したキーワードを含む記事を表示しています 📚"} 
                en={"Aticles including the keyword you selected 📚"} />
        <div className="outer">
            {initialData && initialData.map((item, index) => {
                if(initialData.length === index + 1){
                    return <SharedBookmarkItem 
                                item={item} 
                                elementRef={elementInitialRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item._id}
                                handlePosition={handlePosition}
                                last={true}    />
                } else {
                    return <SharedBookmarkItem 
                                item={item} 
                                elementRef={elementInitialRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item._id}
                                handlePosition={handlePosition}
                                last={false}    />
                            }})}
            {data ? 
            (data.map((item, index) => {
                if(data.length === index + 1){
                    return <SharedBookmarkItem 
                                item={item} 
                                elementRef={elementRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item._id}
                                handlePosition={handlePosition}
                                last={true}    />
                } else {
                    return <SharedBookmarkItem 
                                item={item} 
                                elementRef={elementRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item._id}
                                handlePosition={handlePosition}
                                last={false}    />
                }
            })) 
            : <div className="loaderSmallItemNotExist"><LoaderSmall /></div>
            }
        </div>
        <DataSourceList imageOnly={false}/>
        {loadingGeneral && 
        <div className="loaderSmallGettingItems"><LoaderSmall /></div>}        
  </>
  )
}

export default CategorySharedComponent