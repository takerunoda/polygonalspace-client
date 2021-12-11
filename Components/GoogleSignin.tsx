import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext';
import { handleGoogleSuccessLogin } from '../utils/handleGoogleSuccessLogin';
import GoogleButton from './GoogleButton';

interface ComponentProps {
    setLoadingGoogleLogin: Dispatch<SetStateAction<boolean>>
}

const GoogleSignin = ({setLoadingGoogleLogin} : ComponentProps) => {
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
    const {setUserEmail, setUserId, setAccessToken, setIsLoggedin, setUserStatus, setLoginType } = userContext; 
    const { showMessageModal, setShowMessageModal, setMessage } = modalContext
    const { timeoutId, setTimeoutId } = pageContext
    const router = useRouter()
    const onSubmit = (res: any) => {
        handleGoogleSuccessLogin(res, {setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingGoogleLogin})
    }

    return (<GoogleButton
                onSubmit={onSubmit} 
                jp={`Googleアカウントでログイン`} 
                en={`Sign in with Google`}
                small={true}
                 />)
            }

export default GoogleSignin
