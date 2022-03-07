import React, { useState } from 'react'
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall';
import EmailPasswordTitle from './EmailPasswordTitle';
import GoogleDeleteAccount from './GoogleDeleteAccount';
import WarningDeleteAccount from './WarningDeleteAccount';
import { onChangeAuth } from '../utils/onChangeAuth';
import { usePageContext } from '../context/PageContext';

const DeleteAccountGoogleComponent = () => {
    const [inputData, setInputData] = useState({
        userEmail: "",
        password: ""
    })
    const { loadingDeleteAccount } = usePageContext()
    const breadcrumb_1 = null
    const breadcrumb_2 = { name: `アカウントの削除`, name_EN: `Delete Account`, url: `/delete-account-google`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="authOuter">
        {/* if user state is neither null nor undefined, display items here based on the bookmark array*/}
                <h1 className="text-xl sm:text-3xl font-bold mt-8 sm:mt-16 text-center flex justify-center">
                    <div className="pt-1">
                    <Language jp={`アカウントの削除`} en={`Delete Account`} />
                    </div>
                </h1>
                <WarningDeleteAccount />
                <div className="authInner">
                    <EmailPasswordTitle titleType="emailDeleteAccount" />
                    <div>
                        <input className="border border-gray-500 rounded text-base sm:text-lg w-full p-2" type="text" name="userEmail" value={inputData.userEmail} onChange={(e) => onChangeAuth(e, {inputData, setInputData})} required/>
                    </div>
                    <div className="text-center py-4">
                    {loadingDeleteAccount ? 
                        <div className="mt-2 mb-3">
                            <LoaderSmall />
                        </div> :
                        <GoogleDeleteAccount 
                            inputData={inputData} />}
                    </div>
                </div>
        </div>    
    </>
  )
}

export default DeleteAccountGoogleComponent