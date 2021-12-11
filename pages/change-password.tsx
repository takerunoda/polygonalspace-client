import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import Language from '../Components/Language'
import LoaderPage from '../Components/LoaderPage'
import LoaderSmall from '../Components/LoaderSmall'
import ShowPassword from '../Components/ShowPassword'
import EmailPasswordTitle from '../Components/EmailPasswordTitle'
import { handleChangePasswordSubmit } from '../utils/handleChangePasswordSubmit'
import { onChangeAuthChangePassword } from '../utils/onChangeAuthChangePassword'
import HeadItem from '../Components/HeadItem'

const changePassword = () => {
    const [loadingChangePassword, setLoadingChangePassword] = useState(false)
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
    const { userEmail, setUserEmail, 
            isLoggedin, 
            setIsLoggedin, 
            accessToken } = userContext;
    const { showMessageModal, 
            setShowMessageModal, 
            setMessage } = modalContext
    const { timeoutId, 
            setTimeoutId } = pageContext
    const [inputData, setInputData] = useState({
        userEmail: userEmail,
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
    })
    const [errorData, setErrorData] = useState({
        userEmailError: "",
        passwordError: ""
    })
    const [showResend, setShowResend] = useState(false)
    const router = useRouter()
    const onClickChangePassword = () => {
        handleChangePasswordSubmit({inputData, setUserEmail, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingChangePassword, setShowResend, accessToken})
    }
    useEffect(() => {
        setInputData({...inputData, userEmail: userEmail})
    }, [userEmail])
    const handleOnclickShowPassword = () => {
        (inputData.currentPassword.length > 0 || inputData.newPassword.length > 0 || inputData.newPasswordConfirmation.length > 0) && setPasswordVisibility(!passwordVisibility)
    }

return (<>
    <HeadItem
        imageUrl={""}
        title={"Change Password | パスワードの変更"}
        description={""}
        noIndex={true}
        defaultURL={true}
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
                passwordVisibility={passwordVisibility}
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
    </>)
    }

export default changePassword