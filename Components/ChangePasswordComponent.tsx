import React, { useEffect, useState } from 'react'
import Language from './Language'
import Breadcrumb from './Breadcrumb'
import LoaderPage from './LoaderPage'
import LoaderSmall from './LoaderSmall'
import ShowPassword from './ShowPassword'
import EmailPasswordTitle from './EmailPasswordTitle'
import { onChangeAuthChangePassword } from '../utils/onChangeAuthChangePassword'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useFunctionsContext } from '../context/FunctionsContext'

const ChangePasswordComponent = () => {
    const { loadingChangePassword, passwordVisibility, setPasswordVisibility, } = usePageContext()
    const { userState:  { userEmail, isLoggedin } } = useUserContext();
    const { handleChangePasswordSubmitFn} = useFunctionsContext()
    const [inputData, setInputData] = useState({
        userEmail: userEmail,
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
    })
    
    const onClickChangePassword = () => {
        handleChangePasswordSubmitFn({ inputData })
    }
    const handleOnclickShowPassword = () => {
        (inputData.currentPassword.length > 0 || inputData.newPassword.length > 0 || inputData.newPasswordConfirmation.length > 0) && setPasswordVisibility(!passwordVisibility)
    }
  const breadcrumb_1 = null
  const breadcrumb_2 = { name: `パスワードの変更`, name_EN: `Change Password`, url: `/change-password`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
    {isLoggedin ?
    <div className="authOuter">
        <div className="authInner">
            <div className="px-3">
                <h1 className="h2  text-indigo-500">
                    <Language jp={`パスワードの変更`} en={`Change Password`} />
                </h1>
                <EmailPasswordTitle titleType="email" />
                <h2 className="text-sm sm:text-base bold text-purple-500 overflow-x-visible	text-center font-bold">
                    {userEmail}
                <input className="hidden" type="text" name="userEmail" value={inputData.userEmail}  required/>    
                </h2>
                <EmailPasswordTitle titleType="currentPassword" />
                <div><input className="inputField" type={!passwordVisibility ? "password" : "text"} name="currentPassword" value={inputData.currentPassword} onChange={(e) => onChangeAuthChangePassword(e, {inputData, setInputData})} required/></div>
                <EmailPasswordTitle titleType="newPassword" /> 
                <div><input className="inputField" type={!passwordVisibility ? "password" : "text"} name="newPassword" value={inputData.newPassword} onChange={(e) => onChangeAuthChangePassword(e, {inputData, setInputData})} required/></div>
                <EmailPasswordTitle titleType="newPasswordConfirm" />
                <div><input className="inputField" type={!passwordVisibility ? "password" : "text"} name="newPasswordConfirmation" value={inputData.newPasswordConfirmation} onChange={(e) => onChangeAuthChangePassword(e, {inputData, setInputData})} required/></div>
                <ShowPassword 
                handleOnclickShowPassword={handleOnclickShowPassword} />
                <div className="text-center mt-10 py-4">
                    {loadingChangePassword ? 
                    <div className="mt-5 mx-auto"><LoaderSmall /></div> : 
                    <button className="buttonGreenMiddleSecond" onClick={onClickChangePassword}>
                    <Language jp={`変更する`} en={`Update`} />
                    </button>}
                </div>
            </div>
        </div>
    </div> : <LoaderPage />}
    </>
  )
}

export default ChangePasswordComponent