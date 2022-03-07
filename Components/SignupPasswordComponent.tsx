import React, { useState } from 'react'
import { usePageContext } from '../context/PageContext'
import { useFunctionsContext } from '../context/FunctionsContext'
import Language from './Language'
import AuthTitle from './AuthTitle'
import Breadcrumb from './Breadcrumb'
import BackToLogin from './BackToLogin'
import LoaderSmall from './LoaderSmall'
import ShowPassword from './ShowPassword'
import EmailPasswordTitle from './EmailPasswordTitle'
import BackToSignupOptions from './BackToSignupOptions'
import { onChangeAuthSignup } from '../utils/onChangeAuthSignup'

const SignupPasswordComponent = () => {
    const [inputData, setInputData] = useState({
        userEmail: "",
        password: "",
        passwordConfirmation: "",
    })
    const { loadingSignup, passwordVisibility, setPasswordVisibility,} = usePageContext()
    const { handleSignupSubmitFn } = useFunctionsContext()
    const onClickSignupPassword = () => handleSignupSubmitFn({inputData})
    const handleOnclickShowPassword = () => {
        inputData.password.length > 0 && setPasswordVisibility(!passwordVisibility)}
    const breadcrumb_1 = { 
        name: `ユーザー登録`, 
        name_EN: `Signup`,
        url: `/signup-options`}
    const breadcrumb_2 = { 
        name: `ユーザー登録 (パスワード))`, 
        name_EN: `Signup with Password`,
        url: `/signup-password`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="authOuter">
            <div className="authInner">
                <div>
                    <AuthTitle jp={"ユーザー登録"} en={"Signup"}/>
                    <EmailPasswordTitle titleType="email" />
                    <div className="w-72 md:w-80 mx-auto">
                        <input className="inputField" type="text" name="userEmail" value={inputData.userEmail} onChange={(e) => onChangeAuthSignup(e, {inputData, setInputData})} required/>
                    </div>
                    <EmailPasswordTitle titleType="password" />
                    <div className="w-72 md:w-80 mx-auto">
                        <input className="inputField" type={!passwordVisibility ? "password" : "text"} name="password" value={inputData.password} onChange={(e) => onChangeAuthSignup(e, {inputData, setInputData})} required/>
                    </div>
                    <EmailPasswordTitle titleType="passwordConfirm" />
                    <div className="w-72 md:w-80 mx-auto">
                        <input className="inputField" type={!passwordVisibility ? "password" : "text"} name="passwordConfirmation" value={inputData.passwordConfirmation} onChange={(e) => onChangeAuthSignup(e, {inputData, setInputData})} required/>
                    </div>
                    <ShowPassword 
                        handleOnclickShowPassword={handleOnclickShowPassword} 
                    />
                    {loadingSignup ? 
                        <div className="my-11 mx-auto">
                            <LoaderSmall />
                        </div> : 
                        <div className="text-center my-4">
                        <button className="w-72 md:w-80 buttonIndigoBigger" onClick={onClickSignupPassword}>
                            <Language jp={"ユーザー登録する"} en={"Sign up"} />
                        </button>
                    </div>}
                        <div className="backOptions">
                            <BackToSignupOptions/>
                            <BackToLogin />
                        </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default SignupPasswordComponent