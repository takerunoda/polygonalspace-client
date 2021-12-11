import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import Language from "../Components/Language";
import { handleMessageModal } from "./handleMessageModal";
import { enable_google_signin } from "./urls";
import { handleRequestAccessToken } from "./handleRequestAccessToken";

interface FunctionProps {
        router: NextRouter
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
        accessToken: string
        setLoadingEnableGoogle: Dispatch<SetStateAction<boolean>>
}

export const handleGoogleSuccessEnableSignin =  async (res: any, {router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, accessToken, setLoadingEnableGoogle} : FunctionProps
        ) => {
    try {
    if(!res){
        throw new Error("Authentication failed")
    }
    const googleToken = res.tokenId
    setLoadingEnableGoogle(true)
    const data = { googleToken }
            const response = await handleRequestAccessToken({
                    urlData: enable_google_signin,
                    requestType: "POST",
                    inputData: data,
                    accessToken: accessToken,})
        
            const ok = await response.data.ok
            if(ok === true){
                setLoadingEnableGoogle(false)
                const messageData = <Language jp={<>
                        <p>Googleログインを有効にしました<span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>Successfully enabled sign-in with Google<span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
            }
        setLoadingEnableGoogle(false)
        router.push("/mypage")
       } catch (err: any) {
        setLoadingEnableGoogle(false)
                if(err) { 
                let errorType: string
                let messageData
                if(err.response.data.errors.userEmail){
                 errorType = err.response.data.errors.userEmail
                if(errorType === "emailsDoNotMatchGoogle"){
                    messageData = <Language jp={<>
                        <p>メールアドレスが一致しません<span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>Email addresses do not match<span className="text-lg"></span>
                        </p>
                    </>}/>
                } 
                if(errorType === "googleNotVerified"){
                    messageData = <Language jp={<>
                        <p>Google IDの認証ができませんでした<span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>Authentication failed with the Google ID<span className="text-lg"></span>
                        </p>
                    </>}/>
                } 
                setLoadingEnableGoogle(false)
                messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                return
            }
        }
        router.push("/mypage")
    }
}
