import React, { useState } from 'react'
import LoaderPage from '../Components/LoaderPage'
import BackToLogin from '../Components/BackToLogin'
import LoaderSmall from '../Components/LoaderSmall'
import GoogleSignup from '../Components/GoogleSingup'
import AuthTitleGoogle from '../Components/AuthTitleGoogle'
import BackToSignupOptions from '../Components/BackToSignupOptions'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useModalContext } from '../context/ModalContext'
import HeadItem from '../Components/HeadItem'

const signupGoogle = () => {
    const [loadingGoogleSignup, setLoadingGoogleSignup] = useState(false)

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
    const { isLoggedin } = userContext;

    return (
    !isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Signup | ユーザー登録"}
            description={""}
            noIndex={false}
            defaultURL={true}
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
    </> : 
    <LoaderPage />)}

export default signupGoogle