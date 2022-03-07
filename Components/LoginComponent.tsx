import React from 'react'
import LoginForm from './LoginForm';
import AuthTitle from './AuthTitle';
import OrAndLines from './OrAndLines';
import Breadcrumb from './Breadcrumb';
import LinkButton from './LinkButton';
import GoogleSignin from './GoogleSignin';
import LinkButtonTwo from './LinkButtonTwo';

const LoginComponent = () => {
    const breadcrumb_1 = null
    const breadcrumb_2 = { name: `ログイン`, name_EN: `Login`, url: `/login`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="authOuter">
            <div className="authInner" id="login">
                <div className="mx-3">
                    <AuthTitle jp={"ログイン"} en={"Login"}/>
                    <GoogleSignin />
                    <OrAndLines />
                    <LoginForm />
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
    
    </>
  )
}

export default LoginComponent