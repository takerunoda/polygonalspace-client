import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router';
import Language from './Language';
import HeadItem from './HeadItem';
import LoaderSmall from './LoaderSmall';
import BackToLogin from './BackToLogin';
import EmailPasswordTitle from './EmailPasswordTitle';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { onChangeAuth } from '../utils/onChangeAuth'
import { handleResendConfirmation } from '../utils/handleResendConfirmation';
import { useUserContext } from '../context/UserContext';
import ConfirmResendConfirmation from './ConfirmResendConfirmation';

const ResendConfirmation = ( ) => {
   const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
   const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
   const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const { setResendConfirmModalToggleConfirm } = modalContext
    const { loadingResend, setLoadingResend } = pageContext
    const { inputDataResend, setInputDataResend } = userContext
   const onClickResend = () => {
        setResendConfirmModalToggleConfirm(true)
    }

    return (<>
        <HeadItem
            imageUrl={""}
            title={"Resend Confirmation | 確認メールの再送信"}
            description={""}
            noIndex={true}
            defaultURL={true}
        />
    <ConfirmResendConfirmation />
    <div className="authOuter">
            <div className="authInner">
                <div className="mx-3">
                <h1 className="h3 flex justify-center text-indigo-500">
                    {/* <div className="text-indigo-500 text-3xl sm:text-4xl mr-2 sm:mr-3">
                    </div> */}
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
