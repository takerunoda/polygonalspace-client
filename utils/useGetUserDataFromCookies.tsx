import { Dispatch, SetStateAction, useEffect } from 'react'
import Cookies from 'js-cookie'

interface FunctionProps {
  setUserEmail: Dispatch<SetStateAction<string>>
  setUserId: Dispatch<SetStateAction<string>>
  setIsLoggedin: Dispatch<SetStateAction<boolean>>
}

export const useGetUserDataFromCookies = ({setIsLoggedin, setUserEmail, setUserId} : FunctionProps) => {
    //gets user data from cookies and sets to states.
    useEffect(() => {
      const isLoggedinFromCookie = () => {
        const x = (Cookies.get("isLoggedin"))
        if(!x){setIsLoggedin(false) } else {
          const y = JSON.parse(x)
          if(y == true){
            setIsLoggedin(true) 
          } else if (y == false){
            setIsLoggedin(false) 
          } else {
            setIsLoggedin(false) 
          }
        }
      }
      const userEmailFromCookie = () => {
        const x = Cookies.get("userEmail")
        x && setUserEmail((JSON.parse(x)))
      }
      const userIdFromCookie = () => {
        const x = Cookies.get("userId")
        x && setUserId(JSON.parse(x))
      }
          isLoggedinFromCookie()
          userEmailFromCookie()
          userIdFromCookie()
    }, [])
}