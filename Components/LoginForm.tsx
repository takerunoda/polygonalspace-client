import React, { useState } from 'react'
import { usePageContext } from '../context/PageContext'
import { useFunctionsContext } from '../context/FunctionsContext'
import Language from './Language'
import LoaderSmall from './LoaderSmall'
import ShowPassword from './ShowPassword'
import EmailPasswordTitle from './EmailPasswordTitle'
import { onChangeAuth } from '../utils/onChangeAuth'

const LoginForm = () => {
    const [inputData, setInputData] = useState({
                userEmail: "",
                password: "",
            })
    const { handleLoginSubmitFn } = useFunctionsContext()
    const { loadingLogin, passwordVisibility, setPasswordVisibility, } = usePageContext()
    const handleOnclickShowPassword = () => {
       inputData.password.length > 0 && setPasswordVisibility(!passwordVisibility)
    }
    const onClickLogin = () => {
        handleLoginSubmitFn({inputData})
    }
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
            handleOnclickShowPassword={handleOnclickShowPassword} />
            <div className="text-center mt-3 py-4">
                {loadingLogin ? 
                <div className="mt-3 mb-2 sm:mt-3 sm:mb-2 mx-auto"><LoaderSmall /></div> : 
                <button className="buttonIndigoMiddleSecond" onClick={onClickLogin}>
                    <Language jp={`ログイン`} en={`Login`} />
                </button>}
            </div>            
        </>)}

export default LoginForm
