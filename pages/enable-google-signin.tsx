import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Language from '../Components/Language'
import HeadItem from '../Components/HeadItem'
import LoaderPage from '../Components/LoaderPage'
import LoaderSmall from '../Components/LoaderSmall'
import PrivacyAndTOS from '../Components/PrivacyAndTOS'
import GoogleEnableLogin from '../Components/GoogleEnableLogin'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import { translation } from '../utils/translation'
import { handleGoogleSuccessEnableSignin } from '../utils/handleGoogleSuccessEnableSignin'


const enableGoogleSignin = () => {
const [loadingEnableGoogle, setLoadingEnableGoogle] = useState(false)
    const [showEnableGoogle, setShowEnableGoogle] = useState(false)
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
    const {  
            isLoggedin, 
            accessToken } = userContext;
    const { showMessageModal, 
            setShowMessageModal, 
            message,
            setMessage } = modalContext
    const { timeoutId, setTimeoutId, language} = pageContext
    const router = useRouter()

    const [translationObject] = useState(translation.filter(item => item.key === "readBeforeEnableGoogle")[0])

    const onSubmit = (res: any) => {
        handleGoogleSuccessEnableSignin(res, {router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, setLoadingEnableGoogle, accessToken})        
    }

    return (
    <>
    {isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Enable Sign-in with Google | Googleログインを有効にする"}
            description={""}
            noIndex={true}
            defaultURL={true}
        />        
        {!showEnableGoogle && <div className="w-80 sm:w-96 mx-auto my-10 pt-16 pb-24 px-3 shadow-lg rounded-lg text-center">
            <div>
                <h1 className="h2  text-indigo-500">
                    <Language jp={<ul><li>Googleログインを</li><li>有効にする</li></ul>} en={<ul><li>Enable Sign-in</li><li>with Google</li></ul>} />                    
                </h1>
                <div className="">
                    <div className="text-base sm:text-lg text-blue-500 px-7">
                        <Language jp={translationObject.jp} en={translationObject.en} />
                    </div>
                    <PrivacyAndTOS />
                    <div className="mt-10">
                    {loadingEnableGoogle ? 
                        <div className="mt-5 mx-auto">
                            <LoaderSmall />
                        </div> : 
                        <div className="">
                            <GoogleEnableLogin 
                            setLoadingEnableGoogle={setLoadingEnableGoogle}/>
                        </div>}                        
                    </div>
                </div>
            </div>
        </div>}
    </> : <LoaderPage />}
    </>)}

export default enableGoogleSignin