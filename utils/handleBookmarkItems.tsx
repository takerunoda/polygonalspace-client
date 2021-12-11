import React from 'react'
import { BookmarkItemInterface } from '../Interfaces'
import Language from '../Components/Language'
import { BookmarkItem } from '../Components/BookmarkItem'
import { handleScrollPosition } from './handleScrollPosition'

interface FunctionProps {
    userBookmark: BookmarkItemInterface[]
    observerMyBookmarkRef: React.RefObject<HTMLDivElement>
}
export const handleBookmarkItems = ({userBookmark, observerMyBookmarkRef} : FunctionProps) => {    
    if (userBookmark.length === 1 && userBookmark[0].imageId === "randomId")  
    {return <div className="mb-16">
        <Language 
            jp={<h2 className="h3 text-indigo-500">アイテムがありません。</h2>} 
            en={<h2 className="h3">No Bookmark items</h2>}/>
    </div>
    } else {
        return (userBookmark.map((item, index) => {
                    if(userBookmark.length === index + 1){
                        return <BookmarkItem 
                                    item={item}  
                                    observerMyBookmarkRef={observerMyBookmarkRef} 
                                    key={item._id}
                                    handlePosition={() => handleScrollPosition({path: "myBookmarkScroll"})} 
                                    last={true} />
                    } else {
                        return <BookmarkItem 
                                    item={item}  
                                    observerMyBookmarkRef={observerMyBookmarkRef} 
                                    key={item._id}    
                                    handlePosition={() => handleScrollPosition({path: "myBookmarkScroll"})}
                                    last={false} />
                                }
                            }))
                        }
                    }