import React, { MutableRefObject } from 'react'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import { useFunctionsContext } from '../context/FunctionsContext'
import { nasaStateDataInterface } from '../Interfaces'
import Language from './Language'
import LastElement from './LastElement'
import LoaderSmall from './LoaderSmall'
import BookmarkButton from './BookmarkButton'
import { trimTitle } from '../utils/trimTitle'
import { handleMediaType } from '../utils/handleMediaType'
import { handleSearchOnclick } from '../utils/handleSearchOnclick'

interface ComponentProps {
    item: nasaStateDataInterface
    elementRef: MutableRefObject<any>
    last: boolean
    currentPage:  number
    hasMore: boolean
    isVisible: boolean
}

const ResultItem = ({   item, 
                        elementRef, 
                        last, 
                        currentPage, 
                        hasMore, 
                        isVisible} : ComponentProps) => {
    const {myBookmarkAddItem, } = useUserContext()
    const {setImage, loadingClickBookmark} = usePageContext()
    const {setShowDetailsModal} = useModalContext()
    const { handleConfirmBookmarkFn } = useFunctionsContext()
    const handleConfirm = () => {
        if(loadingClickBookmark) {
            // console.log("clicked while loading");
            return
        }
        handleConfirmBookmarkFn({item})
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
                        <BookmarkButton handleConfirm={handleConfirm}/>
                    </div>}
                    {myBookmarkAddItem && myBookmarkAddItem.imageId !== item.key && <div className="">
                        <BookmarkButton handleConfirm={handleConfirm}/>
                    </div>}
                    {myBookmarkAddItem && myBookmarkAddItem.imageId === item.key &&!loadingClickBookmark && <div className="">
                        <BookmarkButton handleConfirm={handleConfirm}/>
                    </div>}
                    {myBookmarkAddItem && myBookmarkAddItem.imageId === item.key &&loadingClickBookmark && 
                    <div className="my-4 mr-6">
                        <LoaderSmall />
                    </div>}
                </div>
                        {last && <LastElement 
                                    elementRef={elementRef} 
                                    currentPage={currentPage}
                                    hasMore={hasMore}
                                    isVisible={isVisible}
                                    isVisibleInitial={false} />}
                </li>
                )
            }

export default ResultItem
