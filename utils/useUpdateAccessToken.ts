import { useEffect, useRef } from 'react'
import { useUserContext } from '../context/UserContext';
import { getAccessToken } from './tokens';

export const useUpdateAccessToken = () => {
  const { userState: {accessToken, isLoggedin}, 
          userDispatch } = useUserContext()   
      const userDispatchRef = useRef(userDispatch)
    useEffect(() => {
      const userDispatchCurrent = userDispatchRef.current
      const fn = async () => {
      const x = await getAccessToken()
      const response = !x ? "" : x
      userDispatchCurrent({type: "SET_VALUES_II", 
                    payload: {
                      accessToken: response.accessToken,
                      userStatus: response.userStatus,
                      loginType: response.loginType 
                    }
                  })
    }
     isLoggedin == true && fn()
    }, [isLoggedin])

    useEffect(() => {
      const userDispatchCurrent = userDispatchRef.current
      const fn = async () => {
      const x = await getAccessToken()
      const response = !x ? "" : x
      userDispatchCurrent({type: "SET_VALUES_II", 
                    payload: {
                      accessToken: response.accessToken,
                      userStatus: response.userStatus,
                      loginType: response.loginType 
                    }
                  })
    }
    if(isLoggedin == true){
      if(!accessToken || accessToken == null || accessToken == undefined || accessToken === "") {fn()}
    }
    }, [accessToken, isLoggedin])
}