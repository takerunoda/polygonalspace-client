import React from 'react'
import { useFunctionsContext } from '../context/FunctionsContext';
import GoogleButton from './GoogleButton';

const GoogleSignin = () => {
    const { handleGoogleSuccessLoginFn, } = useFunctionsContext()
    const onSubmit = (res: any) => {
        handleGoogleSuccessLoginFn(res)
    }

    return (<GoogleButton
                onSubmit={onSubmit} 
                jp={`Googleアカウントでログイン`} 
                en={`Sign in with Google`}
                small={true}
                 />)
            }

export default GoogleSignin
