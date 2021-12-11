import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { login } from './urls';
import { handleRequest } from './handleRequest';
import { handleMessageModal } from './handleMessageModal';
import { checkYourConnection } from './checkYourConnection';

interface FunctionProps {
        inputData: {
            userEmail: string;
            password: string;
        }
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
        setShowResend: Dispatch<SetStateAction<boolean>>
        setLoadingLogin: Dispatch<SetStateAction<boolean>>
    }
    export const handleLoginSubmit =  async ({inputData, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setShowResend, setLoadingLogin
} : FunctionProps
        ) => {
        try {  
            setLoadingLogin(true)         
            const response = await handleRequest({
                    urlData: login,
                    requestType: "POST",
                    inputData: inputData,
            })
            if(response.data.ok === true){
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
                setLoadingLogin(false) 
                router.push('/')
            }  else {
                setLoadingLogin(false)
                throw new Error("Login failed")
            }
        } catch (err: any) {
            setLoadingLogin(false)               
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
                        return
                    }
                if(err.response.data.errors.userEmail){
                const errorType = err.response.data.errors.userEmail
                let messageData
                if(errorType === "userNotExist"){
                    messageData = <Language jp={<p>メールアドレスまたはパスワードが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name or password</p>}/>
                } 
                else if(errorType === "confirmationNotCompleted"){
                    messageData = <Language jp={<p>メール認証が完了していません。確認メールをご確認ください。<span className="text-lg"></span></p>} en={<p>Verification not completed. Please check a confirmation email in your inbox</p>}/>
                    router.push('/resend-confirmation')
                } 
                else if(errorType === "updateInMypage"){
                    messageData = <Language jp={<>
                        <p>マイページからパスワードログインを有効にしてください<span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>You can enable login with password in your account page<span className="text-lg"></span>
                        </p>
                    </>}/>
                    router.push('login#googleLogin')
                } else {
                    messageData = <Language jp={<>
                        <p>ログインできません<span className="text-lg"> 🔐</span>
                        </p>
                    </>} en={<>
                        <p>Cannot complete Login<span className="text-lg"> 🔐</span>
                        </p>
                    </>}/>
                }
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
            } 
            if (err.response.data.errors.password){
                const errorType = err.response.data.errors.password
                let messageData
                if(errorType === "incorrectPassword"){
                    messageData = <Language jp={<p>メールアドレスまたはパスワードが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name or password<span className="text-lg"></span></p>}/>
                }  else {
                    messageData = <Language jp={<>
                        <p>ログインできません<span className="text-lg"> 🔐</span>
                        </p>
                    </>} en={<>
                        <p>Cannot complete Login<span className="text-lg"> 🔐</span>
                        </p>
                    </>}/>
                }
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
            }
        }
    }
}
