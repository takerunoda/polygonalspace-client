import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { delete_account_google } from './urls';
import { handleMessageModal } from './handleMessageModal';
import { handleRequestAccessToken } from './handleRequestAccessToken';

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
        setIsLoggedin: Dispatch<SetStateAction<boolean>>

        setErrorData: Dispatch<SetStateAction<{
            userEmailError: string;
            passwordError: string;
        }>>
        router: NextRouter
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
        loadingDeleteAccount: boolean
        setLoadingDeleteAccount: Dispatch<SetStateAction<boolean>>
        accessToken: string
}
    export const handleDeleteAccountGoogle =  async (res: any, {inputData, setErrorData, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, loadingDeleteAccount, setLoadingDeleteAccount, accessToken} : FunctionProps
        ) => {
        setLoadingDeleteAccount(true)
        try { 
            if(!res){
                throw new Error("Authentication failed")
            }
            const googleToken = res.tokenId
            const { userEmail } = inputData
            const inputDataGoogle = { 
                                        userEmail: userEmail,
                                        googleToken: googleToken
                                    }

            const response = await handleRequestAccessToken({
                    urlData: delete_account_google,
                    requestType: "DELETE",
                    inputData: inputDataGoogle,
                    accessToken: accessToken,})
                    setErrorData({
                                    userEmailError: "",
                                    passwordError: ""
                                })
                    if(response.data.ok == true){
                    setLoadingDeleteAccount(false)
                    const messageData = <Language jp={<>
                        <p>アカウントを削除しました
                            <span className="text-2xl"></span>
                        </p>
                    </>} en={<>
                        <p>Account has been deleted
                            <span className="text-2xl"></span>
                        </p>
                    </>}/>
                    
                    messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                        setUserEmail("")
                        setAccessToken("")
                        setUserId("")
                        setIsLoggedin(false)
                        setUserStatus("")
                        setLoginType("")
                        router.push("/")
                    }
                    return
         } catch (err: any) {
                if(err) { if(err.response.data.errors.userEmail){
                const errorType = err.response.data.errors.userEmail
                let messageData
                if(errorType === "emailsDoNotMatch"){
                    messageData = <Language jp={<p>メールアドレスが一致しません<span className="text-2xl"></span></p>} en={<p>Emails do not match<span className="text-2xl"></span></p>}/>
                }  
                else {return}
                handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                }
            }
        setLoadingDeleteAccount(false)
        }
    }