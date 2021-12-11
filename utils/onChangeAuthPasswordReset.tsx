import { Dispatch, FormEvent, SetStateAction } from 'react'

interface FunctionProps {
inputData: {
    userEmail: string;
    password: string,
    passwordConfirmation: string,
    passwordResetToken: string,
}    
setInputData: Dispatch<SetStateAction<{
    userEmail: string;
    password: string,
    passwordConfirmation: string,
    passwordResetToken: string,
}>>
}

export const onChangeAuthPasswordReset = (e: FormEvent<HTMLInputElement>, {inputData, setInputData} : FunctionProps) => {
        setInputData({...inputData, [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value})
        // this is the same as following:
        //inputData[e.target.name] = e.target.value
    }
