import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { useRouter } from 'next/router'
import { ChildrenProps, ImageInterface } from "../Interfaces";
import { useSetPathName } from "../utils/useSetPathName";
import { initialLanuageFn } from "../utils/initialLanuageFn";
import { useSetCurrentPage } from "../utils/useSetCurrentPage";
import { useSetSpMenuState } from "../utils/useSetSpMenuState";
import { useSetLanguageCookie } from "../utils/useSetLanguageCookie";
import { useSetBrowserLanguage } from "../utils/useSetBrowserLanguage";
import { useCancelOverflowHidden } from "../utils/useCancelOverflowHidden";

type PageContextType = {
  image: ImageInterface | undefined | null
  setImage: Dispatch<SetStateAction<ImageInterface | null | undefined>>
  language: boolean
  setLanguage: Dispatch<SetStateAction<boolean>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  loadingSearchResults: boolean
  setLoadingSearchResults: Dispatch<SetStateAction<boolean>>
  loadingClickBookmark: boolean
  setLoadingClickBookmark: Dispatch<SetStateAction<boolean>>
  loadingMyBookmarkModal: boolean
  setLoadingMyBookmarkModal: Dispatch<SetStateAction<boolean>>
  loadingDeleteBookmark: boolean
  setLoadingDeleteBookmark: Dispatch<SetStateAction<boolean>>
  loadingPostModal: boolean
  setLoadingPostModal: Dispatch<SetStateAction<boolean>>
  loadingAddPost: boolean
  setLoadingAddPost: Dispatch<SetStateAction<boolean>>
  loadingDeleteAccount: boolean
  setLoadingDeleteAccount: Dispatch<SetStateAction<boolean>>
  loadingSignup: boolean
  setLoadingSignup: Dispatch<SetStateAction<boolean>>
  loadingResetPassword: boolean
  setLoadingResetPassword: Dispatch<SetStateAction<boolean>>
  loadingResend: boolean
  setLoadingResend: Dispatch<SetStateAction<boolean>>
  timeoutId: NodeJS.Timeout | undefined | null
  setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
  pathName: string
  setPathName: Dispatch<SetStateAction<string>>
  spMenuState: boolean
  setSpMenuState: Dispatch<SetStateAction<boolean>>
  postsPerPage: number
  setPostsPerPage: Dispatch<SetStateAction<number>>
  postsPerPageNASA: number
  setPostsPerPageNASA: Dispatch<SetStateAction<number>>

}
const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageWrapper({ children } : ChildrenProps ) {
  const [image, setImage] = useState<ImageInterface | undefined | null>();
  
  const [loading, setLoading] = useState<boolean>(false)

  const [loadingSearchResults, setLoadingSearchResults] = useState<boolean>(false)
  
  const [loadingClickBookmark, setLoadingClickBookmark] = useState<boolean>(false)

  const [loadingMyBookmarkModal, setLoadingMyBookmarkModal] = useState<boolean>(false)

  const [loadingDeleteBookmark, setLoadingDeleteBookmark] = useState(false)
  
  const [loadingPostModal, setLoadingPostModal] = useState<boolean>(false)

  const [loadingAddPost, setLoadingAddPost] = useState<boolean>(false)

  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState<boolean>(false)

  const [loadingSignup, setLoadingSignup] = useState(false)
  
  const [loadingResetPassword, setLoadingResetPassword] = useState(false)
  
  const [loadingResend, setLoadingResend] = useState(false)

  const [postsPerPage, setPostsPerPage] = useState(12);
    
  const [postsPerPageNASA, setPostsPerPageNASA] = useState(12);

  //Browser Language is the default language of the viewer. it will be set as a state

  const [browserLanguage, setBrowserLanguage] = useState<boolean>(false)
  //Language state will be used throuout the process. initial value depends on the Browser language.
  const [language, setLanguage] = useState<boolean>(initialLanuageFn());
  
  const [pathName, setPathName] = useState<string>("")
  
  const [spMenuState, setSpMenuState] = useState<boolean>(false)
  
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined | null>()
  
  const router = useRouter()
  
  const pageValue = useMemo(() => ({
        image, setImage, 
        language, setLanguage,
        loading, setLoading,
        loadingSearchResults, setLoadingSearchResults,
        loadingClickBookmark, setLoadingClickBookmark,
        loadingMyBookmarkModal, setLoadingMyBookmarkModal,
        loadingDeleteBookmark, setLoadingDeleteBookmark,
        loadingPostModal, setLoadingPostModal,
        loadingAddPost, setLoadingAddPost,
        loadingDeleteAccount, setLoadingDeleteAccount,
        loadingSignup, setLoadingSignup,
        loadingResetPassword, setLoadingResetPassword,
        loadingResend, setLoadingResend,
        pathName, setPathName,
        spMenuState, setSpMenuState,
        timeoutId, setTimeoutId,
        postsPerPage, setPostsPerPage,         
        postsPerPageNASA, setPostsPerPageNASA,
    }), [
        image, setImage, 
        language, setLanguage,
        loading, setLoading,
        loadingSearchResults, setLoadingSearchResults,
        loadingClickBookmark, setLoadingClickBookmark,
        loadingMyBookmarkModal, setLoadingMyBookmarkModal,
        loadingDeleteBookmark, setLoadingDeleteBookmark,
        loadingPostModal, setLoadingPostModal,
        loadingAddPost, setLoadingAddPost,
        loadingDeleteAccount, setLoadingDeleteAccount,
        loadingSignup, setLoadingSignup,
        loadingResetPassword, setLoadingResetPassword,
        loadingResend, setLoadingResend,
        pathName, setPathName,
        spMenuState, setSpMenuState,
        timeoutId, setTimeoutId,
        postsPerPage, setPostsPerPage,         
        postsPerPageNASA, setPostsPerPageNASA,
    ])

  useSetBrowserLanguage(setBrowserLanguage)

  useSetLanguageCookie(language)
    
  useSetPathName({router, setPathName})      

  useSetCurrentPage(pathName)

  useSetSpMenuState({setSpMenuState, pathName}) 

  useCancelOverflowHidden({pathName})

  return (
    <PageContext.Provider value={pageValue}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}