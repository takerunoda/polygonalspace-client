import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Language from '../Components/Language'
import HeadItem from '../Components/HeadItem'
import AuthTitle from '../Components/AuthTitle'
import LoaderPage from '../Components/LoaderPage'
import ReadBefore from '../Components/ReadBefore'
import BackToLogin from '../Components/BackToLogin'
import LoaderSmall from '../Components/LoaderSmall'
import ProceedButton from '../Components/ProceedButton'
import PrivacyAndTOS from '../Components/PrivacyAndTOS'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import BackToSignupOptions from '../Components/BackToSignupOptions'
import { useModalContext } from '../context/ModalContext'
import { translation } from '../utils/translation'
import { handleSignupSubmitGuest } from '../utils/handleSignupSubmitGuest'

const guestLogin = () => {
    const [loadingGuestLogin, setLoadingGuestLogin] = useState(false)
    const [showGuestLogin, setShowGuestLogin] = useState(false)
    const [errorData, setErrorData] = useState({
        userEmailError: "",
        passwordError: ""
    })
    const userContext = useUserContext()
        if ( !userContext ) {
            return null
        }
   const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }   
   const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }    
    const { setUserEmail, 
            isLoggedin, 
            setIsLoggedin, 
            setAccessToken, 
            setUserId, 
            setUserStatus, 
            setLoginType  } = userContext;

    const { showMessageModal, 
            setShowMessageModal, 
            message,
            setMessage } = modalContext
    const { timeoutId, 
            setTimeoutId, } = pageContext
    const router = useRouter()

    const handleOnClick = () => {
        handleSignupSubmitGuest({setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setErrorData, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, loadingGuestLogin, setLoadingGuestLogin
        })
    }
    const [translationObject] = useState(translation.filter(item => item.key === "readBeforeGuestLogin")[0])

    const handleOnclick = () => {
        setShowGuestLogin(true)        
    }


return (
!isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Guest Login | ゲストログイン"}
            description={""}
            noIndex={false}
            defaultURL={true}
        />
    {<div className="authOuter">
        {!showGuestLogin && <div className="authInner">
            <div>
                <AuthTitle jp={"ゲストログイン"} en={"Guest Login"}/>
                <div className="">
                    <ReadBefore translationObject={translationObject}/>
                    <PrivacyAndTOS />
                    <div className="mt-9 sm:mt-12">
                        {loadingGuestLogin ? 
                        <div className="mt-14 mb-12 sm:mt-16 sm:mb-16 mx-auto"><LoaderSmall /></div> : 
                                <div className="w-64 sm:w-72 mx-auto buttonIndigoBigger" onClick={handleOnClick}>
                                <ul className="text-center font-bold">
                                    <li>
                                        <Language jp={"ゲストログインする"} en={"Get Started!"}/>
                                    </li>
                                </ul>
                            </div>}
                    </div>
                </div>
                <div className="backOptions">
                    <BackToLogin />
                    <BackToSignupOptions />
                </div>
            </div>
        </div>}
    {/* <>
        { <div className="authInner">
            <div>
                <AuthTitle jp={"ゲストログイン"} en={"Guest Login"}/>
                <div className="text-center py-4">
                    {loadingGuestLogin ? 
                    <div className="mt-5 mb-5 sm:mt-7 sm:mb-7 mx-auto"><LoaderSmall /></div> : 
                            <div className="w-64 md:w-80 mx-auto buttonIndigoBigger" onClick={handleOnClick}>
                            <ul className="text-center font-bold">
                                <li>
                                    <Language jp={"ゲストログインする"} en={"Get Started!"}/>
                                </li>
                            </ul>
                        </div>}
                        <div className="backOptions">
                            <BackToLogin />
                            <BackToSignupOptions />
                        </div>
                </div>  
            </div>
        </div>}
    </> */}
    </div>}
    </> : <LoaderPage />)
}

export default guestLogin