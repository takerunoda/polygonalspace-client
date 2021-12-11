import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Language from "../Components/Language";
import { handleRequest } from "./handleRequest";
import { google_signup_post } from "./urls";
import { handleMessageModal } from "./handleMessageModal";
import { checkYourConnection } from "./checkYourConnection";

interface FunctionProps {
        setAccessToken: Dispatch<SetStateAction<string>>
        setUserId: Dispatch<SetStateAction<string>>
        setUserEmail: Dispatch<SetStateAction<string>>
        setUserStatus: Dispatch<SetStateAction<string>>
        setLoginType: Dispatch<SetStateAction<string>>
        setIsLoggedin: Dispatch<SetStateAction<boolean>>
        router: NextRouter
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
        setLoadingGoogleSignup: Dispatch<SetStateAction<boolean>>
}

export const handleGoogleSuccessSignup =  async (res: any, {setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingGoogleSignup} : FunctionProps
        ) => {
    try {
    if(!res){
        throw new Error("Authentication failed")
    }
    const googleToken = res.tokenId
    setLoadingGoogleSignup(true)
    const data = { googleToken }
            const response = await handleRequest({
                    urlData: google_signup_post,
                    requestType: "POST",
                    inputData: data,})

            const ok = await response.data.ok

            if(ok === true){
                setAccessToken(response.data.accessToken)
                setUserId(response.data.userId)
                setUserEmail(response.data.userEmail)
                setUserStatus(response.data.userStatus)
                setLoginType(response.data.loginType)
                setIsLoggedin(true)
                if(response.data.alreadySignedUp === true){
                    const messageData = <Language jp={<>
                        <p>Googleログインは既に有効になっています<span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>You have already enabled sign-in with Google <span className="text-lg"></span>
                        </p>
                    </>} />
                    messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                    router.push('login')
                }
                router.push('/')
            }
        setLoadingGoogleSignup(false)

       } catch (err: any) {
        setLoadingGoogleSignup(false)
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
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
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
            }
        }
    }
}
