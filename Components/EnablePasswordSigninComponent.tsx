
import React, { useState } from 'react'
import Language from '../Components/Language'
import Breadcrumb from '../Components/Breadcrumb'
import LoaderSmall from '../Components/LoaderSmall'
import PrivacyAndTOS from '../Components/PrivacyAndTOS'
import EmailPasswordTitle from '../Components/EmailPasswordTitle'
import { translation } from '../utils/translation'
import { onChangeAuthSignup } from '../utils/onChangeAuthSignup'
import { useUserContext } from '../context/UserContext'
import { usePageContext } from '../context/PageContext'
import { useFunctionsContext } from '../context/FunctionsContext'

const EnablePasswordSigninComponent = () => {
    const [inputData, setInputData] = useState({
        userEmail: "",
        password: "",
        passwordConfirmation: "",
    })
    const [showEnablePassword, setShowEnablePassword] = useState(false)
    const { userState: {userEmail}} = useUserContext();
    const { loadingEnablePassword } = usePageContext()
    const { handleEnablePasswordSigninFn } = useFunctionsContext()
    const onClickEnablePasswordLogin = () => 
        handleEnablePasswordSigninFn({inputData})
    
    const [translationObject] = useState(translation.filter(item => item.key === "readBeforeEnablePassword")[0])

    const breadcrumb_1 = null
    const breadcrumb_2 = { name: `パスワードログインを有効にする`, name_EN: `Enable Sign-in with Password`, url: `/enable-password-signin`}

  return (
    <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        {!showEnablePassword && <div className="w-80 sm:w-96 mx-auto my-10 pt-16 pb-24 px-3 shadow-lg rounded-lg text-center">
            <div>
                <h1 className="h2  text-indigo-500">
                    <Language jp={<><p>パスワードログインを</p><p>有効にする</p></>} en={<><p>Enable Sign-in</p><p>with Password</p></>} />
                </h1>
                <div className="">
                    <div className="text-base sm:text-lg text-blue-500 px-7">
                    <Language jp={translationObject.jp} en={translationObject.en} />
                    </div>
                    <PrivacyAndTOS />
                    <div className="mt-8">
                        <button className="w-60 md:w-80 border-green-500 border-2 text-green-500 py-5 rounded focus:outline-none cursor-pointer mx-auto mt-2 hover:border-purple-400 hover:text-purple-400"
                        onClick={() => setShowEnablePassword(true)}
                        >
                        <Language jp={`パスワードの入力に進む`} en={`Proceed to input Password`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>}
        {showEnablePassword && <div className="w-80 sm:w-96 mx-auto my-10 pt-16 pb-24 px-3 shadow-lg rounded-lg text-center">
            <div>
                <EmailPasswordTitle titleType="email" />
                <div className="text-sm sm:text-base bold text-purple-500">
                    {userEmail}
                </div>
                <EmailPasswordTitle titleType="password" />
                <div className="w-72 md:w-80 mx-auto">
                    <input className="border border-gray-500 rounded text-xl w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="password" name="password" value={inputData.password} onChange={(e) => onChangeAuthSignup(e, {inputData, setInputData})} required/>
                </div>
                <EmailPasswordTitle titleType="passwordConfirm" />
                <div className="w-72 md:w-80 mx-auto"><input className="border border-gray-500 rounded text-xl w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" type="password" name="passwordConfirmation" value={inputData.passwordConfirmation} onChange={(e) => onChangeAuthSignup(e, {inputData, setInputData})} required/></div>
                    <div className="mt-10">
                        <div className="text-blue-500 hover:underline text-lg md:text-xl  font-bold cursor-pointer">
                            <Language jp={`プライバシーポリシー`} en={`Privacy Policy`} />
                        </div>
                    </div>
                <div className="text-center py-4">
                    {loadingEnablePassword ? 
                    <div className="mt-5 mx-auto"><LoaderSmall /></div> : 
                    <button className="w-72 md:w-80 border-indigo-500 border-2 text-indigo-500 py-5 rounded focus:outline-none cursor-pointer mx-auto mt-2 hover:border-blue-400 hover:text-blue-400" onClick={onClickEnablePasswordLogin}>
                        <Language jp={`パスワードログインを有効にする`} en={`Enable password signin`} />
                    </button>}
                </div>  
            </div>
        </div>}
    
    </>
  )
}

export default EnablePasswordSigninComponent