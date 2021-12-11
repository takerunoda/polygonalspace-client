import { Dispatch, SetStateAction, useEffect } from 'react'

export const useSetBrowserLanguage = (
  setBrowserLanguage : Dispatch<SetStateAction<boolean>>
  ) => {
  //Reading the default language of the browser. it will be used to set a initial state of the website.
  useEffect(() => {
    const lang = window.navigator.language
    if(lang === "ja"){
      setBrowserLanguage(true)
    } else {
      setBrowserLanguage(false)
    }
  }, [])
}