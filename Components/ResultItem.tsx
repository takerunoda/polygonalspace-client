import React from 'react'
import Language from './Language'
import LoaderSmall from './LoaderSmall'
import BookmarkButton from './BookmarkButton'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import { useBookmarkContext } from '../context/BookmarkContext'
import { nasaStateDataInterface } from '../Interfaces'
import { trimTitle } from '../utils/trimTitle'
import { handleMediaType } from '../utils/handleMediaType'
import { handleSearchOnclick } from '../utils/handleSearchOnclick'
import { handleConfirmBookmark } from '../utils/handleConfirmBookmark'

interface ComponentProps {
    item: nasaStateDataInterface
    observerRef: React.RefObject<HTMLDivElement>
    last: boolean
}

const ResultItem = ({item, observerRef, last} : ComponentProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const {isLoggedin, userBookmarkIds} = userContext
    const {setImage, timeoutId, setTimeoutId, loadingClickBookmark} = pageContext
    const {myBookmarkAddItem, setMyBookmarkAddItem,} = bookmarkContext
    const {showMessageModal, setShowMessageModal, message, setMessage, showDetailsModal, setShowDetailsModal, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, } = modalContext  

    const handleConfirm = () => {
        if(loadingClickBookmark) {
            console.log("clicked while loading");
            return
        }
        handleConfirmBookmark({item, isLoggedin, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds})
    }

    return (<li className="itemOuter" key={item.key}>
                <h2 className="itemTitleA">
                    {item.title && trimTitle(item.title)}
                </h2>
                <div className="itemImage w-full">
                    {item.mediaType === "image" && <img src={handleMediaType(item)} alt={item.title} className="w-full"/> }
                    {item.mediaType === "video" && handleMediaType(item).endsWith("jpg") &&
                    <img src={handleMediaType(item)} alt={item.title} className="w-full"/> }
                    {item.mediaType === "video" && !handleMediaType(item).endsWith("jpg") && handleMediaType(item).endsWith("mp4") &&
                    <video className="w-full" controls muted>
                        <source src={handleMediaType(item)} type="video/mp4" />
                    </video> }
                    {item.mediaType === "video" && !handleMediaType(item).endsWith("jpg") && handleMediaType(item).endsWith("mov") &&
                    <video className="w-full" controls muted>
                        <source src={handleMediaType(item)} type="video/mp4" />
                    </video> }
                    {item.mediaType === "audio" && 
                    <audio className="w-full" controls muted>
                        <source src={handleMediaType(item)} type="audio/mpeg" />
                    </audio> }
                </div>
                <div className="itemReadMore">
                    <div className="">
                        <button className="buttonGreenMiddleSecond" onClick={() => handleSearchOnclick({item, setShowDetailsModal, setImage})}>
                            <Language jp={"拡大する"} en={"Open Modal"}/>
                        </button>
                    </div>
                    {!myBookmarkAddItem && <div className="">
                        <BookmarkButton item={item} handleConfirm={handleConfirm}/>
                    </div>}
                    {myBookmarkAddItem && myBookmarkAddItem.imageId !== item.key && <div className="">
                        <BookmarkButton item={item} handleConfirm={handleConfirm}/>
                    </div>}
                    {myBookmarkAddItem && myBookmarkAddItem.imageId === item.key &&!loadingClickBookmark && <div className="">
                        <BookmarkButton item={item} handleConfirm={handleConfirm}/>
                    </div>}
                    {myBookmarkAddItem && myBookmarkAddItem.imageId === item.key &&loadingClickBookmark && 
                    <div className="my-4 mr-6">
                        <LoaderSmall />
                    </div>}
                </div>
                {last && <div className="" ref={observerRef}></div>}
                </li>
                )
            }

export default ResultItem
