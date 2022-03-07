import React from 'react'
import { useUserContext } from '../context/UserContext'
import { useMyBookmarkContext } from '../pages/mybookmarks';
import { BookmarkItem } from './BookmarkItem'
import Language from './Language'
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import PageSubTitle from './PageSubTitle';
import DataSourceList from './DataSourceList';
import ConfirmDeleteBookmarkModal from './ConfirmDeleteBookmarkModal';
import { BsBookmarks } from 'react-icons/bs';

const MyBookmarksComponent = () => {
    const {userBookmark: data} = useUserContext()
    const {loadingGeneral} = useMyBookmarkContext()
    const breadcrumb_1 = 
    { name: "マイページ", name_EN: "My Page", url: `/mypage`}
    const breadcrumb_2 = 
    { name: "ブックマーク", name_EN: "My Bookmarks", url: `/mybookmarks`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="w-full mx-auto pb-56">
            <ConfirmDeleteBookmarkModal />
        {/* if user state is neither null nor undefined, display items here based on the bookmark array*/}
        <h1 className="h1 flexJustifyCenter">
            <div className="text-indigo-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                <BsBookmarks />
            </div>
            <div className="pt-1">
                <Language jp={`ブックマーク`} en={`My Bookmarks`} />
            </div>
        </h1>
        <PageSubTitle 
            jp={"ブックマークしたNASAの記事一覧です 📗"} 
            en={"NASA articles you have bookmarked so far 📗"}/>
        <div className="outer">
        {(data.length === 1 && data[0].imageId === "randomId") &&
            <>
                <div className="mb-16">
                    <Language 
                    jp={<h2 className="h3 text-indigo-500">アイテムがありません。</h2>} 
                    en={<h2 className="h3">No Bookmark items</h2>}/>
                </div>            
            </>}
        {data.map((item, index) => {
                        if(data.length === index + 1){
                            return <BookmarkItem 
                                item={item}  
                                key={item._id}
                                last={true} />
                        } else {
                            return <BookmarkItem 
                                item={item}  
                                key={item._id}
                                last={false} />
                            }
                            })}
    </div> 
        <DataSourceList imageOnly={false}/>
        {loadingGeneral && <div className="text-center my-10"><LoaderSmall /></div>}
    </div>
    
    </>
  )
}

export default MyBookmarksComponent