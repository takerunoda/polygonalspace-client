import React from 'react'
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import BackToLogin from './BackToLogin';
import EmailPasswordTitle from './EmailPasswordTitle';
import ConfirmResendConfirmation from './ConfirmResendConfirmation';
import { onChangeAuth } from '../utils/onChangeAuth'

const ResendConfirmation = () => {
    const { setResendConfirmModalToggleConfirm } = useModalContext()
    const { loadingResend } = usePageContext()
    const { inputDataResend, setInputDataResend } = useUserContext()
    const onClickResend = () => setResendConfirmModalToggleConfirm(true)
    const breadcrumb_1 = null
    const breadcrumb_2 = { 
        name: `Resend Confirmation Email`, 
        name_EN: `Resend Confirmation Email`,
        url: `/resend-confirmation`}
    

    return (<>
            <Breadcrumb
                breadcrumb_1={breadcrumb_1}
                breadcrumb_2={breadcrumb_2}            
            />
    <ConfirmResendConfirmation />
    <div className="authOuter">
            <div className="authInner">
                <div className="mx-3">
                <h1 className="h3 flex justify-center text-indigo-500">
                    <Language jp={"確認メールを再送信する"} en={"Resend Confirmation Email"}/>
                </h1>
                <EmailPasswordTitle titleType="email" />
                <div>
                     <input className="inputField" type="text" name="userEmail" value={inputDataResend.userEmail} onChange={(e) => onChangeAuth(e, {
                        inputData: inputDataResend, setInputData: setInputDataResend
                        })} required/>
                </div>
                <div className="text-center mt-10 py-4">
                    {loadingResend ? 
                    <div className="mt-5 mx-auto"><LoaderSmall /></div> : 
                    <button className="buttonIndigoMiddleSecond" onClick={onClickResend}>
                        <Language jp={"再送信"} en={"Resend"}/>
                    </button>}
                </div>
                <div className="mt-5">
                    <BackToLogin />
                </div>
                </div>
            </div>
        </div>    
    </>)
}

export default ResendConfirmation
