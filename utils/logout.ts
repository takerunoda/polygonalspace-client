import { Dispatch, SetStateAction } from 'react'
import { BookmarkItemInterface } from '../Interfaces'
import { logoutURL } from './urls';
import { handleRequest } from './handleRequest'

interface FunctionProps {
                userDispatch: Dispatch<any>
                setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
              }

  export const logout = async ({  userDispatch, 
                                  setUserBookmark} : FunctionProps) => {
        userDispatch({type: "NULL"})
         setUserBookmark([])
    const response = await handleRequest({
            urlName: logoutURL,
            requestType: "POST",
            inputData: null,})
      return
  }   
