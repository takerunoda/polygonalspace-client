import { Dispatch, SetStateAction, useEffect } from 'react'
import Cookies from 'js-cookie'

interface FunctionProps {
    browserLanguage: boolean
    setLanguage: Dispatch<SetStateAction<boolean>>    
}

export const useSetLanguage = ({browserLanguage, setLanguage} : FunctionProps) => {
  useEffect(() => {    
    const languageCookie = Cookies.get("language")
    const languageValue = languageCookie && JSON.parse(languageCookie)
    //for the first time a viewer visits the website, language Cookie has not been set yet, so it will be undefined if you try to ritrieve it.
    if(languageValue == undefined || languageValue == null){
      setLanguage(browserLanguage)
    }
  }, [browserLanguage])
}