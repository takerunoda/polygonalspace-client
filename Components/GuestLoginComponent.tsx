import React, { useState } from 'react'
import { usePageContext } from '../context/PageContext'
import { useFunctionsContext } from '../context/FunctionsContext'
import Language from './Language'
import AuthTitle from './AuthTitle'
import ReadBefore from './ReadBefore'
import Breadcrumb from './Breadcrumb'
import BackToLogin from './BackToLogin'
import LoaderSmall from './LoaderSmall'
import PrivacyAndTOS from './PrivacyAndTOS'
import BackToSignupOptions from './BackToSignupOptions'
import { translation } from '../utils/translation'

const GuestLoginComponent = () => {
    const { loadingGuestLogin } = usePageContext()
    const { handleSignupSubmitGuestFn } = useFunctionsContext()
    const [translationObject] = useState(translation.filter(item => item.key === "readBeforeGuestLogin")[0])

  const breadcrumb_1 = null
  const breadcrumb_2 = { name: `ゲストログイン`, name_EN: `Guest Login`, url: `/guest-login`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
    {<div className="authOuter">
        {<div className="authInner">
            <div>
                <AuthTitle jp={"ゲストログイン"} en={"Guest Login"}/>
                <div className="">
                    <ReadBefore translationObject={translationObject}/>
                    <PrivacyAndTOS />
                    <div className="mt-9 sm:mt-12">
                        {loadingGuestLogin ? 
                        <div className="mt-14 mb-12 sm:mt-16 sm:mb-16 mx-auto"><LoaderSmall /></div> : 
                                <div 
                                    className="w-64 sm:w-72 mx-auto buttonIndigoBigger" 
                                    onClick={handleSignupSubmitGuestFn}>
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
    </div>}
    
    </>
  )
}

export default GuestLoginComponent