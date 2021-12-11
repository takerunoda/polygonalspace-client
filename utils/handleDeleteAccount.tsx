import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { delete_account } from './urls';
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
        setModalToggleConfirm: Dispatch<SetStateAction<boolean>>

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
        language: boolean
        setLoadingDeleteAccount: Dispatch<SetStateAction<boolean>>
        accessToken: string
}
    export const handleDeleteAccount =  async ({inputData, setErrorData, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, language, setLoadingDeleteAccount: setLoadingDeleteAccount, accessToken, setModalToggleConfirm} : FunctionProps
        ) => {
        setLoadingDeleteAccount(true)
        setModalToggleConfirm(false)
        try {
            const response = await handleRequestAccessToken({
                    urlData: delete_account,
                    requestType: "DELETE",
                    inputData: {...inputData, language: language},
                    accessToken: accessToken})
                    setErrorData({
                                    userEmailError: "",
                                    passwordError: ""
                                })
                    if(response.data.ok == true){
                    setLoadingDeleteAccount(false)
                    const messageData = <Language jp={<>
                        <p>アカウントを削除しました
                            <span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>Account has been deleted
                            <span className="text-lg"></span>
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
                if(errorType === "userNotExist"){
                    messageData = <Language jp={<p>メールアドレスまたはパスワードが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name or password</p>}/>
                }  
                else {return}
                handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
            } else if (err.response.data.errors.password){
                const errorType = err.response.data.errors.password
                let messageData
                if(errorType === "incorrectPassword"){
                    messageData =<Language jp={<p>メールアドレスまたはパスワードが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name or password<span className="text-lg"></span></p>}/>
                } else {return}
                handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
            }}
            setLoadingDeleteAccount(false)
        }
    }
