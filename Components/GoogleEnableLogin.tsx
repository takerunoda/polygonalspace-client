import React from 'react'
import { useFunctionsContext } from '../context/FunctionsContext';
import GoogleButton from './GoogleButton';

const GoogleEnableLogin = () => {
    
    const { handleGoogleSuccessEnableSigninFn } = useFunctionsContext()
    const onSubmit = (res: any) => {
        handleGoogleSuccessEnableSigninFn(res)
    }

    return (<GoogleButton 
                onSubmit={onSubmit} 
                jp={`Googleログインを有効にする`} 
                en={`Enable Sign-in with Google`} 
                small={true}/>)
            }

export default GoogleEnableLogin
