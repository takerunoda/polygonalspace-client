import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router'
import { BookmarkItemInterface } from '../Interfaces'
import Language from '../Components/Language'
import { logout } from './logout'
import { getAccessToken } from './tokens'
import { handleMessageModal } from './handleMessageModal'
import { deleteBookmark } from './deleteBookmark'

interface FunctionProps {
                        item: BookmarkItemInterface, 
                        setUserEmail: Dispatch<SetStateAction<string>>
                        setAccessToken: Dispatch<SetStateAction<string>>
                        setUserId: Dispatch<SetStateAction<string>>
                        setIsLoggedin: Dispatch<SetStateAction<boolean>>
                        setUserStatus: Dispatch<SetStateAction<string>>
                        setLoginType: Dispatch<SetStateAction<string>>
                        setLoadingDeleteBookmark: Dispatch<SetStateAction<boolean>>
                        router: NextRouter
                        userBookmark: BookmarkItemInterface[];
                        setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
                        showMessageModal: boolean
                        setShowMessageModal: Dispatch<SetStateAction<boolean>>
                        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
                        timeoutId: NodeJS.Timeout | undefined | null
                        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
                        setShowBookmarkModal: Dispatch<SetStateAction<boolean>>
                        // setPasswordLogin: Dispatch<SetStateAction<boolean>>
                        // setGoogleLogin: Dispatch<SetStateAction<boolean>>
                        userBookmarkIds: string[];
                        setUserBookmarkIds: Dispatch<SetStateAction<string[]>>                        
                    }

export const handleDeleteBookmark = async ({item, setUserEmail, setAccessToken,setUserId, setIsLoggedin,setUserStatus, setLoginType, setLoadingDeleteBookmark, router, userBookmark, setUserBookmark, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId,setShowBookmarkModal, userBookmarkIds, setUserBookmarkIds
    // , setPasswordLogin, setGoogleLogin
} : FunctionProps) => {
        //going through all items in bookmark and filtering out the item which has the same id as the clicked item to create a new bookmark array
        //then updates the user state with the updated bookmark array
        try {
        setLoadingDeleteBookmark(true)
            const response = await getAccessToken()
        if(!response.ok || response.ok !== true){
            if(response.includes("error") || response.includes("Error")){
                logout({setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark
                })
                router.push("/login")
                setLoadingDeleteBookmark(false)
                return
            }
        }            
            const userBookmarkData = userBookmark.filter((x: any) => x.imageId !== item.imageId)
            if(userBookmarkData.length === 0){
                const object = {_id: "",
                                imageId:"randomId" ,
                                imageTitle:"",
                                imageUrl:"",
                                imageDescription:"",
                                like: 0,
                                platform:""}
            setUserBookmark([object]) 
            } else {
            setUserBookmark(userBookmarkData)
            }
            const ok = await deleteBookmark({response, imageId: item.imageId})
            if(ok === true){
                setLoadingDeleteBookmark(false)
                setUserBookmarkIds(prev => prev.filter(x => x !== item.imageId))
                    const messageData = <Language jp={<>
                        <p>ブックマークを削除しました
                            <span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>Bookmark item was deleted
                            <span className="text-lg"></span>
                        </p>
                    </>}/>

                handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
            } else {
                setLoadingDeleteBookmark(false)
                throw new Error("Bookmark deletion failed")
            }
        } catch (err: any) {
           console.log(err)
            setLoadingDeleteBookmark(false)
           return 
        }
    }