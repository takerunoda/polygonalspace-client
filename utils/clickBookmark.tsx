import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router'
import { ImageInterface, BookmarkItemInterface } from '../Interfaces'
import { getAccessToken } from './tokens'
import { handleMessageModal } from './handleMessageModal'
import { logout } from './logout'
import { updateBookmark } from './updateBookmark'
import Language from '../Components/Language'

interface FunctionProps {
        id: string, 
        userBookmark: BookmarkItemInterface[],    
        setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        userEmail: string
        setUserEmail: Dispatch<SetStateAction<string>>
        setAccessToken: Dispatch<SetStateAction<string>>
        setUserId: Dispatch<SetStateAction<string>>
        isLoggedin: boolean
        setIsLoggedin: Dispatch<SetStateAction<boolean>>
        userBookmarkIds: string[]
        setUserBookmarkIds: Dispatch<SetStateAction<string[]>>
        userStatus: string
        setUserStatus: Dispatch<SetStateAction<string>>
        setLoginType: Dispatch<SetStateAction<string>>
        router: NextRouter
        image: ImageInterface | BookmarkItemInterface
        setShowDetailsModal: Dispatch<SetStateAction<boolean>>
        setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null |
         undefined>>
        loadingClickBookmark: boolean
        setLoadingClickBookmark: Dispatch<SetStateAction<boolean>>
}

export const clickBookmark = async (
    {id, userBookmark, setUserBookmark, showMessageModal, setShowMessageModal, userEmail, setUserEmail, setAccessToken, setUserId, isLoggedin, setIsLoggedin, userStatus, setUserStatus, setLoginType, router, image, setShowDetailsModal, setAddBookmarkModalToggleConfirm, setMessage,timeoutId,setTimeoutId, userBookmarkIds, setUserBookmarkIds, loadingClickBookmark, setLoadingClickBookmark
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
                logout({setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark
                })
                router.push("/login")
                throw new Error("authentication failed")
            }
        }

        const newImageId = image.imageId
        const updateResponse = await updateBookmark({response, imageId: newImageId, mediaType: image.mediaType ?? "image", imageUrl: image.imageUrl, setLoadingClickBookmark, showMessageModal, setShowMessageModal, setAddBookmarkModalToggleConfirm, setMessage, timeoutId, setTimeoutId})
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
            
            handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
    
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
