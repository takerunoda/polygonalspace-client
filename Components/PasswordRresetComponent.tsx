import React, { useState } from 'react'
import { usePageContext } from '../context/PageContext';
import { useFunctionsContext } from '../context/FunctionsContext';
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import EmailPasswordTitle from './EmailPasswordTitle';
import { onChangeAuthPasswordReset } from '../utils/onChangeAuthPasswordReset';

const PasswordRresetComponent = () => {
    let queryString
        if (typeof window !== "undefined") {
                queryString = window.location.search
            }
    const urlParams = new URLSearchParams(queryString);
    const userEmail = urlParams.get('email') ?? ""
    const passwordResetToken = urlParams.get('token') ?? ""
    const { loadingResetToken } = usePageContext()
    const { handlePasswordResetSubmitFn } = useFunctionsContext()
    const [inputData, setInputData] = useState({
            userEmail: userEmail,
            password: "",
            passwordConfirmation: "",
            passwordResetToken: passwordResetToken,
    })
    const onClickPasswordReset = () => handlePasswordResetSubmitFn({inputData})
    const breadcrumb_1 = null
    const breadcrumb_2 = { 
        name: `パスワード再設定`, 
        name_EN: `Upadte Password`,
        url: `/password-reset`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
    <div className="authOuter">
        <div className="authInner">
            <div className="px-3">
                <h1 className="h2  text-indigo-500">
                    <Language jp={"パスワード再設定"} en={"Upadte Password"}/>
                </h1>
                <EmailPasswordTitle titleType="email" />
                <div className={`${userEmail.length > 25 ? "text-sm sm:text-base" : "text-lg sm:text-xl"} bold text-purple-500`}>{userEmail}
                </div>
                <EmailPasswordTitle titleType="password" />
                <div>
                    <input className="inputField" type="password" name="passwordConfirmation" value={inputData.passwordConfirmation} onChange={(e) => onChangeAuthPasswordReset(e, {inputData, setInputData})} required/>
                </div>
                <EmailPasswordTitle titleType="passwordConfirm" />
                <div>
                    <input className="inputField" type="password" name="password" value={inputData.password} onChange={(e) => onChangeAuthPasswordReset(e, {inputData, setInputData})} required/>
                </div>
                <div className="text-center mt-10 py-4">
                    {loadingResetToken ? 
                    <div className="mt-5 mx-auto"><LoaderSmall /></div> : 
                    <button className="buttonIndigoMiddleSecond" onClick={onClickPasswordReset}>
                        <Language jp={"再設定する"} en={"Update"}/>
                    </button>}
                </div>
            </div>
        </div>
    </div>    
    </>
  )
}

export default PasswordRresetComponent