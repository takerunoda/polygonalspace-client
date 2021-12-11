import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router'
import { BookmarkItemInterface, PostInterface } from '../Interfaces'
import { logout } from './logout'
import Language from '../Components/Language'
import { getAccessToken } from './tokens'
import { handleMessageModal } from './handleMessageModal'
import { checkYourConnection } from './checkYourConnection'

interface FunctionProps {
                    item: PostInterface, 
                    setUserEmail: Dispatch<SetStateAction<string>>
                    setAccessToken: Dispatch<SetStateAction<string>>
                    setUserId: Dispatch<SetStateAction<string>>
                    setIsLoggedin: Dispatch<SetStateAction<boolean>>
                    setUserStatus: Dispatch<SetStateAction<string>>
                    loginType: string
                    setLoginType: Dispatch<SetStateAction<string>>
                    setLoadingPostModal: Dispatch<SetStateAction<boolean>>
                    router: NextRouter
                    deleteAction: any, 
                    data: any, 
                    setData: any, 
                    showMessageModal: boolean
                    setShowMessageModal: Dispatch<SetStateAction<boolean>>
                    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
                    timeoutId: NodeJS.Timeout | undefined | null
                    setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
                    setPostModalToggleConfirm: Dispatch<SetStateAction<boolean>>
                    setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
                }

export const handleDeletePost = async ({item, setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, loginType, setLoginType, setLoadingPostModal, router, deleteAction, data, setData, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setPostModalToggleConfirm, setUserBookmark
}: FunctionProps) => {  
    try {
        setLoadingPostModal(true)
        if(item._id == undefined || item.authorId == undefined) {
            setLoadingPostModal(false)
            setPostModalToggleConfirm(false)
            throw new Error("Post deletion failed")
        }
        const idToSend = { postId: item._id, authorId: item.authorId }
        const response = await getAccessToken()
        if(!response.ok || response.ok !== true){
            if(response.includes("error") || response.includes("Error")){
                logout({setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark
                })
                router.push("/login")
                setLoadingPostModal(false)
                setPostModalToggleConfirm(false)
                return
            }
        }
        const ok = await deleteAction ({response, idToSend})
        if(ok){
            let allData = data
            allData = allData.filter((x: any) => x._id !== item._id)
            setData(allData)
                    const messageData = <Language jp={<>
                        <p>アイテムを削除しました
                            <span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>Item was deleted
                            <span className="text-lg"></span>
                        </p>
                    </>}/>
                    
            handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
        } else {
            setLoadingPostModal(false)
            setPostModalToggleConfirm(false)
            throw new Error("Post deletion failed")
        }
        setLoadingPostModal(false)
        setPostModalToggleConfirm(false)
    } catch (err: any) {
            console.log(err)
            setLoadingPostModal(false)
            setPostModalToggleConfirm(false)
        if(err){
            if(err.message === "Network Error"){
                checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
            }
            return
        }
    }
}