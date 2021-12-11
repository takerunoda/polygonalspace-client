import { Dispatch, SetStateAction, useEffect } from 'react'
import { getAccessToken } from './tokens';

interface FunctionProps {
  accessToken: string
  setAccessToken: Dispatch<SetStateAction<string>>
  isLoggedin: boolean
  userStatus: string
  setUserStatus: Dispatch<SetStateAction<string>>
  loginType: string
  setLoginType: Dispatch<SetStateAction<string>>
}

export const useUpdateAccessToken = ({accessToken, setAccessToken, isLoggedin, userStatus, setUserStatus, loginType, setLoginType
} : FunctionProps) => {
  //if isLoggedin is true, sets accesstoken when page is load or when accesstoken is updated.
    useEffect(() => {
      const fn = async () => {
      const x = await getAccessToken()
      const response = !x ? "" : x
      setAccessToken(response.accessToken)
      setUserStatus(response.userStatus)
      setLoginType(response.loginType)
    }
     isLoggedin == true && fn()
    }, [])

    useEffect(() => {
      const fn = async () => {
      const x = await getAccessToken()
      const response = !x ? "" : x
      setAccessToken(response.accessToken)
      setUserStatus(response.userStatus)
      setLoginType(response.loginType)
    }
    if(isLoggedin == true){
      if(!accessToken || accessToken == null || accessToken == undefined || accessToken === "") {fn()}
    }
    }, [accessToken, isLoggedin])
}