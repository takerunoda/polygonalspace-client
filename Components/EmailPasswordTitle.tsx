import React from 'react'
import Language from './Language';

interface ComponentProps {
    titleType: string
}

const EmailPasswordTitle = ({titleType} : ComponentProps) => {
    return (
                <h2 className="text-sm sm:text-base font-bold my-6 text-center">
                    {titleType ==="email" && <Language jp={"メールアドレス"} en={"Email Address"}/>}
                    {titleType ==="password" && <Language jp={"パスワード"} en={"Password"}/>}
                    {titleType ==="currentPassword" && <Language jp={"現在のパスワード"} en={"Current Password"}/>}
                    {titleType ==="newPassword" && <Language jp={"新しいパスワード"} en={"New Password"}/>}
                    {titleType ==="newPasswordConfirm" && <Language jp={<ul><li>新しいパスワード</li><li className="text-sm sm:text-base">(確認用)</li></ul>} en={<ul><li>New Password</li><li className="text-sm sm:text-base">(Confirmation)</li></ul>}/>}
                    {titleType ==="passwordConfirm" && <Language jp={<ul><li>パスワード</li><li className="text-sm sm:text-base">(確認用)</li></ul>} en={<ul><li>Password</li><li className="text-sm sm:text-base">(Confirmation)</li></ul>}/>}
                    {titleType ==="emailDeleteAccount" && 
                    <p className="text-sm sm:text-base font-normal">
                        <Language jp={"削除するアカウントのメールアドレスを入力してください。"} en={"To delete the account, type the email address to confirm."}/>
                    </p>}
                </h2>)}

export default EmailPasswordTitle
