import React from 'react'
import Link from 'next/link'
import Language from './Language';
import { FcDataProtection, FcPrivacy } from 'react-icons/fc';

const PrivacyAndTOS = () => {
    return (
        <>
            <ul className="flex justify-center mt-5">
                <li className="text-xl mr-1">
                    <FcPrivacy />
                </li>
                <li>
                    <Link href="privacy-policy" passHref>
                    <button className="text-gray-600 hover:underline text-sm sm:text-base font-bold cursor-pointer">
                        <Language jp={"プライバシーポリシー"} en={"Privacy Policy"}/>
                    </button>
                    </Link>
                </li>
            </ul>
            <ul className="flex justify-center mt-3">
                <li className="text-xl mr-1">
                    <FcDataProtection />
                </li>
                <li>
                    <Link href="terms-of-service" passHref>
                    <button className="text-gray-600 hover:underline text-sm sm:text-base font-bold cursor-pointer">
                        <Language jp={"利用規約"} en={"Terms of Service"}/>
                    </button>
                    </Link>
                </li>
            </ul>            
        </>)}

export default PrivacyAndTOS
