import { Dispatch, FormEvent, SetStateAction } from 'react'

interface FunctionProps {
inputData: {
    userEmail: string;
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
}    
setInputData: Dispatch<SetStateAction<{
    userEmail: string;
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
}>>
}

export const onChangeAuthChangePassword = (e: FormEvent<HTMLInputElement>, {inputData, setInputData} : FunctionProps) => {
        setInputData({...inputData, [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value})
        // this is the same as following:
        //inputData[e.target.name] = e.target.value
    }
