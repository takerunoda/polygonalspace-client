import React from 'react'
import Link from 'next/link'
import Language from './Language';
import { FcDataProtection, FcPrivacy } from 'react-icons/fc';

interface ComponentProps {
   center: boolean
}

const PrivacyAndTOSnav = ({center} : ComponentProps) => {
    return (
        <>
            <div className={`w-full md:flex text-center ${center && "justify-center"} text-gray-700 text-sm sm:text-sm font-normal`}>
                  <div className="text-center">
                     <Link href="/privacy-policy" passHref>
                        <ul className={`flex sm:hover:underline cursor-pointer mr-3 ${center && "justify-center"}`}>
                           <li className="text-lg mr-1">
                              <FcPrivacy />
                           </li>
                           <li>
                              <Language jp={"プライバシー"} en={"Privacy"}/>
                           </li>
                        </ul>
                     </Link>
                  </div>
                  <div className="text-center">
                     <Link href="/terms-of-service" passHref>
                        <ul className={`flex sm:hover:underline cursor-pointer mr-3 mt-3 md:mr-0 md:mt-0 ${center && "justify-center"}`}>
                           <li className="text-lg mr-1">
                              <FcDataProtection />
                           </li>
                           <li>
                              <Language jp={"利用規約"} en={"Terms of Service"}/>
                           </li>
                        </ul>
                     </Link>
                  </div> 
            </div>
        </>)}

export default PrivacyAndTOSnav
