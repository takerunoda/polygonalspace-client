import React from 'react'
import { BookmarkItemInterface, PostInterface } from '../Interfaces';

interface ComponentProps {
    item: BookmarkItemInterface | PostInterface
}

const ImageComponent = ({item} : ComponentProps) => {
    return (<div className="overflow-y-scroll ">
                    <img className="w-full text-center mx-auto overflow-y-scroll" src={(item.imageUrl).includes("http:") ? (item.imageUrl).replace("http:", "https:") : (item.imageUrl)} alt={item.imageTitle}/>
            </div>
    )
}

export default ImageComponent
