import React, { useState } from 'react'
import Language from '../Components/Language';
import LoaderPage from '../Components/LoaderPage';
import LoaderSmall from '../Components/LoaderSmall';
import EmailPasswordTitle from '../Components/EmailPasswordTitle';
import GoogleDeleteAccount from '../Components/GoogleDeleteAccount';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { onChangeAuth } from '../utils/onChangeAuth';
import HeadItem from '../Components/HeadItem';
import WarningDeleteAccount from '../Components/WarningDeleteAccount';

const DeleteAccountGoogle = () => {
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
            return null;
        }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }    
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const { isLoggedin } = userContext
    const { loadingDeleteAccount } = pageContext
            
    return (
    isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Delete Account | アカウントの削除"}
            description={""}
            noIndex={true}
            defaultURL={true}
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
                            inputData={inputData} setErrorData={setErrorData}/>}
                    </div>
                </div>
        </div>
        </> : <LoaderPage />
    )
}

export default DeleteAccountGoogle