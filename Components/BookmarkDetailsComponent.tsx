import React from 'react'
import { useRouter } from 'next/router';
import { usePageContext } from '../context/PageContext';
import { usePostContext } from '../context/PostContext';
import { useUserContext } from '../context/UserContext';
import { useSharedDetailsContext } from '../pages/shared-item/[_id]';
import SNS from './SNS';
import Like from './Like';
import DataSource from './DataSource';
import Breadcrumb from './Breadcrumb';
import TrashBookmark from './TrashBookmark';
import DateInDetails from './DateInDetails';
import ImageComponent from './ImageComponent';
import OriginallyCreated from './OriginallyCreated';
import BookmarkButtonTwo from './BookmarkButtonTwo';
import ConfirmAddBookmarkModal from './ConfirmAddBookmarkModal';
import ConfirmDeleteBookmarkModal from './ConfirmDeleteBookmarkModal';
import { trimTitleDetails } from '../utils/trimTitleDetails';
import { updateBookmarkNoAuth } from '../utils/updateBookmarkNoAuth';
import parse from 'html-react-parser';
import { handleCategoryBookmark } from '../utils/handleCategoryBookmark';
import { useFunctionsContext } from '../context/FunctionsContext';
import { trimArticleVeryShort } from '../utils/trimArticleVeryShort';

const BookmarkDetailsComponent = () => {
    const { handleConfirmBookmarkTwoFn } = useFunctionsContext()
    const { userBookmarkIds, 
            userState: {isLoggedin,} } = useUserContext()
            const { setCategoryBookmarks } = usePostContext() 
            const {spMenuState, loadingClickBookmark} = usePageContext()
    const sharedDetailsContext = useSharedDetailsContext()
    const {postData, bookmarkPost, setBookmarkPost} = sharedDetailsContext
    const router = useRouter()
    const breadCrumbData = `${postData && postData.imageTitle && parse((postData.imageTitle).toString())}`
    const breadcrumb_1 = { name: "共有ブックマーク", name_EN: "Shared", url: `/shared`}
    const breadcrumb_2 = { 
            name: trimArticleVeryShort(breadCrumbData),
            name_EN: trimArticleVeryShort(breadCrumbData), 
            url: `/shared-item/${postData && postData._id && postData._id}`}
    const handleConfirm = async () => {
        if(loadingClickBookmark) {
            // console.log("clicked while loading");
            return
        }
        handleConfirmBookmarkTwoFn({ item: bookmarkPost})
    }

  return (
    <>
        <ConfirmDeleteBookmarkModal  />
        <ConfirmAddBookmarkModal />
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="detailsOuter">
            {postData && 
               <div className="detailsInner" key={postData._id}>
                   <div className={`${spMenuState && "pt-36"}`}></div>
                    <h1 className="detailsTitle">
                        {postData.imageTitle && trimTitleDetails(postData.imageTitle)}
                    </h1>
                    <DateInDetails 
                        createdAt={postData.createdAt} 
                        updatedAt={postData.updatedAt} />
                    <h2>
                        <ImageComponent item={postData}/>
                    </h2>
                    <div className="detailsInnerTwo">
                        <div className="flex mb-5 md:mb-8">
                            <div className="detailsLike">
                                <Like 
                                updateNoAuth={updateBookmarkNoAuth}
                                post={bookmarkPost} 
                                setPost={setBookmarkPost}/>
                            </div>
                            <div>
                            </div>
                                <ul className="w-40 flex justify-between">
                                        {!isLoggedin && 
                                        <li className="ml-6">
                                            <BookmarkButtonTwo 
                                                handleConfirm={handleConfirm} />
                                        </li>}
                                        {isLoggedin && !userBookmarkIds.includes(postData.imageId) && 
                                        <li className="ml-6">
                                            <BookmarkButtonTwo handleConfirm={handleConfirm} />
                                        </li>}
                                        {isLoggedin && userBookmarkIds.includes(postData.imageId) && 
                                        <li className="ml-6 pt-4">
                                            <TrashBookmark item={postData}  />
                                        </li>}
                                </ul>
                        </div>
                        <div className="detailsCategory">
                            {handleCategoryBookmark({
                                category: postData.category, 
                                title: postData.imageTitle ?? "", 
                                description: postData.imageDescription ?? "", 
                                router,
                                setCategoryBookmarks,
                                })}
                        </div>
                        <h2 className="mb-5">
                            <OriginallyCreated originallyCreated={postData.originallyCreatedAt}  />
                        </h2>
                        <div className="detailsDescription">
                            {parse(`<div>${postData.imageDescription}</div>`)}
                            <DataSource platform={postData.platform} imageOnly={false}/>
                        </div>
                    </div>
                        {bookmarkPost && <SNS title={bookmarkPost.imageTitle ?? ""} href={window.location.href}/>}
                </div>}
        </div>
    </>
  )
}

export default BookmarkDetailsComponent