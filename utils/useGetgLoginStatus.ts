import { useEffect, useRef } from 'react'
import { useUserContext } from '../context/UserContext'
import { send_login_status } from './urls'
import { handleRequestAccessToken } from './handleRequestAccessToken'

export const useGetgLoginStatus = () => {
    const { userState: {accessToken},
            userDispatch,
            userDispatchII,
        } = useUserContext()            
        const userDispatchRef = useRef(userDispatch)
        const userDispatchIIRef = useRef(userDispatchII)

    useEffect(() => {
        const userDispatchCurrent = userDispatchRef.current
        const userDispatchIICurrent = userDispatchIIRef.current
        const getLoginStatus = async () => {
            const response = await handleRequestAccessToken({
                    urlName: send_login_status,
                    requestType: "POST",
                    inputData: null,
                    accessToken,})
            const data = await response.data
            if(data.ok === true) {
                const isPasswordLogin = data.passwordLogin
                const isGoogleLogin = data.googleLogin
                const loginTypeData = data.loginType
                const createdAtData = data.createdAt
                userDispatchCurrent({
                    type: "SET_VALUES_IV",
                    payload: {
                        loginType: loginTypeData
                    }})
                userDispatchIICurrent({
                    type: "SET_VALUES",
                    payload: {
                        passwordLogin: isPasswordLogin,
                        googleLogin: isGoogleLogin,
                        createdAt: createdAtData
                    }})
                }
            }
        getLoginStatus()
    }, [accessToken])
}
