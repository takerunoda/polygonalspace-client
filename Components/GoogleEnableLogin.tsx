import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import GoogleButton from './GoogleButton';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext';
import { handleGoogleSuccessEnableSignin } from '../utils/handleGoogleSuccessEnableSignin';

interface ComponentProps {
    setLoadingEnableGoogle: Dispatch<SetStateAction<boolean>>
}

const GoogleEnableLogin = ({setLoadingEnableGoogle} : ComponentProps) => {
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
    const {accessToken } = userContext; 
    const { showMessageModal, setShowMessageModal, setMessage } = modalContext
    const {timeoutId, setTimeoutId, } = pageContext
    const router = useRouter()
    const onSubmit = (res: any) => {
        handleGoogleSuccessEnableSignin(res, {router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingEnableGoogle, accessToken})        
    }

    return (<GoogleButton onSubmit={onSubmit} jp={`Googleログインを有効にする`} en={`Enable Sign-in with Google`} small={true}/>)
}

export default GoogleEnableLogin
