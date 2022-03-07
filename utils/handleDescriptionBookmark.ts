import { ImageInterface } from "../Interfaces"
import { replaceSpecialCharacters } from "./replaceSpecialCharacters"


export const handleDescriptionBookmark = (item: ImageInterface) => {
            const imageTitle = item.imageTitle
            const imageDescription = item.imageDescription
            if(imageTitle === imageDescription)return
            const htmlImageDescription = replaceSpecialCharacters(imageDescription)
            return htmlImageDescription
        }