import { Dispatch, SetStateAction } from 'react';
import { ImageInterface, BookmarkItemInterface } from '../Interfaces';

interface FunctionProps {
    id: string, 
    confirm: boolean, 
  userBookmark: BookmarkItemInterface[];
  setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
    image: ImageInterface | null | undefined
    setImage: Dispatch<SetStateAction<ImageInterface | null | undefined>>
}


export const toggleConfirmBookmarkDetails = async ({id, confirm, userBookmark, setUserBookmark, image, setImage} : FunctionProps) => {
        const userBookmarkData = userBookmark && userBookmark.map(
            x => x.imageId === id ? 
            {...x, confirm:!confirm}
            : x
                )    
        setUserBookmark(userBookmarkData)
         
        const imageStateData = image && {...image, confirm:!confirm}
        setImage(imageStateData)
    }