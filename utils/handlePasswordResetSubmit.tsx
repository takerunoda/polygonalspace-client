import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { handleRequest } from './handleRequest';
import { password_reset_submit } from './urls';
import { checkYourConnection } from './checkYourConnection';

interface FunctionProps {
        userDispatch: Dispatch<any>
        inputData: {
            userEmail:  string;
            password:   string;
            passwordConfirmation: string;
            passwordResetToken:  string
        }
        router: NextRouter
        setLoadingResetToken: Dispatch<SetStateAction<boolean>>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
}

export const handlePasswordResetSubmit
 =  async ({inputData, userDispatch, router,  setLoadingResetToken, handleMessageModal} : FunctionProps
        ) => {
        setLoadingResetToken(true)
        try {
        const response = await handleRequest({
                urlName: password_reset_submit,
                requestType: "PUT",
                inputData,})
                if(response.data.ok == true){
                    setLoadingResetToken(false)
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
                    const messageData = <Language jp={<>
                        <p>パスワードを再設定用しました
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>Successfully updated your password
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>
                    messageData && handleMessageModal({messageData})
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
                        checkYourConnection({handleMessageModal})
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
                messageData && handleMessageModal({messageData })
                return
            }
        }
    }
}

