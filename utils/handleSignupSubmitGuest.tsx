import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { guest_login } from './urls';
import { handleRequest } from './handleRequest';
import { checkYourConnection } from './checkYourConnection';

interface FunctionProps {
        userDispatch: Dispatch<any>
        router: NextRouter
        setLoadingGuestLogin: Dispatch<SetStateAction<boolean>>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
    }


export const handleSignupSubmitGuest =  async ({ 
    userDispatch, router, setLoadingGuestLogin, handleMessageModal
} : FunctionProps
        ) => {
        setLoadingGuestLogin(true)
        try {
            const response = await handleRequest({
                    urlName: guest_login,
                    requestType: "POST",
                    inputData: null,})
            const ok = await response.data.ok
                    if(ok === true){
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
                    setLoadingGuestLogin(false)
                    router.push('/')
                }
        setLoadingGuestLogin(false)
        return
         } catch (err: any) {
        setLoadingGuestLogin(false)
                console.log(err);
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({handleMessageModal})
                        return
                    }
                let errorType: string
                let messageData
                if(err.response.data.errors.userEmail){
                 errorType = err.response.data.errors.userEmail
                if(errorType === "accountNumberLimit"){
                    messageData = <Language jp={<p>ゲストログイン回数の上限に達しました<span className="text-lg"></span></p>} en={<p>You&apos;ve reached the maximum limit of guest logins<span className="text-lg"></span></p>}/>
                }
                setLoadingGuestLogin(false)
                messageData && handleMessageModal({messageData})
                return
                }
           }
        }
    }