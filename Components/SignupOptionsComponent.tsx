import React, { useState } from 'react'
import AuthTitle from '../Components/AuthTitle'
import LinkButton from '../Components/LinkButton'
import ReadBefore from '../Components/ReadBefore'
import Breadcrumb from '../Components/Breadcrumb'
import BackToLogin from '../Components/BackToLogin'
import PrivacyAndTOS from '../Components/PrivacyAndTOS'
import { translation } from '../utils/translation'

const SignupOptionsComponent = () => {
    const [translationObject] = useState(translation.filter(item => item.key === "readBeforeSignup")[0])
    const breadcrumb_1 = null
    const breadcrumb_2 = { 
        name: `ユーザー登録`, 
        name_EN: `Signup`,
        url: `/signup-options`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
    <div className="authOuter">
        <div className="authInner">
        <AuthTitle jp={"ユーザー登録"} en={"Signup Options"}/>
        <ReadBefore translationObject={translationObject}/>
        <PrivacyAndTOS />
        <div className="w-10/12 mx-auto text-center my-16">
            <h2>
                <LinkButton 
                    jp={"パスワードで登録"} 
                    en={"Signup with Password"} 
                    url={"signup-password"}
                    color={"indigo"}
                    />
            </h2>
            <h2 className="mt-12">
                <LinkButton 
                    jp={"Googleアカウントで登録"} 
                    en={"Signup with Google"} 
                    url={"signup-google"} 
                    color={"indigo"}
                    />
            </h2>
            <div className="backOptions">
                <BackToLogin />
            </div>
        </div>
    </div>
</div>    
    </>
  )
}

export default SignupOptionsComponent