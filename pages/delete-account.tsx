import React, { useState } from 'react'
import Language from '../Components/Language';
import HeadItem from '../Components/HeadItem';
import LoaderPage from '../Components/LoaderPage';
import LoaderSmall from '../Components/LoaderSmall';
import EmailPasswordTitle from '../Components/EmailPasswordTitle';
import WarningDeleteAccount from '../Components/WarningDeleteAccount';
import ConfirmModalDeleteAccountPassword from '../Components/ConfirmModalDeleteAccountPassword';
import { useUserContext } from '../context/UserContext';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { onChangeAuth } from '../utils/onChangeAuth';
import { AiOutlineUserDelete } from 'react-icons/ai';

const DeleteAccount = () => {
    const [inputData, setInputData] = useState({
        userEmail: "",
        password: ""
    })
    const [errorData, setErrorData] = useState({
        userEmailError: "",
        passwordError: ""
    })
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
    const {isLoggedin} = userContext     
    const { modalToggleConfirmDeleteAccount, 
            setModalToggleConfirmDeleteAccount} = modalContext
    const {loadingDeleteAccount} = pageContext

    return (
    isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Delete Account | アカウントの削除"}
            description={""}
            noIndex={true}
            defaultURL={true}
        />        
        {<div className="authOuter">
            {modalToggleConfirmDeleteAccount && <ConfirmModalDeleteAccountPassword 
                    loadingModal={loadingDeleteAccount}
                    modalToggleConfirm={modalToggleConfirmDeleteAccount}
                    setModalToggleConfirm={setModalToggleConfirmDeleteAccount}
                    translationKey={"deleteAccountPassword"}
                    inputData={inputData}
                    setErrorData={setErrorData} />}
            <h1 className="h1 flex justify-center">
                <div className="text-indigo-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                    <AiOutlineUserDelete />
                </div>
                <div className="pt-1">
                    <Language jp={`アカウントの削除`} en={`Delete Account`} />
                </div>
            </h1>
            <WarningDeleteAccount />
            <div className="authInner">
                <div className="text-base">
                    <Language jp={"削除するアカウントのメールアドレスとパスワードを入力してください。"} en={"To delete the account, type the email address and password to confirm."}/>
                </div>
                <EmailPasswordTitle titleType="email" />
                <div>
                    <input className="border border-gray-500 rounded text-base sm:text-lg w-full p-2" type="text" name="userEmail" value={inputData.userEmail} onChange={(e) => onChangeAuth(e, {inputData, setInputData})} required/>
                </div>
                <EmailPasswordTitle titleType="password" />
                <div><input className="inputField" type="password" name="password" value={inputData.password} onChange={(e) => onChangeAuth(e, {inputData, setInputData})} required/></div>
                <div className="text-center mt-10 py-4">
                {loadingDeleteAccount ? 
                <div className="mt-5 mx-auto"><LoaderSmall /></div> : 
                    <button className="buttonRedMiddleSecond" 
                        onClick={() => setModalToggleConfirmDeleteAccount(true)}>
                        <Language jp={`削除する`} en={`Delete`} />                                
                    </button>}
                </div>
            </div>
        </div>}
        </> : <LoaderPage />
    )
}

export default DeleteAccount