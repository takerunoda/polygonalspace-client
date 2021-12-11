import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Language from './Language'
import LoaderSmall from './LoaderSmall'
import ShowPassword from './ShowPassword'
import EmailPasswordTitle from './EmailPasswordTitle'
import { useModalContext } from '../context/ModalContext'
import { usePageContext } from '../context/PageContext'
import { useUserContext } from '../context/UserContext'
import { handleLoginSubmit } from '../utils/handleLoginSubmit'
import { onChangeAuth } from '../utils/onChangeAuth'

interface ComponentProps {
    setShowResend: Dispatch<SetStateAction<boolean>>
}

const LoginForm = ({setShowResend}: ComponentProps) => {
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
    const {setUserEmail, setUserId, setAccessToken, isLoggedin, setIsLoggedin, setUserStatus, setLoginType } = userContext; 
    const { showMessageModal, setShowMessageModal, message, setMessage } = modalContext
    const { timeoutId, setTimeoutId, language } = pageContext
    const router = useRouter()
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [inputData, setInputData] = useState({
        userEmail: "",
        password: "",
    })
    const [errorData, setErrorData] = useState({
        userEmailError: "",
        passwordError: ""
    })
    const handleOnclickShowPassword = () => {
       inputData.password.length > 0 && setPasswordVisibility(!passwordVisibility)
    }
    const onClickLogin = () => {
        handleLoginSubmit({inputData, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setShowResend, setLoadingLogin
        })}
    return (
        <>
            <EmailPasswordTitle titleType="email" />
            <div>
                <input className="inputField" type="text" name="userEmail" value={inputData.userEmail} onChange={(e) => onChangeAuth(e, {inputData, setInputData})} required/>
            </div>
            <div className="userEmail error"></div>
            <EmailPasswordTitle titleType="password" />
            <div> <input className="inputField" type={!passwordVisibility ? "password" : "text"}  name="password" value={inputData.password} onChange={(e) => onChangeAuth(e, {inputData, setInputData})} required/></div>
            <div>
            </div>
            <ShowPassword
            passwordVisibility={passwordVisibility}
            handleOnclickShowPassword={handleOnclickShowPassword} />
            <div className="text-center mt-3 py-4">
                {loadingLogin ? 
                <div className="mt-3 mb-2 sm:mt-3 sm:mb-2 mx-auto"><LoaderSmall /></div> : 
                <button className="buttonIndigoMiddleSecond" onClick={onClickLogin}>
                    <Language jp={`ログイン`} en={`Login`} />
                </button>}
            </div>            
        </>
    )
}

export default LoginForm
