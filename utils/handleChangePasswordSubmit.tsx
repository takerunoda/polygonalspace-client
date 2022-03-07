import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router';
import Language from '../Components/Language';
import { change_password } from './urls';
import { checkYourConnection } from './checkYourConnection';
import { handleRequestAccessToken } from './handleRequestAccessToken';

interface FunctionProps {
        inputData: {
            userEmail: string;
            currentPassword: string,
            newPassword: string,
            newPasswordConfirmation: string,
        }
        router: NextRouter
        accessToken: string
        setLoadingChangePassword: Dispatch<SetStateAction<boolean>>
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
}


export const handleChangePasswordSubmit = async ({inputData, router, accessToken, setLoadingChangePassword, handleMessageModal} : FunctionProps
        ) => {
        setLoadingChangePassword(true)
        try {
            const response = await handleRequestAccessToken({
                    urlName: change_password,
                    requestType: "POST",
                    inputData,
                    accessToken,})
                    const ok = await response.data.ok
                    if(ok === true){
                    setLoadingChangePassword(false)
                    const messageData = <Language jp={<>
                        <p>パスワードが変更されました。
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>} en={<>
                        <p>Your password has been updated
                            <span className="text-lg"> 🚀✨</span>
                        </p>
                    </>}/>
                    messageData && handleMessageModal({messageData})
                    router.push('/mypage')
        }
        return
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
                if (errorType === "userExists"){
                    messageData = <Language jp={<p>登録済みのメールアドレスです<span className="text-lg"></span></p>} en={<p>That userEmail is already registered<span className="text-lg"></span></p>}/>
                } 
                if(errorType === "accountNumberLimit"){
                    messageData = <Language jp={<p>作成可能なアカウント数の上限に達しました<span className="text-lg"></span></p>} en={<p>You reached the maximum number of accounts<span className="text-lg"></span></p>}/>
                } 
                if(errorType === "invalidEmailAddress"){
                    messageData = <Language jp={<p>メール形式が正しくありません<span className="text-lg"></span></p>} en={<p>Not a valid email address<span className="text-lg"></span></p>}/>
                } 
                if(errorType === "confirmationNotCompleted"){
                    messageData = <Language jp={<p>メール認証が完了していません。確認メールをご確認ください。<span className="text-lg"></span></p>} en={<p>Verification not completed. Please check a confirmation email in your inbox</p>}/>
                } 
                setLoadingChangePassword(false)
                messageData && handleMessageModal({messageData})
                return

            } 
            if(err.response.data.errors.password){
                const errorType = err.response.data.errors.password
                let messageData
                if(errorType === "incorrectPassword"){
                    messageData = <Language jp={<p>現在のパスワードが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name or password<span className="text-lg"></span></p>}/>
                } 
                if (errorType === "passwordsDoNotMatch"){
                    messageData = <Language jp={<p>確認用のパスワードが一致しません<span className="text-lg"></span></p>} en={<p>Passwords do not match<span className="text-lg"></span></p>}/>
                }  
                if (errorType === "passwordLength"){
                    messageData = <Language jp={<p>パスワードは8文字以上に設定ください <span className="text-lg"></span></p>} en={<p>Password should have at least 8 characters <span className="text-lg"></span></p>}/>
                }
                setLoadingChangePassword(false)                    
                messageData && handleMessageModal({messageData})
                return
            }}}}

