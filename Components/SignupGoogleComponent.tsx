import React, { useState } from 'react'
import Breadcrumb from './Breadcrumb'
import BackToLogin from './BackToLogin'
import LoaderSmall from './LoaderSmall'
import GoogleSignup from './GoogleSingup'
import AuthTitleGoogle from './AuthTitleGoogle'
import BackToSignupOptions from './BackToSignupOptions'


const SignupGoogleComponent = () => {
    const [loadingGoogleSignup, setLoadingGoogleSignup] = useState(false)
    const breadcrumb_1 = { 
        name: `ユーザー登録`, 
        name_EN: `Signup`,
        url: `/signup-options`}
    const breadcrumb_2 = { 
        name: `ユーザー登録(Googleアカウント)`, 
        name_EN: `Signup with Google`,
        url: `/signup-google`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="authOuter">
            <div className="authInner">
                <div className="text-center py-4">
                    <AuthTitleGoogle />
                    {loadingGoogleSignup ? 
                        <div className="my-14 mx-auto">
                            <LoaderSmall />
                        </div> : 
                        <GoogleSignup 
                            setLoadingGoogleSignup={setLoadingGoogleSignup} />}
                        <div className="backOptions">
                            <BackToSignupOptions/>
                            <BackToLogin />
                        </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default SignupGoogleComponent