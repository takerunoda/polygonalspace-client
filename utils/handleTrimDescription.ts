import { BookmarkItemInterface } from '../Interfaces'
import parse from 'html-react-parser';
import { trimArticle } from './trimArticle'

export const handleTrimDescription = (item: BookmarkItemInterface) => {
          const imageTitle = item.imageTitle
          const imageDescription = item.imageDescription
          if(imageTitle === imageDescription) return
          const trimmed = item.imageDescription ? trimArticle(item.imageDescription) : item.imageDescription
          const trimmedParsed = trimmed ? parse(trimmed) : ""
          return trimmedParsed
        }
