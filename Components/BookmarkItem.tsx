import React, { RefObject } from 'react'
import Link from 'next/link'
import LikeTwo from './LikeTwo'
import DataSource from './DataSource'
import { BookmarkItemInterface } from '../Interfaces'
import { useModalContext } from '../context/ModalContext'
import { useBookmarkContext } from '../context/BookmarkContext'
import { trimTitle } from '../utils/trimTitle'
import { handleHttps } from '../utils/handleHttps'
import { updateBookmarkNoAuth } from '../utils/updateBookmarkNoAuth'
import { handleTrimDescription } from '../utils/handleTrimDescription'
import { handleOnclickDeleteBookmark } from '../utils/handleOnclickDeleteBookmark'
import { FaTrash } from 'react-icons/fa'
import { BsBookmarksFill } from 'react-icons/bs'

interface ComponentProps {
    item: BookmarkItemInterface
    observerMyBookmarkRef: RefObject<HTMLDivElement>
    handlePosition: () => void
    last: boolean}

export const BookmarkItem = ({item, observerMyBookmarkRef, handlePosition, last} : ComponentProps)=> {

    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const { userBookmark, 
            setUserBookmark,
            myBookmarkDeleteItem, setMyBookmarkDeleteItem            
        }  = bookmarkContext
    const { setMyBookmarkModalToggleConfirm } = modalContext

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
                                updateNoAuth={updateBookmarkNoAuth} 
                                postData={userBookmark} 
                                setPostData={setUserBookmark}/>
                        </div>
                        <h2 className="itemDescription">
                            {handleTrimDescription(item)}
                        </h2>
                        <DataSource  platform={item.platform} imageOnly={false}/>
                        <div className="itemReadMore">
                                <Link href={`/bookmark-details/${item._id}`}>
                                    <button className="buttonGreenMiddleSecond" 
                                    onClick={handlePosition} >
                                            Read More
                                    </button>
                                </Link>
                            <div className="">
                                <button className="itemTrash" onClick={() => handleOnclickDeleteBookmark({item, setMyBookmarkDeleteItem, setMyBookmarkModalToggleConfirm})}>
                                <FaTrash />
                                </button>
                            </div>
                        </div>
                        {last  && <div className="" ref={observerMyBookmarkRef}></div>}
                    </div>)}
