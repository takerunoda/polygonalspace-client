import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import GoogleButton from './GoogleButton';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext';
import { handleDeleteAccountGoogle } from '../utils/handleDeleteAccountGoogle';

interface ComponentProps {
                inputData: {
                    userEmail: string;
                    password: string;
                }
                setErrorData: Dispatch<SetStateAction<{
                    userEmailError: string;
                    passwordError: string;
                }>>
            }

const GoogleDeleteAccount = ({inputData, setErrorData} : ComponentProps) => {
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
    const {setUserEmail, setUserId, setAccessToken, setIsLoggedin, setUserStatus, setLoginType, accessToken } = userContext; 
    const { showMessageModal, setShowMessageModal, setMessage } = modalContext
    const {timeoutId, setTimeoutId, loadingDeleteAccount, setLoadingDeleteAccount} = pageContext
    const router = useRouter()
    const onSubmit = (res: any) => {
        handleDeleteAccountGoogle(res, {inputData, setErrorData, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, loadingDeleteAccount, setLoadingDeleteAccount, accessToken})}

    return (<GoogleButton 
                onSubmit={onSubmit} 
                jp={"アカウントを削除する"} 
                en={`Delete Account`} 
                small={true}/>)
            }

export default GoogleDeleteAccount
