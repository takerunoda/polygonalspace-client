import React, { Dispatch, RefObject, SetStateAction } from 'react'
import Link from 'next/link';
import LikeTwo from './LikeTwo';
import DataSource from './DataSource';
import LoaderSmall from './LoaderSmall';
import BookmarkButton from './BookmarkButton';
import { BookmarkItemInterface } from '../Interfaces';
import { useUserContext } from '../context/UserContext';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { trimTitle } from '../utils/trimTitle';
import { updateBookmarkNoAuth } from '../utils/updateBookmarkNoAuth';
import { handleConfirmBookmark } from '../utils/handleConfirmBookmark';
import { handleTrimDescriptionShare } from '../utils/handleTrimDescriptionShare';
import { RiArticleLine } from 'react-icons/ri';
import { DateInList } from './DateInLIst';

interface ComponentProps {
    item: BookmarkItemInterface
    items: BookmarkItemInterface[]
    setItems: Dispatch<SetStateAction<BookmarkItemInterface[]>>
    observerSharedRef: RefObject<HTMLDivElement>
    handlePosition: () => void
    last: boolean
}

const SharedBookmarkItem = ({item, items, setItems, observerSharedRef, handlePosition, last} : ComponentProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
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
    const searchContext = useSearchContext()
        if ( !searchContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const {isLoggedin, userBookmarkIds} = userContext
        
    const {timeoutId, setTimeoutId, loadingClickBookmark} = pageContext
    
    const {myBookmarkAddItem, setMyBookmarkAddItem} = bookmarkContext

    const {showMessageModal, setShowMessageModal, message, setMessage, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, } = modalContext  


    const handleConfirm = () => {
        if(loadingClickBookmark) {
            console.log("clicked while loading");
            return
        }
        handleConfirmBookmark({item, isLoggedin, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds})        
    }

    return (<div className="itemOuter" key={item._id}>
                    <h2 className="itemTitleA">
                        <div className="itemTitleB">
                            <div className="itemTitleIcon">
                                <RiArticleLine />
                            </div>
                            <p className="">
                            {item.imageTitle && trimTitle(item.imageTitle)}
                            </p>
                        </div>
                    </h2>
                    <DateInList item={item} />
                    <h2 className="itemImage">
                        <img src={(item.imageUrl).includes("http:") ? (item.imageUrl).replace("http:", "https:") : (item.imageUrl)} alt={item.imageTitle}/>
                    </h2>
                    <div className="itemLike">
                        <LikeTwo 
                            post={item} 
                            updateNoAuth={updateBookmarkNoAuth} 
                            postData={items} 
                            setPostData={setItems}/>
                    </div>    
                    <div className="itemDescription">
                        {handleTrimDescriptionShare(item)}
                    </div>
                    <DataSource platform={item.platform} imageOnly={false}/>
                        <div className="itemReadMore">
                        <div>
                            <Link href={`/bookmark-details/${item._id}`}>
                                <button className="buttonGreenMiddleSecond" onClick={handlePosition}>
                                    Read More
                                </button>
                            </Link>
                        </div>
                        {!myBookmarkAddItem && <div className="">
                            <BookmarkButton item={item} handleConfirm={handleConfirm}/>
                        </div>}
                        {myBookmarkAddItem && myBookmarkAddItem.imageId !== item.imageId && <div className="">
                            <BookmarkButton item={item} handleConfirm={handleConfirm}/>
                        </div>}
                        {myBookmarkAddItem && myBookmarkAddItem.imageId === item.imageId &&!loadingClickBookmark && <div className="">
                            <BookmarkButton item={item} handleConfirm={handleConfirm}/>
                        </div>}
                        {myBookmarkAddItem && myBookmarkAddItem.imageId === item.imageId &&loadingClickBookmark && 
                        <div className="p-4">
                            <LoaderSmall />
                        </div>}
                    </div>
                        {last && <div className="" ref={observerSharedRef}></div>}
                </div>
                )
}

export default SharedBookmarkItem
