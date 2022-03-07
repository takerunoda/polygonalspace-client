import React from 'react'
import Link from 'next/link'
import { useFunctionsContext } from '../context/FunctionsContext'
import { useMyBookmarkContext } from '../pages/mybookmarks'
import { BookmarkItemInterface } from '../Interfaces'
import LikeTwo from './LikeTwo'
import DataSource from './DataSource'
import LastElement from './LastElement'
import { handleScrollPosition } from '../utils/handleScrollPosition'
import { trimTitle } from '../utils/trimTitle'
import { handleHttps } from '../utils/handleHttps'
import { handleTrimDescription } from '../utils/handleTrimDescription'
import { BsBookmarksFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'

interface ComponentProps {
    item: BookmarkItemInterface
    last: boolean
}

export const BookmarkItem = ({ item, last } : ComponentProps) => {
    const myBookmarkContext = useMyBookmarkContext()
    const { handleOnclickDeleteBookmarkFn }  = useFunctionsContext()
    const { elementRef, currentPageGeneral, hasMoreGeneral, isVisibleGeneral, isVisibleGeneralInitial } = myBookmarkContext
    const handlePosition = () => handleScrollPosition({path: "myBookmarkScroll"})

    return (
            <div className="itemOuter" key={item._id}>
                        <h2 className="itemTitleA">
                            <div className="itemTitleB">
                                <div className="text-blue-500 text-3xl mr-2">
                                    <BsBookmarksFill />
                                </div>
                                <p>
                                    {trimTitle(item.imageTitle ?? "")}
                                </p>
                            </div>
                        </h2>
                        <h2 className="itemImage">
                            {item.mediaType === "image" && 
                                <img src={handleHttps(item.imageUrl)} alt={item.imageTitle} className="w-full"/> }
                            {item.mediaType === "video" && item.imageUrl.endsWith("jpg") &&
                                <img src={handleHttps(item.imageUrl)} alt={item.imageTitle} className="w-full"/> }
                            {item.mediaType === "video" && !item.imageUrl.endsWith("jpg") && item.imageUrl.endsWith("mp4") &&
                                <video className="w-full" controls muted>
                                    <source src={handleHttps(item.imageUrl)} type="video/mp4" />
                                </video> }
                            {item.mediaType === "video" && !item.imageUrl.endsWith("jpg") && item.imageUrl.endsWith("mov") &&
                                <video className="w-full" controls muted>
                                    <source src={handleHttps(item.imageUrl)} type="video/mp4" />
                                </video> }
                            {item.mediaType === "audio" && 
                                <audio className="w-full" controls muted>
                                    <source src={handleHttps(item.imageUrl)} type="audio/mpeg" />
                                </audio> }
                        </h2>
                        <div className="itemLike">
                            <LikeTwo
                                post={item} 
                                />
                        </div>
                        <h2 className="itemDescription">
                            {handleTrimDescription(item)}
                        </h2>
                        {/* <DataSource  platform={item.platform} imageOnly={false}/> */}
                        <div className="itemReadMore">
                                <Link href={`/shared-item/${item._id}`} passHref>
                                    <button className="buttonGreenMiddleSecond" 
                                    onClick={handlePosition} >
                                            Read More
                                    </button>
                                </Link>
                            <div className="">
                                <button className="itemTrash" onClick={() => handleOnclickDeleteBookmarkFn({item})}>
                                <FaTrash />
                                </button>
                            </div>
                        </div>
                        {last && <LastElement 
                                    elementRef={elementRef} 
                                    currentPage={currentPageGeneral}
                                    hasMore={hasMoreGeneral}
                                    isVisible={isVisibleGeneral}
                                    isVisibleInitial={isVisibleGeneralInitial} />}
                    </div>)}