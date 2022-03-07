import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Language from "../Components/Language";
import { handleRequest } from "./handleRequest";
import { google_signup_post } from "./urls";
import { checkYourConnection } from "./checkYourConnection";

interface FunctionProps {
        userDispatch: Dispatch<any>
        router: NextRouter
        setLoadingGoogleSignup: Dispatch<SetStateAction<boolean>>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
}

export const handleGoogleSuccessSignup =  async (res: any, {userDispatch, router, setLoadingGoogleSignup, handleMessageModal} : FunctionProps
        ) => {
    try {
    if(!res){
        throw new Error("Authentication failed")
    }
    const googleToken = res.tokenId
    setLoadingGoogleSignup(true)
    const data = { googleToken }
            const response = await handleRequest({
                    urlName: google_signup_post,
                    requestType: "POST",
                    inputData: data,})

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
                if(response.data.alreadySignedUp === true){
                    const messageData = <Language jp={<>
                        <p>Googleログインは既に有効になっています<span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>You have already enabled sign-in with Google <span className="text-lg"></span>
                        </p>
                    </>} />
                    messageData && handleMessageModal({messageData})
                    router.push('login')
                }
                router.push('/')
            }
        setLoadingGoogleSignup(false)

       } catch (err: any) {
        setLoadingGoogleSignup(false)
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({handleMessageModal})
                        return
                    }
                let errorType: string
                let messageData
                if(err.response.data.errors.userEmail){
                 errorType = err.response.data.errors.userEmail

                if(errorType === "updateInMypageForGoogle"){
                    messageData = <Language jp={<>
                        <p>メールアドレス & パスワードで登録済みです。マイページからGoogleログイン機能を追加ください<span className="text-lg"> 🔐</span>
                        </p>
                    </>} en={<>
                        <p>You have signed up with email address and password. </p>
                        <p>You can enable login with Google in your account page<span className="text-lg"></span>
                        </p>
                    </>} />
                    router.push('login')
                } 
                setLoadingGoogleSignup(false)
                messageData && handleMessageModal({messageData})
                return
            }
        }
    }
}
