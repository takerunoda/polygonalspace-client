import { NextRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'
import Language from '../Components/Language'
import { confirmation } from './urls'
import { handleRequest } from './handleRequest'
import { handleMessageModal } from './handleMessageModal'

interface FunctionProps {
    userId: string
    confirmationToken: string
    setAccessToken: Dispatch<SetStateAction<string>>
    setUserId: Dispatch<SetStateAction<string>>
    setUserEmail: Dispatch<SetStateAction<string>>
    setUserStatus: Dispatch<SetStateAction<string>>
    setLoginType: Dispatch<SetStateAction<string>>
    setIsLoggedin: Dispatch<SetStateAction<boolean>>
    router: NextRouter
    showMessageModal: boolean
    setShowMessageModal: Dispatch<SetStateAction<boolean>>
    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
    timeoutId: NodeJS.Timeout | null | undefined
    setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
}

export const useAccessConfirmation = ({userId, confirmationToken, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId
} : FunctionProps) => {
    useEffect(() => {
        const accessConfirmation = async () => {
            router.push('/')
            try {
            const response = await handleRequest({
                    urlData: `${confirmation}/${userId}/${confirmationToken}`,
                    requestType: "POST",
                    inputData: null,
            })
            const ok = await response.data.ok

                if(ok === true){
                    setAccessToken(response.data.accessToken)
                    setUserId(response.data.userId)
                    setUserEmail(response.data.userEmail)
                    setUserStatus(response.data.userStatus)
                    setLoginType(response.data.loginType)
                    setIsLoggedin(true)
                    const messageData = <Language jp={<>
                        <p>ユーザー登録が完了しました <span className="text-lg">🚀✨</span> 
                        </p>
                    </>} en={<>
                        <p>Successfully created your account<span className="text-lg">🚀✨</span>
                        </p>
                    </>}/>
                                    
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                    router.push("/")
                } else {
                    router.push("/")
                    throw new Error("Error occured")
                }
            } catch (err: any) {
                console.log(err);
            }
        }
        accessConfirmation()
    }, [])
}