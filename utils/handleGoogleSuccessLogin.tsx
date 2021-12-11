import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Language from "../Components/Language";
import { handleRequest } from "./handleRequest";
import { google_login_post } from "./urls";
import { checkYourConnection } from "./checkYourConnection";
import { handleMessageModal } from "./handleMessageModal";

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
        setLoadingGoogleLogin: Dispatch<SetStateAction<boolean>>
}


export const handleGoogleSuccessLogin =  async (res: any, {setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingGoogleLogin} : FunctionProps
        ) => {
    try {
    if(!res){
        throw new Error("Authentication failed")
    }
    const googleToken = res.tokenId
    setLoadingGoogleLogin(true)
    const data = { googleToken }
            const response = await handleRequest({
                    urlData: google_login_post,
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
                router.push("/")                
            }
        setLoadingGoogleLogin(false)

       } catch (err: any) {
        setLoadingGoogleLogin(false)
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
                        return
                    }
                let errorType: string
                let messageData
                if(err.response.data.errors.userEmail){
                 errorType = err.response.data.errors.userEmail
                const errorTypeArray = ["passowrdUserExists", "notSignedUpGoogle", "updateInMypageForGoogle"]
                if(errorType === "passowrdUserExists"){
                    messageData = <Language jp={<p>登録済みのメールアドレスです<span className="text-lg"> 🔐</span></p>} en={<p>This email address has been already registered<span className="text-lg"> 🔐</span></p>}/>
                } 
                else if(errorType === "notSignedUpGoogle"){
                    messageData = <Language jp={<p>Googleログインのユーザー登録がされていません<span className="text-lg"> 🔐</span></p>} en={<p>Please complete signup before login<span className="text-lg"> 🔐</span></p>}/>
                    router.push('/signup-options')
                } 
                else if(errorType === "updateInMypageForGoogle"){
                    messageData = <Language jp={<>
                        <p>マイページからGoogleログイン機能を有効にしてください<span className="text-lg"> 🔐</span>
                        </p>
                    </>} en={<>
                        <p>Please enable Google login in MyPage<span className="text-lg"> 🔐</span>
                        </p>
                    </>}/>
                    router.push('login')
                } 
                else {
                    messageData = <Language jp={<>
                        <p>Googleログインできません<span className="text-lg"> 🔐</span>
                        </p>
                    </>} en={<>
                        <p>Cannot proceed to Google Login<span className="text-lg"> 🔐</span>
                        </p>
                    </>}/>
                }
                setLoadingGoogleLogin(false)
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
            }
        }
    }
}
