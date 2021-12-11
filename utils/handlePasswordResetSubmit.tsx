import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { handleRequest } from './handleRequest';
import { password_reset_submit } from './urls';
import { handleMessageModal } from './handleMessageModal';
import { checkYourConnection } from './checkYourConnection';

interface FunctionProps {
        inputData: {
            userEmail:  string;
            password:   string;
            passwordConfirmation: string;
            passwordResetToken:  string
        }
        setUserEmail: Dispatch<SetStateAction<string>>
        setAccessToken: Dispatch<SetStateAction<string>>
        setUserId: Dispatch<SetStateAction<string>>
        setUserStatus: Dispatch<SetStateAction<string>>
        setLoginType: Dispatch<SetStateAction<string>>
        setErrorData: Dispatch<SetStateAction<{
            userEmailError: string;
            passwordError:  string;
        }>>
        setIsLoggedin: Dispatch<SetStateAction<boolean>>
        router: NextRouter
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
        loading: boolean
        setLoadingResetToken: Dispatch<SetStateAction<boolean>>
}


export const handlePasswordResetSubmit
 =  async ({inputData, setAccessToken, setUserId, setUserStatus, setLoginType, setUserEmail, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingResetToken} : FunctionProps
        ) => {
        setLoadingResetToken(true)
        try {
        const response = await handleRequest({
                urlData: password_reset_submit,
                requestType: "PUT",
                inputData: inputData,})
                    setErrorData({
                                    userEmailError: "",
                                    passwordError: ""
                                })
                if(response.data.ok == true){
                    setLoadingResetToken(false)
                    setAccessToken(response.data.accessToken)
                    setUserId(response.data.userId)
                    setUserEmail(response.data.userEmail)
                    setUserStatus(response.data.userStatus)
                    setLoginType(response.data.loginType)
                    setIsLoggedin(true)
                    const messageData = <Language jp={<>
                        <p>パスワードを再設定用しました
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>Successfully updated your password
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>
                    messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                    router.push('/')
                } else {
                    setLoadingResetToken(false)
                    router.push("/")
                    throw new Error("error occured")
                }
        return
         } catch (err: any) {
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
                        return
                    }
                if(err.response.data.errors.password){
                const errorType = err.response.data.errors.password
                let messageData
                if(errorType === "passwordsDoNotMatch"){
                    messageData = <Language jp={<p>パスワードが一致しません<span className="text-lg"></span></p>} en={<p>Passwords do not match<span className="text-lg"></span></p>}/>
                }  
                if (errorType === "passwordLength"){
                    messageData = <Language jp={<p>パスワードは8文字以上に設定ください <span className="text-lg"></span></p>} en={<p>Password should have at least 8 characters <span className="text-lg"></span></p>}/>
                }
                setLoadingResetToken(false)                    
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
            }
        }
    }
}

