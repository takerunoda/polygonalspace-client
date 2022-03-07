import React from 'react'
import Link from 'next/link'
import Language from './Language';
import { useUserContext } from '../context/UserContext';
import { usePageContext } from '../context/PageContext';
import { useRouter } from 'next/router';
import { useFunctionsContext } from '../context/FunctionsContext';

const AuthController = () => {
      const { logoutFunction } = useFunctionsContext()
      const { setSpMenuState, language } = usePageContext()
      const {userState: 
            {accessToken, userStatus, isLoggedin}} = useUserContext()
      const router = useRouter()
      const logoutInNavbar = async () => {
               await logoutFunction()
               router.push("/login")
            }

    return (
      <div className="">
         {(!accessToken || !isLoggedin) ? 
                (<div className={`flex ${isLoggedin ? "sm:justify-end" : "justify-end"}`}>
               <div className="mt-1 mr-3">
                        <button className="w-full flex justify-center">
                            <div className="text-3xl hover:opacity-60">
                            </div>
                        </button>                        
                  </div>
                  <div className="mt-3 sm-mt-0" onClick={() => setSpMenuState(false)} >
                     <Link href="/login" passHref>
                     <button className="buttonIndigoSmaller">
                        <div className={`${language ? "text-xs sm:text-sm" : "text-xs sm:text-sm"}`}>
                           <Language jp={"ログイン"} en={"Login"}/>
                        </div>
                     </button>
                     </Link>
                  </div>
               </div>) :
                (<div className={`flex ${isLoggedin ? "md:justify-end" : "justify-end"}`}>
                   {userStatus !== "guest" ? (<div className="inline-block">
                     <button onClick={logoutInNavbar} className={accessToken && isLoggedin ? `buttonGray ${language ? " text-xs sm:text-sm" : "text-xs sm:text-sm"}` : "hidden"}>
                     <Language jp={"ログアウト"} en={"Logout"}/>
                     </button>
                  </div> ) : 
                  (<div className="inline-block">
                     <button onClick={logoutInNavbar} className={accessToken && isLoggedin ? `buttonGray ${language ? " text-xs sm:text-sm" : "text-sm sm:text-base"}` : "hidden"}>
                     <Language jp={"ログイン中"} en={"Loggedin"}/>
                     </button>
                  </div>)}
               </div>)}
            </div>
    )
}

export default AuthController