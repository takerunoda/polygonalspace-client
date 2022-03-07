import React, { RefObject } from 'react'
import Link from 'next/link';
import { useUserContext } from '../context/UserContext';
import { usePageContext } from '../context/PageContext';
import { useFunctionsContext } from '../context/FunctionsContext';
import { BookmarkItemInterface } from '../Interfaces';
import LikeTwo from './LikeTwo';
import LoaderSmall from './LoaderSmall';
import LastElement from './LastElement';
import { DateInList } from './DateInLIst';
import BookmarkButton from './BookmarkButton';
import { trimTitle } from '../utils/trimTitle';
import { handleTrimDescriptionShare } from '../utils/handleTrimDescriptionShare';
import { RiArticleLine } from 'react-icons/ri';

interface ComponentProps {
    item: BookmarkItemInterface
    elementRef: RefObject<HTMLDivElement>
    handlePosition: () => void
    last: boolean
    currentPage:  number
    hasMore: boolean
    isVisible: boolean  
    isVisibleInitial: boolean
}

const SharedBookmarkItem = ({
        item, 
        elementRef, 
        handlePosition, 
        last, 
        currentPage, 
        hasMore, 
        isVisible, 
        isVisibleInitial} : ComponentProps) => {
    const { myBookmarkAddItem} = useUserContext()
    const {loadingClickBookmark} = usePageContext()   
    const { handleConfirmBookmarkFn } = useFunctionsContext()
    const handleConfirm = () => {
        if(loadingClickBookmark) {
            // console.log("clicked while loading");
            return
        }
        handleConfirmBookmarkFn({item})        
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
                            />
                    </div>    
                    <div className="itemDescription">
                        {handleTrimDescriptionShare(item)}
                    </div>
                    {/* <DataSource platform={item.platform} imageOnly={false}/> */}
                        <div className="itemReadMore">
                        <div>
                            <Link href={`/shared-item/${item._id}`} passHref>
                                <button className="buttonGreenMiddleSecond" onClick={handlePosition}>
                                    Read More
                                </button>
                            </Link>
                        </div>
                        {!myBookmarkAddItem && <div className="">
                            <BookmarkButton handleConfirm={handleConfirm}/>
                        </div>}
                        {myBookmarkAddItem && myBookmarkAddItem.imageId !== item.imageId && <div className="">
                            <BookmarkButton handleConfirm={handleConfirm}/>
                        </div>}
                        {myBookmarkAddItem && myBookmarkAddItem.imageId === item.imageId &&!loadingClickBookmark && <div className="">
                            <BookmarkButton handleConfirm={handleConfirm}/>
                        </div>}
                        {myBookmarkAddItem && myBookmarkAddItem.imageId === item.imageId &&loadingClickBookmark && 
                        <div className="p-4">
                            <LoaderSmall />
                        </div>}
                    </div>
                {last && <LastElement 
                            elementRef={elementRef} 
                            currentPage={currentPage}
                            hasMore={hasMore}
                            isVisible={isVisible}
                            isVisibleInitial={isVisibleInitial} />}

                </div>)}

export default SharedBookmarkItem
