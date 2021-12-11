import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import HeadItem from '../Components/HeadItem'
import Language from '../Components/Language'
import AuthTitle from '../Components/AuthTitle'
import LoaderPage from '../Components/LoaderPage'
import BackToLogin from '../Components/BackToLogin'
import LoaderSmall from '../Components/LoaderSmall'
import ShowPassword from '../Components/ShowPassword'
import EmailPasswordTitle from '../Components/EmailPasswordTitle'
import BackToSignupOptions from '../Components/BackToSignupOptions'
import { handleSignupSubmit } from '../utils/handleSignupSubmit'
import { onChangeAuthSignup } from '../utils/onChangeAuthSignup'

const signupPassword = () => {
    const [inputData, setInputData] = useState({
        userEmail: "",
        password: "",
        passwordConfirmation: "",
    })
    const [errorData, setErrorData] = useState({
        userEmailError: "",
        passwordError: ""
    })
    const [showSignup, setShowSignup] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const userContext = useUserContext()
        if ( !userContext ) {
            return null
        }
   const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
   const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }
    const { setUserEmail, 
            isLoggedin, 
            setIsLoggedin} = userContext;
    const { showMessageModal, 
            setShowMessageModal, 
            message,
            setMessage } = modalContext
    const { language, 
            timeoutId, setTimeoutId, 
            loadingSignup, setLoadingSignup, 
        } = pageContext
    const router = useRouter()

    const onClickSignupPassword = () => {
        handleSignupSubmit({inputData, setUserEmail, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, language, setLoadingSignup})}

    const handleOnclickShowPassword = () => {
        inputData.password.length > 0 && setPasswordVisibility(!passwordVisibility)}
    
    return (
    !isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Signup | ユーザー登録"}
            description={""}
            noIndex={false}
            defaultURL={true}
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
                        passwordVisibility={passwordVisibility}
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
    </> : 
<LoaderPage />)}

export default signupPassword