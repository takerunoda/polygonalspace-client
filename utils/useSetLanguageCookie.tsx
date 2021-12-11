import { useEffect } from 'react'
import Cookies from 'js-cookie';

export const useSetLanguageCookie = (language: boolean) => {
  //setTimeout is set to make sure language state is properly set before setting a cookie.
  const languageForCookie = JSON.stringify(language)
  useEffect(() => {
      Cookies.set("language", languageForCookie)
  }, [language])
}