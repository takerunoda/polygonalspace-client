import { NextRouter } from "next/router";
import { Dispatch } from "react";
import Language from "../Components/Language";
import { handleRequest } from "./handleRequest";
import { google_login_post } from "./urls";
import { checkYourConnection } from "./checkYourConnection";

interface FunctionProps {
        userDispatch: Dispatch<any>
        router: NextRouter
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
    }

export const handleGoogleSuccessLogin =  async (res: any, {userDispatch, router, handleMessageModal} : FunctionProps
        ) => {
    try {
    if(!res){
        throw new Error("Authentication failed")
    }
    const googleToken = res.tokenId
    const data = { googleToken }
            const response = await handleRequest({
                    urlName: google_login_post,
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
                router.push("/")                
            }
       } catch (err: any) {
                if(err) { 
                    if(err.message === "Network Error"){
                        checkYourConnection({handleMessageModal})
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
                messageData && handleMessageModal({messageData})
                return
            }
        }
    }
}
