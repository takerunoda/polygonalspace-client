import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { handleRequest } from './handleRequest';
import { checkWhatYouInput } from './checkWhatYouInput';
import { handleMessageModal } from './handleMessageModal';
import { checkYourConnection } from './checkYourConnection';
import { password_reset_request } from './urls';

interface FunctionProps {
        inputData: {
            userEmail: string;
            password: string;
        }
        router: NextRouter
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
        language: boolean
        setLoadingResetPassword: Dispatch<SetStateAction<boolean>>
        setModalToggleConfirmRequestPasswordReset: Dispatch<SetStateAction<boolean>>
    }

export const handleRequestPasswordReset = async ({inputData, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, language, setLoadingResetPassword, setModalToggleConfirmRequestPasswordReset} : FunctionProps) => {
        setLoadingResetPassword(true)
        setModalToggleConfirmRequestPasswordReset(false)
        try {
            const response = await handleRequest({
                    urlData: password_reset_request,
                    requestType: "POST",
                    inputData: {...inputData, language: language},})
            const ok = await response.data.ok
                    if(ok === true){
                    setLoadingResetPassword(false)
                    const messageData = <Language jp={<>
                        <p>パスワード再設定用のメールを送信しました。ご確認ください
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>We sent you an email for reseting your password. Please check your inbox
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>                    
                    messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                    router.push('/')
                }
                return
         } catch (err: any) {
                setLoadingResetPassword(false)
                    if(err.message === "Network Error"){
                        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
                        return
                    }
                    // if(err.message === "Request failed with status code 400"){
                    //     checkWhatYouInput({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
                    //     return
                    // }
                if(err) { 
                    let errorType: string
                    let messageData
                    if(err.response.data.errors.userEmail){
                    errorType = err.response.data.errors.userEmail

                    if(errorType === "userNotExist"){
                        messageData = <Language jp={<p>登録されていないメールアドレスです<span className="text-lg"></span></p>} en={<p>User does not exist<span className="text-lg"></span></p>}/>
                    } 
                    if(errorType === "passwordLoginNotSet"){
                        messageData = <Language jp={<p>パスワードログインが設定されていません<span className="text-lg"></span></p>} en={<p>Password login has not been enabled<span className="text-lg"></span></p>}/>
                    }
                    if(errorType === "userDoesNotExist"){
                        messageData = <Language jp={<p>入力内容をご確認ください<span className="text-lg"></span></p>} en={<p>Make sure all fields are filled in correctly<span className="text-lg"></span></p>}/>
                    }
                    messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                    return
                }
            }
        }
    }