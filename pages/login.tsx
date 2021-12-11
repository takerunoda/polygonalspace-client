import React, { useState } from 'react'
import HeadItem from '../Components/HeadItem';
import LoginForm from '../Components/LoginForm';
import AuthTitle from '../Components/AuthTitle';
import LoaderPage from '../Components/LoaderPage';
import OrAndLines from '../Components/OrAndLines';
import LinkButton from '../Components/LinkButton';
import GoogleSignin from '../Components/GoogleSignin';
import LinkButtonTwo from '../Components/LinkButtonTwo';
import { useUserContext } from '../context/UserContext'
import { useRedirectToHomeLoggedin } from '../utils/useRedirectToHome';

const Login = () => {
    const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false)
    const [showResend, setShowResend] = useState(false)
    const userContext = useUserContext()
        if ( !userContext ) {
            return null
        }
    const { isLoggedin } = userContext; 
    useRedirectToHomeLoggedin(isLoggedin)

    return (
    !isLoggedin ? <>
        <HeadItem
            imageUrl={""}
            title={"Login | ログイン"}
            description={""}
            noIndex={false}
            defaultURL={true}
        />
        <div className="authOuter">
            <div className="authInner" id="login">
                <div className="mx-3">
                    <AuthTitle jp={"ログイン"} en={"Login"}/>
                    <GoogleSignin 
                    setLoadingGoogleLogin={setLoadingGoogleLogin} />
                    <OrAndLines />
                    <LoginForm 
                        setShowResend={setShowResend} />
                    <h2 className="mt-7 text-center">
                            <LinkButtonTwo
                                jp={"パスワードをお忘れの場合"} 
                                en={"Forgot your password?"} 
                                url={"request-password-reset"} 
                                type={"password"}
                            />
                    </h2>
                    <h2 className="mt-3 text-center">
                            <LinkButtonTwo
                                jp={"確認メールを再送信"} 
                                en={"Resend Confirmation Email"} 
                                url={"resend-confirmation"} 
                                type={"confirmation"}
                            />
                    </h2>
                <OrAndLines />
                <div className="w-full text-center my-16">
                    <h3>
                        <LinkButton 
                            jp={"アカウントを作る"} 
                            en={"Create your account"} 
                            url={"signup-options"} 
                            color={"indigo"}
                            />
                    </h3>
                </div>
                <div className="text-center my-16 w-full">
                    <h3>
                        <LinkButton 
                            jp={<ul><li>ゲストログインで機能を試す</li></ul>} en={<p>Try App as Guest</p>}
                            url={"guest-login"} 
                            color={"indigo"}
                            />
                    </h3>
                </div>
            </div>
        </div>
        </div>
        </> :
        <LoaderPage />
    )
}

export default Login
