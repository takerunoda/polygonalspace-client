import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { usePageContext } from '../context/PageContext';

export const useSetLanguageCookie = () => {
  const {language} = usePageContext()
  //setTimeout is set to make sure language state is properly set before setting a cookie.
  useEffect(() => {
    const languageForCookie = JSON.stringify(language)
      Cookies.set("language", languageForCookie)
  }, [language])
}