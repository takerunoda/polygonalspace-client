import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { login } from './urls';
import { handleRequest } from './handleRequest';
import { checkYourConnection } from './checkYourConnection';

interface FunctionProps {
        userDispatch: Dispatch<any>
        inputData: {
            userEmail: string;
            password: string;
        }
        router: NextRouter
        setLoadingLogin: Dispatch<SetStateAction<boolean>>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
    }
    export const handleLoginSubmit =  async ({inputData, userDispatch, router, setLoadingLogin, handleMessageModal
} : FunctionProps
        ) => {
        try {  
            setLoadingLogin(true)         
            const response = await handleRequest({
                    urlName: login,
                    requestType: "POST",
                    inputData,
            })
            if(response.data.ok === true){
                    userDispatch({
                        type: "SET_VALUES",
                        payload: {
                            accessToken: response.data.accessToken,
                            userId: response.data.userId,
                            userEmail: response.data.userEmail,
                            userStatus: response.data.userStatus,
                            loginType: response.data.loginType,
                            isLoggedin: true
                        }})
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
                        checkYourConnection({handleMessageModal})
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
                messageData && handleMessageModal({messageData})
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
                messageData && handleMessageModal({messageData})
                return
            }
        }
    }
}
