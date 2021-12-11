import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { guest_login } from './urls';
import { handleRequest } from './handleRequest';
import { handleMessageModal } from './handleMessageModal';
import { checkYourConnection } from './checkYourConnection';

interface FunctionProps {
        setAccessToken: Dispatch<SetStateAction<string>>
        setUserId: Dispatch<SetStateAction<string>>
        setUserEmail: Dispatch<SetStateAction<string>>
        setUserStatus: Dispatch<SetStateAction<string>>
        setLoginType: Dispatch<SetStateAction<string>>
        setErrorData: Dispatch<SetStateAction<{
            userEmailError: string;
            passwordError: string;
        }>>
        setIsLoggedin: Dispatch<SetStateAction<boolean>>
        router: NextRouter
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
        loadingGuestLogin: boolean
        setLoadingGuestLogin: Dispatch<SetStateAction<boolean>>
    }


export const handleSignupSubmitGuest =  async ({setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, loadingGuestLogin, setLoadingGuestLogin
} : FunctionProps
        ) => {
        setLoadingGuestLogin(true)
        try {
            const response = await handleRequest({
                    urlData: guest_login,
                    requestType: "POST",
                    inputData: null,})
                    setErrorData({
                                    userEmailError: "",
                                    passwordError: ""})

            const ok = await response.data.ok
                    if(ok === true){
                    setLoadingGuestLogin(false)
                    setAccessToken(response.data.accessToken)
                    setUserId(response.data.userId)
                    setUserEmail(response.data.userEmail)
                    setUserStatus(response.data.userStatus)
                    setLoginType(response.data.loginType)
                    setErrorData({
                                    userEmailError: "",
                                    passwordError: ""
                                })
                    setIsLoggedin(true) 
                    router.push('/')
                }
        setLoadingGuestLogin(false)
        return
         } catch (err: any) {
        setLoadingGuestLogin(false)
                console.log(err);
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
                        return
                    }
                let errorType: string
                let messageData
                if(err.response.data.errors.userEmail){
                 errorType = err.response.data.errors.userEmail

                if(errorType === "accountNumberLimit"){
                    messageData = <Language jp={<p>ゲストログイン回数の上限に達しました<span className="text-lg"></span></p>} en={<p>You've reached the maximum limit of guest logins<span className="text-lg"></span></p>}/>
                }
                setLoadingGuestLogin(false)
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
                }
           }
        }
    }