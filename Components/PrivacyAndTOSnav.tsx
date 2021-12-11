import React from 'react'
import Link from 'next/link'
import Language from './Language';
import { useUserContext } from '../context/UserContext';
import { FcDataProtection, FcPrivacy } from 'react-icons/fc';

interface ComponentProps {
   center: boolean
}

const PrivacyAndTOSnav = ({center} : ComponentProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const {isLoggedin} = userContext

    return (
        <>
               <div className={`w-full flex ${center && "justify-center"} text-gray-700 text-sm sm:text-sm font-normal `}>
                        <Link href="/privacy-policy">
                           <ul className="flex sm:hover:underline cursor-pointer mr-3">
                              <li className="text-lg mr-1">
                                 <FcPrivacy />
                              </li>
                              <li>
                                 <Language jp={"プライバシー"} en={"Privacy"}/>
                              </li>
                           </ul>
                        </Link>  
                     <Link href="/terms-of-service">
                        <ul className="flex sm:hover:underline cursor-pointer mr-3">
                           <li className="text-lg mr-1">
                              <FcDataProtection />
                           </li>
                           <li>
                              <Language jp={"利用規約"} en={"ToS"}/>
                           </li>
                        </ul>
                  </Link>
               </div>
            
        </>
    )
}

export default PrivacyAndTOSnav
