import React from 'react'
import Language from '../Components/Language';
import HeadItem from '../Components/HeadItem';
import LoaderPage from '../Components/LoaderPage';
import LoaderSmall from '../Components/LoaderSmall';
import BackToLogin from '../Components/BackToLogin';
import EmailPasswordTitle from '../Components/EmailPasswordTitle';
import ConfirmRequestPasswordReset from '../Components/ConfirmRequestPasswordReset';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext';
import { onChangeAuth } from '../utils/onChangeAuth';
import { useRedirectToHomeLoggedin } from '../utils/useRedirectToHome';

const requestPasswordReset = () => {
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
        return null;
    }
   
    const {isLoggedin, inputDataRequestPasswordReset, setInputDataRequestPasswordReset } = userContext;
   
    const { setModalToggleConfirmRequestPasswordReset } = modalContext

    const { loadingResetPassword } = pageContext
    
    const onClickRequestPasswordReset = () => {
        setModalToggleConfirmRequestPasswordReset(true)
    }
    
   useRedirectToHomeLoggedin(isLoggedin)

    return (
    !isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Request Password Reset | パスワード再設定のリクエスト"}
            description={""}
            noIndex={true}
            defaultURL={true}
        />
        <ConfirmRequestPasswordReset />                
        {<div className="authOuter">
            <div className="authInner">
                <div className="px-3">
                <h1 className="h3 flex justify-center text-indigo-500">
                    <div className="text-blue-500 text-3xl sm:text-4xl mr-2 sm:mr-3">
                    </div>
                    <Language jp={"パスワードの再設定"} en={"Reset Password"}/>
                </h1>
                <EmailPasswordTitle titleType="email" />
                <div>
                    <input className="border border-gray-500 rounded text-base sm:text-lg w-full p-2  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="text" name="userEmail" value={inputDataRequestPasswordReset.userEmail} onChange={(e) => onChangeAuth(e, {inputData: inputDataRequestPasswordReset, setInputData: setInputDataRequestPasswordReset})} required/>
                </div>
                <div className="text-center mt-10 py-4">
                    {loadingResetPassword ? 
                    <div className="mt-4 sm:mt-5 mx-auto"><LoaderSmall /></div> : 
                    <button className="bg-indigo-500 hover:bg-blue-400 text-white w-40 xs:w-48  p-4 rounded focus:outline-none cursor-pointer text-base sm:text-xl" onClick={onClickRequestPasswordReset}>
                        <Language jp={"リクエストする"} en={"Request"}/>
                    </button>}
                    <div className="backOptions">
                        <BackToLogin />
                    </div>
                </div>
                </div>
            </div>
        </div>}
        </> : <LoaderPage />
    )
}

export default requestPasswordReset
