import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { handleRequest } from './handleRequest';
import { checkYourConnection } from './checkYourConnection';
import { resend_confirmation } from './urls';

interface FunctionProps {
        inputData: {
            userEmail: string;
            password: string;
        }
        router: NextRouter
        language: boolean
        setLoadingGeneral: Dispatch<SetStateAction<boolean>>
        setResendConfirmModalToggleConfirm: Dispatch<SetStateAction<boolean>>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
}

export const handleResendConfirmation = async ({inputData, router, language, setLoadingGeneral, setResendConfirmModalToggleConfirm, handleMessageModal} : FunctionProps) => {
        setLoadingGeneral(true)
        setResendConfirmModalToggleConfirm(false)
        try {
            const response = await handleRequest({
                    urlName: resend_confirmation,
                    requestType: "POST",
                    inputData: {...inputData, language: language},})
            const ok = await response.data.ok

                    if(ok === true){
                    setLoadingGeneral(false)
                    router.push("/login")
                    const messageData = <Language jp={<>
                        <p>確認メールを送信しました。ご確認ください
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>Confirmation email has been sent. Please check your inbox
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>
                    messageData && handleMessageModal({messageData})
                    router.push('/')}
        setLoadingGeneral(false)
        return
         } catch (err: any) {
        setLoadingGeneral(false)
             console.log(`${JSON.stringify(err)}`)
            if(err.message === "Network Error"){
                checkYourConnection({handleMessageModal})
                return
            }
             let messageData
             if(err && err.response.data.errors){ 
                const errorType = err.response.data.errors
                if(errorType === "alreadyVerified"){
                    messageData = <Language jp={<p>メール認証は完了しています <span className="text-xl">✉️</span></p>} en={<p>You have already verified your email address <span className="text-xl">✉️</span></p>}/>
                }
                if(errorType === "userNotExist"){
                    messageData = <Language jp={<p>メールアドレスが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name</p>}/>
                }
                if(errorType === "userDoesNotExist"){
                    messageData = <Language jp={<p>登録されていないメールアドレスです<span className="text-lg"></span></p>} en={<p>User does not exist<span className="text-lg"></span></p>}/>
                }
            }
                messageData && handleMessageModal({messageData})
        }
    }