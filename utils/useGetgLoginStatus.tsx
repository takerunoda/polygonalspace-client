import { Dispatch, SetStateAction, useEffect } from 'react'
import { send_login_status } from './urls'
import { handleRequestAccessToken } from './handleRequestAccessToken'

interface FunctionProps {
    setPasswordLogin: Dispatch<SetStateAction<boolean | undefined>>
    setGoogleLogin: Dispatch<SetStateAction<boolean | undefined>>
    setLoginType: Dispatch<SetStateAction<string>>    
    setCreatedAt: Dispatch<SetStateAction<Date | undefined>>
    accessToken: string
}

export const useGetgLoginStatus = (
    {setPasswordLogin, setGoogleLogin, setLoginType, setCreatedAt, accessToken} : FunctionProps) => {
    useEffect(() => {
        const getLoginStatus = async () => {
            const response = await handleRequestAccessToken({
                    urlData: send_login_status,
                    requestType: "POST",
                    inputData: null,
                    accessToken: accessToken,})


        const data = await response.data
        if(data.ok === true) {
            const isPasswordLogin = data.passwordLogin
            const isGoogleLogin = data.googleLogin
            const loginTypeData = data.loginType
            const createdAtData = data.createdAt
            setPasswordLogin(isPasswordLogin)
            setGoogleLogin(isGoogleLogin)
            setLoginType(loginTypeData)
            setCreatedAt(createdAtData)
        }
        }
        getLoginStatus()
    }, [])
}
