import React, { useState } from 'react'
import HeadItem from '../Components/HeadItem'
import AuthTitle from '../Components/AuthTitle'
import LinkButton from '../Components/LinkButton'
import ReadBefore from '../Components/ReadBefore'
import LoaderPage from '../Components/LoaderPage'
import BackToLogin from '../Components/BackToLogin'
import PrivacyAndTOS from '../Components/PrivacyAndTOS'
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext'
import { translation } from '../utils/translation'

const signupPassword = () => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const {isLoggedin} = userContext;

    const [translationObject] = useState(translation.filter(item => item.key === "readBeforeSignup")[0])

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
</> : <LoaderPage />)}

export default signupPassword