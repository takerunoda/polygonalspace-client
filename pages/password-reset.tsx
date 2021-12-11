import { useState } from 'react';
import { useRouter } from 'next/router';
import Language from '../Components/Language';
import HeadItem from '../Components/HeadItem';
import LoaderSmall from '../Components/LoaderSmall';
import EmailPasswordTitle from '../Components/EmailPasswordTitle';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { handlePasswordResetSubmit } from '../utils/handlePasswordResetSubmit';
import { onChangeAuthPasswordReset } from '../utils/onChangeAuthPasswordReset';

const PasswordReset = () => {
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userEmail = urlParams.get('email') ?? ""
const passwordResetToken = urlParams.get('token') ?? ""

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
            setIsLoggedin, 
            setAccessToken, 
            setUserId, 
            setUserStatus, 
            setLoginType,
         } = userContext;
    const { showMessageModal, 
            setShowMessageModal, 
            message,
            setMessage } = modalContext
    const { timeoutId, 
            setTimeoutId, 
            loading, 
            setLoading } = pageContext
    const [loadingResetToken, setLoadingResetToken] = useState(false)
    const [inputData, setInputData] = useState({
            userEmail: userEmail,
            password: "",
            passwordConfirmation: "",
            passwordResetToken: passwordResetToken,
    })
    const [errorData, setErrorData] = useState({
        userEmailError: "",
        passwordError: ""
    })
    const router = useRouter()
    const onClickPasswordReset = () => {
        handlePasswordResetSubmit({inputData, setAccessToken, setUserId, setUserStatus, setLoginType, setUserEmail, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, loading, setLoadingResetToken})
    }

return (<>
        <HeadItem
            imageUrl={""}
            title={"Update Password | パスワードの再設定"}
            description={""}
            noIndex={true}
            defaultURL={true}
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
</>)
}
export default PasswordReset
