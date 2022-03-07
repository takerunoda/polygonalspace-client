import { useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import { useUserContext } from '../context/UserContext'

export const useGetUserDataFromCookies = () => {
  const {userDispatch} = useUserContext()
    const userDispatchRef = useRef(userDispatch)

    useEffect(() => {
      const isLoggedInCookiesData = Cookies.get("isLoggedin")
      const userEmailCookiesData = Cookies.get("userEmail")
      const userIdCookiesData = Cookies.get("userId")
      const isLoggedInCookies = isLoggedInCookiesData ? JSON.parse(isLoggedInCookiesData) : false
      const userEmailCookies = userEmailCookiesData ? JSON.parse(userEmailCookiesData) : ""
      const userIdCookies = userIdCookiesData ? JSON.parse(userIdCookiesData) : ""
      const userDispatchCurrent = userDispatchRef.current
        if(!isLoggedInCookies){
        userDispatchCurrent({type: "SET_VALUES_III", 
                      payload: {
                        userEmail: userEmailCookies,
                        userId: userIdCookies,
                        isLoggedin: false 
                      }
                    })
        } else {
          const y = JSON.parse(isLoggedInCookies)
          if(y == true){
        userDispatchCurrent({type: "SET_VALUES_III", 
                      payload: {
                        userEmail: userEmailCookies,
                        userId: userIdCookies,
                        isLoggedin: true 
                      }
                    })
          } else if (y == false){
        userDispatchCurrent({type: "SET_VALUES_III", 
                      payload: {
                        userEmail: userEmailCookies,
                        userId: userIdCookies,
                        isLoggedin: false 
                      }
                    })
          } else {
        userDispatchCurrent({type: "SET_VALUES_III", 
                      payload: {
                        userEmail: userEmailCookies,
                        userId: userIdCookies,
                        isLoggedin: false 
                      }
                    })
                  }
                }}, [])
              }