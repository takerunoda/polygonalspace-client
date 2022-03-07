import React from 'react'
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext';
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import BackToLogin from './BackToLogin';
import EmailPasswordTitle from './EmailPasswordTitle';
import ConfirmRequestPasswordReset from './ConfirmRequestPasswordReset';
import { onChangeAuth } from '../utils/onChangeAuth';

const RequestRasswordResetComponent = () => {
    const { inputDataRequestPasswordReset, setInputDataRequestPasswordReset } = useUserContext()
    const { setModalToggleConfirmRequestPasswordReset } = useModalContext()
    const { loadingResetPassword } = usePageContext()
    const onClickRequestPasswordReset = () => setModalToggleConfirmRequestPasswordReset(true)
    const breadcrumb_1 = null
    const breadcrumb_2 = { 
        name: `パスワードの再設定`, 
        name_EN: `Reset Password`,
        url: `/request-password-reset`}

  return (
    <>
        <ConfirmRequestPasswordReset />
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
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
    </>
  )
}

export default RequestRasswordResetComponent