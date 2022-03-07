import { useEffect, useRef } from 'react'
import { usePageContext } from '../context/PageContext';

export const useSetBrowserLanguage = () => {
  //Reading the default language of the browser. To set the initial state of the website.
  const {setBrowserLanguage} = usePageContext()
  const setBrowserLanguageRef = useRef(setBrowserLanguage);
  useEffect(() => {
    const setBrowserLanguageCurrent = setBrowserLanguageRef.current
    const lang = window.navigator.language
    if(lang === "ja"){
      setBrowserLanguageCurrent(true)
    } else {
      setBrowserLanguageCurrent(false)
    }
  }, [])
}