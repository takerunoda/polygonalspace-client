import React from 'react'
import Link from 'next/link'
import Language from './Language';
import { useUserContext } from '../context/UserContext';
// import { MdAccountCircle } from 'react-icons/md';
import { usePageContext } from '../context/PageContext';

interface ModalProps {
   logoutInNavbar:() => Promise<void>
}

const AuthController = ({logoutInNavbar} : ModalProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
           return null
         }
    const pageContext = usePageContext()
      if ( !pageContext ) {
         return null;
      }
    const { spMenuState, setSpMenuState, pathName, language } = pageContext;

   const {accessToken, userStatus, isLoggedin } = userContext;
   
    return (
      <div className="">
         {(!accessToken || !isLoggedin) ? 
                (<div className={`flex ${isLoggedin ? "sm:justify-end" : "justify-end"}`}>
               <div className="mt-1 mr-3">
                        <button className="w-full flex justify-center">
                           {/* <Link href="/google-login"> */}
                            <div className="text-3xl hover:opacity-60">
                                {/* < /> */}
                            </div>
                           {/* </Link> */}
                        </button>                        
                  </div>
                  <div className="mt-3 sm-mt-0" onClick={() => setSpMenuState(false)} >
                     <Link href="/login">
                     <button className="buttonIndigoSmaller">
                        <div className={`${language ? "text-xs sm:text-sm" : "text-xs sm:text-sm"}`}>
                           <Language jp={"ログイン"} en={"Login"}/>
                        </div>
                     </button>
                     </Link>
                  </div>
               </div>) :
                (<div className={`flex ${isLoggedin ? "md:justify-end" : "justify-end"}`}>
                   {/* <div className="hidden sm:block text-blue-500 hover:text-yellow-500 focus:text-yellow-500  text-4xl cursor-pointer">
                      <Link href="/mypage">
                        <MdAccountCircle />
                      </Link>
                   </div> */}
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