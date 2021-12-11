import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { handleMessageModal } from './handleMessageModal';
import { enable_password_singin } from './urls';
import { handleRequestAccessToken } from './handleRequestAccessToken';

interface FunctionProps {
        inputData: {
            userEmail: string;
            password: string,
            passwordConfirmation: string,
        }
        setUserEmail: Dispatch<SetStateAction<string>>
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
        accessToken: string
        setLoadingEnablePassword: Dispatch<SetStateAction<boolean>>
        setShowResend: Dispatch<SetStateAction<boolean>>
}


export const handleEnablePasswordSignin = async ({inputData, setUserEmail, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, accessToken, setLoadingEnablePassword, setShowResend} : FunctionProps
        ) => {
        setLoadingEnablePassword(true)
        try {
            const response = await handleRequestAccessToken({
                    urlData: enable_password_singin,
                    requestType: "POST",
                    inputData: inputData,
                    accessToken: accessToken,})

                    setErrorData({
                                    userEmailError: "",
                                    passwordError: ""
                                })

                    const ok = await response.data.ok
                    if(ok === true){
                    setLoadingEnablePassword(false)
                    const messageData = <Language jp={<>
                        <p>パスワードログインを有効にしました。
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>Enabled Password Sign-in
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>
                    
                    messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                    router.push('/mypage')
                }
            return
         } catch (err: any) {
                if(err) { 
                let errorType: string
                let messageData
                if(err.response.data.errors.userEmail){
                 errorType = err.response.data.errors.userEmail
                setLoadingEnablePassword(false)
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return

            } 
            if(err.response.data.errors.password){
                const errorType = err.response.data.errors.password
                let messageData
                if (errorType === "passwordsDoNotMatch"){
                    messageData = <Language jp={<p>確認用のパスワードが一致しません<span className="text-lg"></span></p>} en={<p>Passwords do not match<span className="text-lg"></span></p>}/>
                }
                if (errorType === "passwordLength"){
                    messageData = <Language jp={<p>パスワードは8文字以上に設定ください <span className="text-lg"></span></p>} en={<p>Password should have at least 8 characters <span className="text-lg"></span></p>}/>
                }
                setLoadingEnablePassword(false)                    
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
            }
        }
    }
}

