import Cookies from 'js-cookie'
  //** */initial value of lanuguage state.
  //1. retrieved from cookie if available.
  //2. retrieved from browserLanguage if available.
  //3. otherwise set true (Japanese)
  export const initialLanuageFn = () => {  
    const languageCookie = Cookies.get("language")
    const languageValue: boolean | undefined = languageCookie ?  JSON.parse(languageCookie) : undefined
    
    let lang
    if (typeof window !== "undefined") {
      lang = window.navigator.language
    }

    let browserLanguage

    if(lang === "ja"){
      browserLanguage = true
    } else {
      browserLanguage = false
    }

    let initialLanguage: boolean 
    
      if(typeof languageValue === "boolean"){
        initialLanguage = languageValue
      } else if (typeof browserLanguage === "boolean") {
        initialLanguage = browserLanguage
      } 
      else {
        initialLanguage = false
      }
      
    return initialLanguage
  }
