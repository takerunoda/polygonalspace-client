import { Dispatch, SetStateAction } from 'react'
import { BookmarkItemInterface } from '../Interfaces'
import { logoutURL } from './urls';
import { handleRequest } from './handleRequest'

interface FunctionProps {
                setUserEmail: Dispatch<SetStateAction<string>>
                setAccessToken: Dispatch<SetStateAction<string>>
                setUserId: Dispatch<SetStateAction<string>>
                setIsLoggedin: Dispatch<SetStateAction<boolean>>
                setUserStatus: Dispatch<SetStateAction<string>>
                setLoginType: Dispatch<SetStateAction<string>>
                setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
              }

  export const logout = async ({setUserEmail, setAccessToken, setUserId, setIsLoggedin, setUserStatus, setLoginType, setUserBookmark
  } : FunctionProps) => {
         setUserEmail("")
         setAccessToken("")
         setUserId("")
         setIsLoggedin(false)
         setUserStatus("")
         setLoginType("")
         setUserBookmark([])
    const response = await handleRequest({
            urlData: logoutURL,
            requestType: "POST",
            inputData: null,})
      return
  }   
