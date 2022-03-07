import React, { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext';
import GoogleButton from './GoogleButton';
import { handleGoogleSuccessSignup } from '../utils/handleGoogleSuccessSignup';

interface ComponentProps {
    setLoadingGoogleSignup: Dispatch<SetStateAction<boolean>>
}

const GoogleSignup = ({setLoadingGoogleSignup} : ComponentProps) => {
    const { userDispatch  } = useUserContext();
    const { handleMessageModal, } = useModalContext()
    const router = useRouter()
    const onSubmit = (res: any) => {
            handleGoogleSuccessSignup(res, {userDispatch, router, setLoadingGoogleSignup, handleMessageModal})
        }

    return (<GoogleButton 
                onSubmit={onSubmit} 
                jp={`Googleアカウントでユーザー登録`} 
                en={`Sign up with Google`}
                small={true}
                />)
            }

export default GoogleSignup
