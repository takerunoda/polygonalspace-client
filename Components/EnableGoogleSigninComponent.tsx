import React, { useState } from 'react'
import Language from './Language'
import Breadcrumb from './Breadcrumb'
import LoaderSmall from './LoaderSmall'
import PrivacyAndTOS from './PrivacyAndTOS'
import GoogleEnableLogin from './GoogleEnableLogin'
import { usePageContext } from '../context/PageContext'
import { translation } from '../utils/translation'

const EnableGoogleSigninComponent = () => {
    const { loadingEnableGoogle } = usePageContext();
    const [translationObject] = useState(translation.filter(item => item.key === "readBeforeEnableGoogle")[0])
    const breadcrumb_1 = null
    const breadcrumb_2 = { name: `Googleログインを有効にする`, name_EN: `Enable Sign-in with Google`, url: `/enable-google-signin`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="w-80 sm:w-96 mx-auto my-10 pt-16 pb-24 px-3 shadow-lg rounded-lg text-center">
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
                            <GoogleEnableLogin />
                        </div>}                        
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default EnableGoogleSigninComponent