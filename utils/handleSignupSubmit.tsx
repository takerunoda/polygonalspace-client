import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { signup } from './urls';
import { handleRequest } from './handleRequest';
import { checkYourConnection } from './checkYourConnection';

interface FunctionProps {
        inputData: {
            userEmail:  string;
            password:   string;
            passwordConfirmation:   string;
        }
        router: NextRouter
        language: boolean
        setLoadingSignup: Dispatch<SetStateAction<boolean>>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
}


export const handleSignupSubmit =  async ({inputData, router, language, setLoadingSignup, handleMessageModal} : FunctionProps
        ) => {
        setLoadingSignup(true)
        try {
            const response = await handleRequest({
                    urlName: signup,
                    requestType: "POST",
                    inputData: {...inputData, language: language},})
            const ok = await response.data.ok
                    if(ok === true){
                    setLoadingSignup(false)
                    const messageData = <Language jp={<>
                        <p>確認メールを送信しました。ご確認ください
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>We sent you an email for confirmation. Please check your inbox
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>
                    messageData && handleMessageModal({messageData })
                    setTimeout(() => {
                        router.push('/')
                    }, 2000);
        }
        setLoadingSignup(false)
        return
         } catch (err: any) {
        setLoadingSignup(false)
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

                if(errorType === "userExists"){
                    messageData = <Language jp={<p>登録済みのメールアドレスです<span className="text-lg"></span></p>} en={<p>This email address has been already registered<span className="text-lg"></span></p>}/>
                } 
                if(errorType === "accountNumberLimit"){
                    messageData = <Language jp={<p>作成可能なアカウント数の上限に達しました<span className="text-lg"></span></p>} en={<p>You&apos;ve reached the maximum number of accounts<span className="text-lg"></span></p>}/>
                }
                if(errorType === "invalidEmailAddress"){
                    messageData = <Language jp={<p>メール形式が正しくありません<span className="text-lg"></span></p>} en={<p>Not a valid email address<span className="text-lg"></span></p>}/>
                }
                if(errorType === "confirmationNotCompleted"){
                    router.push("/resend-confirmation")
                    messageData = <Language jp={<p>メール認証が完了していません。確認メールをご確認ください。<span className="text-lg"></span></p>} en={<p>Verification not completed. Please check a confirmation email in your inbox<span className="text-lg"></span></p>}/>
                } 
                if(errorType === "passowrdUserExists"){
                    messageData = <Language jp={<p>メールアドレス・パスワードで登録済みです<span className="text-lg"> 🔐</span></p>} en={<p>This email address has been signed up with Google Login<span className="text-lg"> 🔐</span></p>}/>
                     router.push("/login")
                } 
                if(errorType === "updateInMypage"){
                    messageData = <Language jp={<p>Googleログインで登録済みです。ログイン後、マイページからパスワードを追加ください<span className="text-lg"></span></p>} en={<p>This email address has been signed up with Google Login. You can enable password loginin in your account page<span className="text-lg"></span></p>}/>
                } 
                if(errorType === "sendingEmailFailed"){
                    messageData = <Language jp={<p>確認メールを送信できませんでした。<span className="text-lg"></span></p>} en={<p>Couldn&apos;t send you a confirmation email<span className="text-lg"></span></p>}/>
                } 
                setLoadingSignup(false)
                messageData && handleMessageModal({messageData})
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
                setLoadingSignup(false)
                messageData && handleMessageModal({messageData})
                return
            }
        }
    }
}

