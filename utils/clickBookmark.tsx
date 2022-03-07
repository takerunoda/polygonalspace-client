import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router'
import { ImageInterface, BookmarkItemInterface } from '../Interfaces'
import { getAccessToken } from './tokens'
import { updateBookmark } from './updateBookmark'
import Language from '../Components/Language'

interface FunctionProps {
        setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
        userBookmarkIds: string[]
        setUserBookmarkIds: Dispatch<SetStateAction<string[]>>
        router: NextRouter
        image: ImageInterface | BookmarkItemInterface | null
        setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
        setLoadingClickBookmark: Dispatch<SetStateAction<boolean>>
        logoutFunction: () => Promise<void>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
}

export const clickBookmark = async (
    {setUserBookmark, router, image, setAddBookmarkModalToggleConfirm, userBookmarkIds, setUserBookmarkIds, setLoadingClickBookmark, logoutFunction, handleMessageModal
    } : FunctionProps) => {
    setAddBookmarkModalToggleConfirm(false)   
    //display a message modal when the item is already in bookmark
    if(!image)return
    //when a user is logged-in, and the image has not been added to bookmark array, the clicked image will be added to the bookmark array (userBookmark).
    // image state is the one displayed, and will be added as an object to the bookmark when the button is clicked.
    //I guess Bookmark should have user Id property, right?
    setAddBookmarkModalToggleConfirm(false)
    try {
    setLoadingClickBookmark(true)        
    //now that a whole new bookmark was created, the userBookmark state needs to be updated.    
        const U = async () => {
        const response = await getAccessToken()
        
        if(!response.ok || response.ok !== true){
            if(response.includes("error") || response.includes("Error")){
                await logoutFunction()
                router.push("/login")
                throw new Error("authentication failed")
            }
        }

        const newImageId = image.imageId
        const updateResponse = await updateBookmark({response, imageId: newImageId, mediaType: image.mediaType ?? "image", imageUrl: image.imageUrl, setLoadingClickBookmark, setAddBookmarkModalToggleConfirm, handleMessageModal})
        if(updateResponse === true){
            setLoadingClickBookmark(false)
            const messageData = <Language jp={<>
                <p>アイテムをブックマークしました
                    <span className="text-lg"> 🚀✨</span>
                </p>
            </>} en={<>
                <p>Successfully bookmarked
                    <span className="text-lg"> 🚀✨</span>
                </p>
            </>}/>
            
            handleMessageModal({messageData})
            const newUserBookmarkIds = [...userBookmarkIds, newImageId]
            setUserBookmarkIds(newUserBookmarkIds)
            setUserBookmark([])
            } else {
                setLoadingClickBookmark(false)
                throw new Error("updateResponse was not true")
            }
        }
        await U()
                setLoadingClickBookmark(false)
    } catch (err: any) {
                setAddBookmarkModalToggleConfirm(false)
                setLoadingClickBookmark(false)
            return
        }
    
}
