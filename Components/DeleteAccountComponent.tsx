import React, { useState } from 'react'
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import EmailPasswordTitle from './EmailPasswordTitle';
import WarningDeleteAccount from './WarningDeleteAccount';
import ConfirmModalDeleteAccountPassword from './ConfirmModalDeleteAccountPassword';
import { onChangeAuth } from '../utils/onChangeAuth';
import { AiOutlineUserDelete } from 'react-icons/ai';

const DeleteAccountComponent = () => {
    const [inputData, setInputData] = useState({
        userEmail: "",
        password: ""
    })
    const { modalToggleConfirmDeleteAccount, 
            setModalToggleConfirmDeleteAccount} = useModalContext()
    const {loadingDeleteAccount} = usePageContext()
  const breadcrumb_1 = null
  const breadcrumb_2 = { name: `アカウントの削除`, name_EN: `Delete Account`, url: `/delete-account`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        {<div className="authOuter">
            {modalToggleConfirmDeleteAccount && <ConfirmModalDeleteAccountPassword 
                    inputData={inputData} />}
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
    </>
  )
}

export default DeleteAccountComponent