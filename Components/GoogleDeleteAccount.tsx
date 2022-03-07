import React from 'react'
import { useFunctionsContext } from '../context/FunctionsContext';
import GoogleButton from './GoogleButton';

interface ComponentProps {
                inputData: {
                    userEmail: string;
                    password: string }}

const GoogleDeleteAccount = ({inputData} : ComponentProps) => {
    const { handleDeleteAccountGoogleFn } = useFunctionsContext()
    const onSubmit = (res: any) => {
        handleDeleteAccountGoogleFn(res, {inputData})}

    return (<GoogleButton 
                onSubmit={onSubmit} 
                jp={"アカウントを削除する"} 
                en={`Delete Account`} 
                small={true}/>)
            }

export default GoogleDeleteAccount
