import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { ChildrenProps, ImageInterface } from "../Interfaces";
import { initialLanuageFn } from "../utils/initialLanuageFn";

type PageContextType = {
  image: ImageInterface | undefined | null
  setImage: Dispatch<SetStateAction<ImageInterface | null | undefined>>
  language: boolean
  setLanguage: Dispatch<SetStateAction<boolean>>
  browserLanguage: boolean
  setBrowserLanguage: Dispatch<SetStateAction<boolean>>
  loadingSubmitSearch: boolean
  setLoadingSubmitSearch: Dispatch<SetStateAction<boolean>>
  loadingClickBookmark: boolean
  setLoadingClickBookmark: Dispatch<SetStateAction<boolean>>
  loadingDeleteBookmark: boolean
  setLoadingDeleteBookmark: Dispatch<SetStateAction<boolean>>
  loadingDeleteAccount: boolean
  setLoadingDeleteAccount: Dispatch<SetStateAction<boolean>>
  loadingResetPassword: boolean
  setLoadingResetPassword: Dispatch<SetStateAction<boolean>>
  loadingResend: boolean
  setLoadingResend: Dispatch<SetStateAction<boolean>>
  loadingLogin: boolean
  setLoadingLogin: Dispatch<SetStateAction<boolean>>
  loadingResetToken: boolean
  setLoadingResetToken: Dispatch<SetStateAction<boolean>>
  loadingChangePassword: boolean
  setLoadingChangePassword: Dispatch<SetStateAction<boolean>>
  loadingEnableGoogle: boolean
  setLoadingEnableGoogle: Dispatch<SetStateAction<boolean>>
  loadingEnablePassword: boolean
  setLoadingEnablePassword: Dispatch<SetStateAction<boolean>>
  loadingGuestLogin: boolean
  setLoadingGuestLogin: Dispatch<SetStateAction<boolean>>
  loadingSignup: boolean
  setLoadingSignup: Dispatch<SetStateAction<boolean>>
  passwordVisibility: boolean
  setPasswordVisibility: Dispatch<SetStateAction<boolean>>
  pathName: string
  setPathName: Dispatch<SetStateAction<string>>
  spMenuState: boolean
  setSpMenuState: Dispatch<SetStateAction<boolean>>
  width: number
  setWidth: Dispatch<SetStateAction<number>>
}
const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageWrapper({ children } : ChildrenProps ) {
  const [image, setImage] = useState<ImageInterface | undefined | null>();  
  const [loadingSubmitSearch, setLoadingSubmitSearch] = useState<boolean>(false)
  const [loadingClickBookmark, setLoadingClickBookmark] = useState<boolean>(false)
  const [loadingDeleteBookmark, setLoadingDeleteBookmark] = useState<boolean>(false)  
  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState<boolean>(false)
  const [loadingResetPassword, setLoadingResetPassword] = useState<boolean>(false)  
  const [loadingResend, setLoadingResend] = useState<boolean>(false)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loadingResetToken, setLoadingResetToken] = useState(false)
  const [loadingChangePassword, setLoadingChangePassword] = useState(false)
  const [loadingEnableGoogle, setLoadingEnableGoogle] = useState(false)
  const [loadingEnablePassword, setLoadingEnablePassword] = useState(false)  
  const [loadingGuestLogin, setLoadingGuestLogin] = useState(false)  
  const [loadingSignup, setLoadingSignup] = useState<boolean>(false) 
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [browserLanguage, setBrowserLanguage] = useState<boolean>(false)
  const [language, setLanguage] = useState<boolean>(initialLanuageFn());  
  const [pathName, setPathName] = useState<string>("")  
  const [spMenuState, setSpMenuState] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(0)

  const pageValue = useMemo(() => ({
        image, setImage, 
        language, setLanguage,
        browserLanguage, setBrowserLanguage,
        loadingSubmitSearch, setLoadingSubmitSearch,
        loadingClickBookmark, setLoadingClickBookmark,
        loadingDeleteBookmark, setLoadingDeleteBookmark,
        loadingDeleteAccount, setLoadingDeleteAccount,
        loadingResetPassword, setLoadingResetPassword,
        loadingResend, setLoadingResend,
        loadingLogin, setLoadingLogin,
        loadingResetToken, setLoadingResetToken,
        loadingChangePassword, setLoadingChangePassword,
        loadingEnableGoogle, setLoadingEnableGoogle,
        loadingEnablePassword, setLoadingEnablePassword,
        loadingGuestLogin, setLoadingGuestLogin,
        loadingSignup, setLoadingSignup,
        passwordVisibility, setPasswordVisibility,
        pathName, setPathName,
        spMenuState, setSpMenuState,
        width, setWidth
    }), [
        image, setImage, 
        language, setLanguage,
        browserLanguage, setBrowserLanguage,
        loadingSubmitSearch, setLoadingSubmitSearch,
        loadingClickBookmark, setLoadingClickBookmark,
        loadingDeleteBookmark, setLoadingDeleteBookmark,
        loadingDeleteAccount, setLoadingDeleteAccount,
        loadingResetPassword, setLoadingResetPassword,
        loadingResend, setLoadingResend,
        loadingLogin, setLoadingLogin,
        loadingResetToken, setLoadingResetToken,
        loadingChangePassword, setLoadingChangePassword,
        loadingEnableGoogle, setLoadingEnableGoogle,
        loadingEnablePassword, setLoadingEnablePassword,
        loadingGuestLogin, setLoadingGuestLogin,
        loadingSignup, setLoadingSignup,
        passwordVisibility, setPasswordVisibility,
        pathName, setPathName,
        spMenuState, setSpMenuState,
        width, setWidth
    ])

  return (
    <PageContext.Provider value={pageValue}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
    const context = useContext(PageContext)
        if (context === undefined) {
            throw new Error('useContext(PageContext) is undefined')
        }
        return context
}
