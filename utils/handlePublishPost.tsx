import { NextRouter } from 'next/router'
import React, { Dispatch, SetStateAction } from 'react'
import { BookmarkItemInterface, PostInterface } from '../Interfaces'
import Language from '../Components/Language'
import { logout } from './logout'
import { publishPost } from './publishPost'
import { getAccessToken } from './tokens'
import { handleMessageModal } from './handleMessageModal'
import { checkYourConnection } from './checkYourConnection'

interface FunctionProps {
    setUserEmail: Dispatch<SetStateAction<string>>
    setAccessToken: Dispatch<SetStateAction<string>>
    setUserId: Dispatch<SetStateAction<string>>
    setIsLoggedin: Dispatch<SetStateAction<boolean>>
    setUserStatus: Dispatch<SetStateAction<string>>
    setLoginType: Dispatch<SetStateAction<string>>
    setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
    router: NextRouter
    readyToPublish: PostInterface | null
    setDraftConfirm: Dispatch<SetStateAction<boolean>> 
    setShowArticleModal: Dispatch<SetStateAction<boolean>> 
    showMessageModal: boolean
    setShowMessageModal: Dispatch<SetStateAction<boolean>> 
    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
    timeoutId: NodeJS.Timeout | null | undefined
    setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
}

export const handlePublishPost = async ({setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark, router, readyToPublish, setDraftConfirm, setShowArticleModal, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId} : FunctionProps) => {
    try {
        const response = await getAccessToken()
        if(!response.ok || response.ok !== true){
            if(response.includes("error") || response.includes("Error")){
                logout({setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark
                })
                router.push("/login")
                return
            }
        }

        const userPostData = readyToPublish;
        setDraftConfirm(false)
        userPostData && await publishPost({response, userPostData})        
        setShowArticleModal(false)
                    const messageData = <Language jp={<>
                        <p>記事を投稿しました
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>Your article has been published
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>

        handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})        
    } catch (err: any) {
                    if(err && err.message === "Network Error"){
                        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
                        return
                    }
                }
            }