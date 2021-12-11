import React, { Dispatch, RefObject, SetStateAction } from 'react'
import Link from 'next/link';
import LikeTwo from './LikeTwo';
import DataSource from './DataSource';
import { BookmarkItemInterface } from '../Interfaces';
import { useUserContext } from '../context/UserContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { trimTitle } from '../utils/trimTitle';
import { handlePublic } from '../utils/handlePublic';
import { updateBookmarkNoAuth } from '../utils/updateBookmarkNoAuth';
import { handleTrimDescriptionShare } from '../utils/handleTrimDescriptionShare';
import { IoRocketSharp } from 'react-icons/io5';
import { DateInList } from './DateInLIst';

interface ComponentProps {
    item: BookmarkItemInterface
    items: BookmarkItemInterface[]
    setItems: Dispatch<SetStateAction<BookmarkItemInterface[]>>
    observerSharedAdminRef: RefObject<HTMLDivElement>
    handlePosition: () => void
    last: boolean
}

const SharedBookmarkItemAdmin = ({item, items, setItems, handlePosition, observerSharedAdminRef, last} : ComponentProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
    }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
    }
    const {accessToken} = userContext
    const {allBookmarks, setAllBookmarks} = bookmarkContext

    return (<div className="w-72 mb-16 xs:mr-7" key={item._id}>
                {item._id}
                    <h2 className="text-xl font-bold mb-4 leading-normal h-20 relative text-center">
                    <div className="flex justify-center">
                        <div className="text-blue-500 text-3xl mr-2">
                            <IoRocketSharp />
                        </div>
                        <p className="">
                        {item.imageTitle && trimTitle(item.imageTitle)}
                        </p>
                    </div>
                    </h2>
                    <DateInList item={item} />

                        <h2 className="mb-5">
                            <img src={(item.imageUrl).includes("http:") ? (item.imageUrl).replace("http:", "https:") : (item.imageUrl)} alt={item.imageTitle}/>
                        </h2>
                    <div className="mb-3">
                        <LikeTwo 
                            post={item} 
                            updateNoAuth={updateBookmarkNoAuth} 
                            postData={items} 
                            setPostData={setItems}/>
                    </div>    
                            <div className="mb-5 overflow-x-scroll">
                                {handleTrimDescriptionShare(item)}
                                </div>
                        <DataSource platform={item.platform} imageOnly={false}/>

                            <div className="mt-4 flex justify-between">
                                <div className="my-4">
                                    <Link href={`/bookmark-details/${item._id}`}>
                                        <button className="buttonGreenMiddleSecond" 
                                        onClick={handlePosition}>
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                                <div className="my-4">
                                        <button className={item.public ? "buttonRedMiddle" : "buttonIndigoMiddle"} 
                                        onClick={() => handlePublic({item: item, allBookmarks, setAllBookmarks, accessToken})}>
                                            {item.public ? "Public" : "Private"}
                                        </button>
                                </div>
                            </div>
                        {last && <div className="" ref={observerSharedAdminRef}></div>}
                </div>)
                }

export default SharedBookmarkItemAdmin
