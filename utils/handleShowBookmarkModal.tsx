import { Dispatch, SetStateAction } from 'react'
import { ImageInterface, BookmarkItemInterface } from '../Interfaces'

interface FunctionProps {
    item: BookmarkItemInterface, 
    setShowBookmarkModal: Dispatch<SetStateAction<boolean>>
    setImage: Dispatch<SetStateAction<ImageInterface | null | undefined>>
}

export const handleShowBookmarkModal = ({item, setShowBookmarkModal, setImage} : FunctionProps) => {
            setShowBookmarkModal(true)
            setImage({
                _id: item._id, 
                imageId: item.imageId,
                imageTitle: item.imageTitle ?? "",
                imageUrl: item.imageUrl, 
                imageDescription: item.imageDescription ?? "",
                like: 0,
                category: item.category,
                categoryValue: item.categoryValue,
                originallyCreatedAt: item.originallyCreatedAt,
                platform:item.platform,
                confirm: false
            })
        }