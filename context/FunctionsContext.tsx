import { createContext, FormEvent, useCallback, useContext, useMemo} from "react"
import { useRouter } from "next/router";
import { usePageContext } from "./PageContext";
import { useUserContext } from "./UserContext";
import { useModalContext } from "./ModalContext";
import { useSearchContext } from "./SearchContext";
import { ChildrenProps } from "../Interfaces";
import { logout } from "../utils/logout";
import { handleList } from "../utils/handleList";
import { clickBookmark } from "../utils/clickBookmark";
import { handleLoginSubmit } from "../utils/handleLoginSubmit";
import { handleSearchSubmit } from "../utils/handleSearchSubmit";
import { handleSignupSubmit } from "../utils/handleSignupSubmit";
import { handleSignupSubmitGuest } from "../utils/handleSignupSubmitGuest";
import { handleDeleteAccount } from "../utils/handleDeleteAccount";
import { handleDeleteBookmark } from "../utils/handleDeleteBookmark";
import { handleConfirmBookmark } from "../utils/handleConfirmBookmark";
import { handleGoogleSuccessLogin } from "../utils/handleGoogleSuccessLogin";
import { handleConfirmBookmarkTwo } from "../utils/handleConfirmBookmarkTwo";
import { handleResendConfirmation } from "../utils/handleResendConfirmation";
import { handleDeleteAccountGoogle } from "../utils/handleDeleteAccountGoogle";
import { handlePasswordResetSubmit } from "../utils/handlePasswordResetSubmit";
import { handleRequestPasswordReset } from "../utils/handleRequestPasswordReset";
import { handleChangePasswordSubmit } from "../utils/handleChangePasswordSubmit";
import { handleEnablePasswordSignin } from "../utils/handleEnablePasswordSignin";
import { handleOnclickDeleteBookmark } from "../utils/handleOnclickDeleteBookmark";
import { handleGoogleSuccessEnableSignin } from "../utils/handleGoogleSuccessEnableSignin";

type FunctionsContextType = {
  logoutFunction: () => Promise<void>
  clickBookmarkFunction: () => Promise<void>
  handleConfirmBookmarkFn: ({ item }: any) => void
  handleConfirmBookmarkTwoFn: ({ item }: any) => void
  handleDeleteBookmarkFn: ({ item }: any) => Promise<void>
  handleSearchSubmitFn: (e: FormEvent<HTMLFormElement>) => Promise<void>  
  handleDeleteAccountGoogleFn: (res: any, { inputData }: {inputData: {
            userEmail: string;
            password: string;
        }}) => Promise<void>
  handleChangePasswordSubmitFn: ({ inputData }: {
      inputData: {
      userEmail: string;
      currentPassword: string;
      newPassword: string;
      newPasswordConfirmation: string;}
      }) => void
  handleDeleteAccountFn: ({ inputData }: any) => Promise<void>
  handleListFn: ({ item }: any) => void
  handleLoginSubmitFn: ({ inputData }: any) => Promise<void>
  handleOnclickDeleteBookmarkFn: ({ item }: any) => void
  handlePasswordResetSubmitFn: ({ inputData }: any) => Promise<void>
  handleRequestPasswordResetFn: () => Promise<void>
  handleGoogleSuccessLoginFn: (res: any) => Promise<void>
  handleResendConfirmationFn: () => Promise<void>
  handleGoogleSuccessEnableSigninFn: (res: any) => Promise<void>
  handleEnablePasswordSigninFn: (inputData: any) => Promise<void>
  handleSignupSubmitGuestFn: () => Promise<void>
  handleSignupSubmitFn: (inputData: any) => Promise<void>
  handleSetCategoryStateFn: (itemValue: {
                                            catName: string;
                                            value: string;
                                            en: string;
                                        }) => void
  handleSettPreQueryFn: (e: FormEvent<HTMLInputElement>) => void
  }

