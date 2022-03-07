import React from 'react'

interface ComponentProps {
    item: any
}

const ImageBlog = ({item} : ComponentProps) => {
    return (<div className="overflow-y-scroll ">
                    {item.feature_image ? 
                    <img className="w-full text-center mx-auto overflow-y-scroll" src={(item.feature_image).includes("http:") ? (item.feature_image).replace("http:", "https:") : (item.feature_image)} alt={item.title}/> : 
                    <img className="w-full text-center mx-auto overflow-y-scroll"  src="/no_image_yoko.jpg" alt="no image" />}
            </div>
    )
}

export default ImageBlog
