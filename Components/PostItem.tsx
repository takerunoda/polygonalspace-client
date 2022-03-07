import React, { RefObject } from 'react'
import Link from 'next/link';
import parse from 'html-react-parser';
import { PostInterface } from '../Interfaces';
import LikeTwo from './LikeTwo';
import Language from './Language';
import LastElement from './LastElement';
import { DateInList } from './DateInLIst';
import { trimArticleShort } from '../utils/trimArticleShort';
import { handleUserWhoPosts } from '../utils/handleUserWhoPosts';
import { RiArticleLine } from 'react-icons/ri';

interface ComponentProps {
    item: PostInterface
    elementRef: RefObject<HTMLDivElement> 
    handlePosition: () => void
    last: boolean
    currentPage:  number
    hasMore: boolean
    isVisible: boolean  
    isVisibleInitial: boolean
}

const PostItem = ({
        item, 
        elementRef, 
        handlePosition, 
        last, 
        currentPage, 
        hasMore, 
        isVisible, 
        isVisibleInitial} : ComponentProps) => {
    return (
            <div className="itemOuter" key={item._id}>
                <h2 className="itemTitleA">
                    <div className="itemTitleB">
                        <div className="itemTitleIcon">
                            <RiArticleLine />
                        </div>
                        <p>
                            {item.articleTitle}
                        </p>
                    </div>
                </h2>
                <DateInList item={item} />
                <h2 className="itemImage">
                    <img src={(item.imageUrl).includes("http:") ? (item.imageUrl).replace("http:", "https:") : (item.imageUrl)} alt={item.imageTitle}/>
                </h2>
                <div className="itemLike">
                    <LikeTwo 
                        post={item} />
                </div>                        
                <div className="my-4">
                    <span className="text-green-500"><Language jp={"投稿者"} en={"Written by"}/>: </span><Link href={`/user-memo/${item.authorId}`}><a className="text-blue-500">{item.authorId && handleUserWhoPosts(item.authorId)}</a>
                    </Link>
                </div>
                <h2 className="overflow-x-scroll">
                        {item.article && parse(trimArticleShort((item.article).toString()))}
                </h2>
                <div className="itemReadMore">
                    <Link href={`/memo-item/${item.slug}`} passHref>
                        <button className="buttonGreenMiddleSecond"
                                onClick={handlePosition}>
                                <div>
                                    Read More
                                </div>
                        </button>
                    </Link>
                </div>
                {last && <LastElement 
                            elementRef={elementRef} 
                            currentPage={currentPage}
                            hasMore={hasMore}
                            isVisible={isVisible}
                            isVisibleInitial={isVisibleInitial} />}
                </div>)}

export default PostItem