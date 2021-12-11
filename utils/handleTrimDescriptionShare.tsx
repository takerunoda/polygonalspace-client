import { BookmarkItemInterface } from '../Interfaces'
import parse from 'html-react-parser';
import { trimArticle } from './trimArticle'

export const handleTrimDescriptionShare = (item: BookmarkItemInterface) => {
            const imageTitle = item.imageTitle
            const imageDescription = item.imageDescription
            if(imageTitle === imageDescription)return
             const trimmed = parse(trimArticle(item.imageDescription ?? ""))
             return trimmed
        }