const FunctionsContext = createContext<FunctionsContextType | undefined>(undefined)

export function FunctionsWrapper({ children } : ChildrenProps ) {
  const { setUserBookmark, 
          myBookmarkAddItem, 
          setUserBookmarkIds, 
          setMyBookmarkAddItem,
          userBookmarkIds, userBookmark, 
          setMyBookmarkDeleteItem, 
          inputDataRequestPasswordReset, 
          inputDataResend,        
          userDispatch,
          userState:{isLoggedin, accessToken}
        } = useUserContext()


  const { setLoadingClickBookmark, 
          setLoadingDeleteBookmark, 
          setLoadingDeleteAccount, 
          setLoadingSubmitSearch, 
          language, setLoadingResetPassword, 
          setLoadingResend, 
          setLoadingLogin, 
          setLoadingResetToken,
          setLoadingChangePassword,
          setLoadingEnableGoogle,
          setLoadingEnablePassword,
          setLoadingGuestLogin,
          setLoadingSignup,
        } = usePageContext()

  const { handleMessageModal, 
          setAddBookmarkModalToggleConfirm, 
          setModalToggleConfirmDeleteAccount, 
          setMyBookmarkModalToggleConfirm,            
          setModalToggleConfirmRequestPasswordReset, 
          setResendConfirmModalToggleConfirm  } = useModalContext()

  const { setNasaState,
          scrollToRefCurrent,
          keywordRef,
          resultsRef,
          query,
          setTotalPosts,
          setSearchCurrentPage,
          setSearchTotalPages,
          setHasMore,
          cancelSourceSearch, setCancelSourceSearch,
          mediaPreference,
          sortPreference,
          setQuery, setSearchKeyword,
          setCategoryState, categoryRef,
          preQuery, setPreQuery
    } = useSearchContext()
  const router = useRouter()

  const logoutFunction =useCallback(async() => {
                await logout({
                  userDispatch,
                  setUserBookmark
                })}, [setUserBookmark, userDispatch])

  const clickBookmarkFunction = useCallback(async () => {
        await clickBookmark( {
                  setUserBookmark, 
                  router, 
                  image: myBookmarkAddItem, 
                  setAddBookmarkModalToggleConfirm, 
                  userBookmarkIds, 
                  setUserBookmarkIds, 
                  setLoadingClickBookmark, 
                  logoutFunction, 
                  handleMessageModal})
              }, [handleMessageModal, logoutFunction, myBookmarkAddItem, router, setAddBookmarkModalToggleConfirm, setLoadingClickBookmark, setUserBookmark, setUserBookmarkIds, userBookmarkIds])

  const handleConfirmBookmarkFn = useCallback(({item}) => {
    handleConfirmBookmark({ 
                  item, 
                  isLoggedin, 
                  setAddBookmarkModalToggleConfirm, 
                  setMyBookmarkAddItem, 
                  userBookmarkIds, 
                  handleMessageModal})
              }, [handleMessageModal, isLoggedin, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds])
  
  const handleConfirmBookmarkTwoFn = useCallback(({item}) => {
    handleConfirmBookmarkTwo({ 
                  item, 
                  isLoggedin, 
                  setAddBookmarkModalToggleConfirm, 
                  setMyBookmarkAddItem, 
                  userBookmarkIds, 
                  handleMessageModal})
            }, [handleMessageModal, isLoggedin, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds])

  const handleDeleteBookmarkFn = useCallback(async({item}) => {
          await handleDeleteBookmark({
                  item, 
                  setLoadingDeleteBookmark, 
                  router, 
                  userBookmark, 
                  setUserBookmark, 
                  setUserBookmarkIds, 
                  logoutFunction,
                   handleMessageModal
                  })
            }, [handleMessageModal, logoutFunction, router, setLoadingDeleteBookmark, setUserBookmark, setUserBookmarkIds, userBookmark])

  const handleSearchSubmitFn = useCallback(async (e) => {  
    await handleSearchSubmit(e, {   
            setNasaState,
            setLoading: setLoadingSubmitSearch,
            scrollToRefCurrent,
            keywordRef,
            resultsRef,
            query,
            setTotalPosts,
            setSearchCurrentPage,
            setSearchTotalPages,
            setHasMore,
            cancelSourceSearch, setCancelSourceSearch,
            mediaPreference,
            sortPreference, handleMessageModal
    })}, [cancelSourceSearch, handleMessageModal, keywordRef, mediaPreference, query, resultsRef, scrollToRefCurrent, setCancelSourceSearch, setHasMore, setLoadingSubmitSearch, setNasaState, setSearchCurrentPage, setSearchTotalPages, setTotalPosts, sortPreference])

    const handleChangePasswordSubmitFn = useCallback(({inputData}) => {
      handleChangePasswordSubmit({
            inputData, 
            router, 
            accessToken, 
            setLoadingChangePassword, 
            handleMessageModal})
          }, [accessToken, handleMessageModal, router, setLoadingChangePassword])

  const handleDeleteAccountGoogleFn = useCallback(async (res, {
    inputData}) => {await handleDeleteAccountGoogle(res, {
                    inputData, 
                    userDispatch, 
                    router, 
                    setLoadingDeleteAccount, 
                    accessToken, 
                    handleMessageModal})
                  }, [accessToken, handleMessageModal, router, setLoadingDeleteAccount, userDispatch])

  const handleDeleteAccountFn = useCallback(async ({inputData}) => {
    await handleDeleteAccount({inputData, router, userDispatch, language, setLoadingDeleteAccount, accessToken, setModalToggleConfirm: setModalToggleConfirmDeleteAccount, handleMessageModal})
  }, [accessToken, handleMessageModal, language, router, setLoadingDeleteAccount, setModalToggleConfirmDeleteAccount, userDispatch])

    const handleListFn = useCallback(({item}) => {
    handleList({item, setQuery, setSearchKeyword})
  }, [setQuery, setSearchKeyword]) 

    const handleLoginSubmitFn = useCallback(async({inputData}) => {
    await handleLoginSubmit({inputData, userDispatch, router, setLoadingLogin, handleMessageModal})
  }, [handleMessageModal, router, setLoadingLogin, userDispatch])

    const handleOnclickDeleteBookmarkFn = useCallback(({item}) => {
     handleOnclickDeleteBookmark({item, setMyBookmarkDeleteItem, setMyBookmarkModalToggleConfirm})
  }, [setMyBookmarkDeleteItem, setMyBookmarkModalToggleConfirm])

    const handlePasswordResetSubmitFn = useCallback(async ({inputData}) => {
     await handlePasswordResetSubmit({inputData, userDispatch, router,  setLoadingResetToken, handleMessageModal})
  }, [handleMessageModal, router, setLoadingResetToken, userDispatch])

    const handleRequestPasswordResetFn = useCallback(async () => {
     await handleRequestPasswordReset({inputData: inputDataRequestPasswordReset, router, language, setLoadingResetPassword, setModalToggleConfirmRequestPasswordReset, handleMessageModal})
  }, [handleMessageModal, inputDataRequestPasswordReset, language, router, setLoadingResetPassword, setModalToggleConfirmRequestPasswordReset])

    const handleGoogleSuccessLoginFn = useCallback(async (res) => {
     await handleGoogleSuccessLogin(res, {userDispatch, router, handleMessageModal})
  }, [handleMessageModal, router, userDispatch])

    const handleResendConfirmationFn = useCallback(async () => {
     await handleResendConfirmation({inputData: inputDataResend, router, language, setLoadingGeneral: setLoadingResend, setResendConfirmModalToggleConfirm, handleMessageModal})
  }, [handleMessageModal, inputDataResend, language, router, setLoadingResend, setResendConfirmModalToggleConfirm])

    const handleGoogleSuccessEnableSigninFn = useCallback(async (res: any) => {
        await handleGoogleSuccessEnableSignin(res, {router, setLoadingEnableGoogle, accessToken, handleMessageModal})      
    }, [accessToken, handleMessageModal, router, setLoadingEnableGoogle])

    const handleEnablePasswordSigninFn = useCallback(async (inputData: any) => {
        await handleEnablePasswordSignin({inputData, router, setLoadingEnablePassword, accessToken, handleMessageModal})
    }, [accessToken, handleMessageModal, router, setLoadingEnablePassword])

    const handleSignupSubmitGuestFn = useCallback(async () => {
        await handleSignupSubmitGuest({userDispatch, router, setLoadingGuestLogin, handleMessageModal})
    }, [handleMessageModal, router, setLoadingGuestLogin, userDispatch])

    const handleSignupSubmitFn = useCallback(async ({inputData}) => {
        await handleSignupSubmit({inputData, router, language, setLoadingSignup, handleMessageModal})
    }, [handleMessageModal, language, router, setLoadingSignup])

    const handleSetCategoryStateFn = useCallback((itemValue: { catName: string; value: string; en:string} ) => {
              setQuery("")
              setSearchKeyword(null)
              setNasaState([])
              setCategoryState(itemValue)
              setTimeout(() => {
                  scrollToRefCurrent(categoryRef)                
              }, 500);
    }, [categoryRef, scrollToRefCurrent, setCategoryState, setNasaState, setQuery, setSearchKeyword])
    const handleSettPreQueryFn = useCallback((e: FormEvent<HTMLInputElement>)=> {
            setNasaState([])
            setQuery("")
            setPreQuery((e.target as HTMLTextAreaElement).value)
        }, [setNasaState, setPreQuery, setQuery])

  const functionsValue = useMemo(() => ({
          logoutFunction,
          clickBookmarkFunction,
          handleConfirmBookmarkFn,
          handleConfirmBookmarkTwoFn,
          handleDeleteBookmarkFn,
          handleDeleteAccountGoogleFn,
          handleSearchSubmitFn,
          handleChangePasswordSubmitFn,
          handleDeleteAccountFn,
          handleListFn,
          handleLoginSubmitFn,
          handleOnclickDeleteBookmarkFn,
          handlePasswordResetSubmitFn,
          handleRequestPasswordResetFn,
          handleGoogleSuccessLoginFn,
          handleResendConfirmationFn,
          handleGoogleSuccessEnableSigninFn,
          handleEnablePasswordSigninFn,
          handleSignupSubmitGuestFn,
          handleSignupSubmitFn,
          handleSetCategoryStateFn,
          handleSettPreQueryFn,
    }), [
          logoutFunction,
          clickBookmarkFunction,
          handleConfirmBookmarkFn,
          handleConfirmBookmarkTwoFn,
          handleDeleteBookmarkFn,
          handleDeleteAccountGoogleFn,
          handleSearchSubmitFn,
          handleChangePasswordSubmitFn,
          handleDeleteAccountFn,
          handleListFn,
          handleLoginSubmitFn,
          handleOnclickDeleteBookmarkFn,
          handlePasswordResetSubmitFn,
          handleRequestPasswordResetFn,
          handleGoogleSuccessLoginFn,
          handleResendConfirmationFn,
          handleGoogleSuccessEnableSigninFn,
          handleEnablePasswordSigninFn,
          handleSignupSubmitGuestFn,
          handleSignupSubmitFn,
          handleSetCategoryStateFn,
          handleSettPreQueryFn,
    ])

  return (
    <FunctionsContext.Provider value={functionsValue}>
      {children}
    </FunctionsContext.Provider>
  );
}

export function useFunctionsContext() {
    const context = useContext(FunctionsContext)
        if (context === undefined) {
            throw new Error('useContext(FunctionsContext) is undefined')
        }
    return context
}