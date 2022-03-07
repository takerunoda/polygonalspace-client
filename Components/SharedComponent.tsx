import React from 'react'
import { usePostContext } from '../context/PostContext'
import { usePageContext } from '../context/PageContext'
import { useSharedContext } from '../pages/shared'
import Language from './Language'
import Breadcrumb from './Breadcrumb'
import LoaderSmall from './LoaderSmall'
import PageSubTitle from './PageSubTitle'
import DataSourceList from './DataSourceList'
import SharedBookmarkItem from './SharedBookmarkItem'
import ConfirmAddBookmarkModal from './ConfirmAddBookmarkModal'
import { handleScrollPosition } from '../utils/handleScrollPosition'
import { FcShare } from 'react-icons/fc'

const SharedComponent = () => {
    const { loadingGeneral, 
            initialData, 
            elementRef, 
            elementInitialRef, 
            currentPage, 
            hasMoreGeneral, 
            isVisibleGeneral, 
            isVisibleGeneralInitial} = useSharedContext()
    const {allBookmarks: data} = usePostContext()
    const {loadingClickBookmark} = usePageContext()
    const handlePosition = () => handleScrollPosition({path: "sharedScroll"})  
    const breadcrumb_1 = null
    const breadcrumb_2 = 
    { name: "共有ブックマーク", name_EN: "Shared", url: `/shared`}
    
  return (
      <>
    {!loadingClickBookmark && <ConfirmAddBookmarkModal />}
        <Breadcrumb 
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <h1 className="h1 flexJustifyCenter">
            <div className="text-indigo-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                <FcShare />
            </div>
            <div className="pt-1">
                <Language jp={"共有ブックマーク"} en={"Shared Bookmarks"}/>
            </div>
        </h1>
        <PageSubTitle
                jp={"1人以上のユーザーがブックマークした記事の中からピックアップしています 🚀✨"} 
                en={"Featured aritcles bookmarked by at least one user 🚀✨"}/>
        <div className="outer">
                {initialData && initialData.map((item: any, index: any) => {
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
                                    last={true} />
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
                                }
                    })}
                {data ? 
                (data.filter((item: any) => item.public === true).map((item: any, index: any) => {
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
                                    last={true} />
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
                :   <div className="loaderSmallItemNotExist">
                        <LoaderSmall />
                    </div>}
        </div>
        <DataSourceList imageOnly={false}/>
        {loadingGeneral && 
        <div className="loaderSmallGettingItems"><LoaderSmall /></div>}
      </>
  )
}

export default SharedComponent