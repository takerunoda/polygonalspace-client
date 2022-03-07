import { Dispatch, SetStateAction } from "react"
import { ImageInterface, nasaStateDataInterface } from "../Interfaces"
import { handleMediaType } from "./handleMediaType"
import { categoryLowerCase } from "./categoryLowerCase"

interface FunctionProps {
    item: nasaStateDataInterface
    setShowDetailsModal: Dispatch<SetStateAction<boolean>>
    setImage: Dispatch<SetStateAction<ImageInterface | null | undefined>>
}

export const handleSearchOnclick = ({item, setShowDetailsModal, setImage} : FunctionProps) => {
    setShowDetailsModal(true)
    setImage({
        imageId: item.key, 
        imageTitle: item.title,
        imageUrl: handleMediaType(item), 
        imageDescription: item.description ? item.description.replace(/<[^>]+>/g, '') : "",
        like: 0,
        mediaType: item.mediaType,
        category: item.keywords,
        categoryValue: categoryLowerCase(item.keywords),
        originallyCreatedAt: item.dateCreated,
        platform:"NASA",
        confirm: false
    })
}
