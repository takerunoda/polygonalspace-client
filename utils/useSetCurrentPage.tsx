import { useEffect } from 'react'
import Cookies from 'js-cookie';

export const useSetCurrentPage = (pathName : string) => {
    //setting current page to cookie except for login and signup page
  useEffect(() => {
   if(pathName === '/login' || pathName === '/signup') {
    } else {
      Cookies.set("prevePagePath", JSON.stringify(pathName), {sameSite: 'strict'});
   } 
  }, [pathName])
}