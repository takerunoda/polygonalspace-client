import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import GoogleButton from './GoogleButton';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext';
import { handleGoogleSuccessSignup } from '../utils/handleGoogleSuccessSignup';

interface ComponentProps {
    setLoadingGoogleSignup: Dispatch<SetStateAction<boolean>>
}

const GoogleSignup = ({setLoadingGoogleSignup} : ComponentProps) => {
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
    const { setUserEmail, 
            setIsLoggedin, 
            setAccessToken, 
            setUserId, 
            setUserStatus, 
            setLoginType  } = userContext;
    const { showMessageModal, 
            setShowMessageModal, 
            message,
            setMessage } = modalContext
    const { timeoutId, setTimeoutId } = pageContext
    const router = useRouter()
    const onSubmit = (res: any) => {
            handleGoogleSuccessSignup(res, {setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingGoogleSignup})
        }

    return (<GoogleButton 
                onSubmit={onSubmit} 
                jp={`Googleアカウントでユーザー登録`} 
                en={`Sign up with Google`}
                small={true}
                />)
            }

export default GoogleSignup
