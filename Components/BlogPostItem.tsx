import React, {  RefObject } from 'react'
import Link from 'next/link';
import LastElement from './LastElement';
import { DateInLIstBlog } from './DateInLIstBlog';
import { RiArticleLine } from 'react-icons/ri';

interface ComponentProps {
    item: any
    elementRef: RefObject<HTMLDivElement> 
    handlePosition: () => void
    last: boolean
    currentPage:  number
    hasMore: boolean
    isVisible: boolean  
    isVisibleInitial: boolean
}

const BlogPostItem = ({
        item, 
        elementRef, 
        handlePosition, 
        last, 
        currentPage, 
        hasMore, 
        isVisible, 
        isVisibleInitial} : ComponentProps) => {
            
    return (
            <div className="itemOuter" key={item.id}>
                <h2 className="itemTitleA">
                    <div className="itemTitleB">
                        <div className="itemTitleIcon">
                            <RiArticleLine />
                        </div>
                        <p>
                            {item.title}
                        </p>
                    </div>
                </h2>
                <DateInLIstBlog item={item} />
                <h2 className="itemImage">
                    {item.feature_image ? <img src={(item.feature_image).includes("http:") ? (item.feature_image).replace("http:", "https:") : (item.feature_image)} alt={item.title}/> :
                    <img src="/no_image_yoko.jpg" alt="no image" />
                    }
                </h2>
                <h2 className="overflow-x-scroll">
                        {`${item.excerpt}..`}
                </h2>
                <div className="itemReadMore">
                    <Link href={`/blog/${item.slug}`} passHref>
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

export default BlogPostItem