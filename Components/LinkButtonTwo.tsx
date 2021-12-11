import React from 'react'
import Link from 'next/link'
import Language from './Language'
import { RiMailSendLine } from 'react-icons/ri'
import { IoKeyOutline } from 'react-icons/io5'

interface ComponentProps {
    jp: string | JSX.Element
    en: string | JSX.Element
    url: string
    type: string
}

const LinkButtonTwo = ({jp, en, url, type} : ComponentProps) => {
    return (
        <>
            <Link href={`/${url}`}>
                <button className={`text-center rounded focus:outline-none cursor-pointer text-sm sm:text-base  text-blue-500 hover:text-indigo-500`}>
                    <ul className="flex">
                        <li className="text-xl sm:text-2xl mr-3 text-red-500">
                            {type === "confirmation" && <RiMailSendLine />}
                            {type === "password" && <IoKeyOutline />}
                        </li>
                        <li className="hover:underline">
                        <Language jp={jp} en={en}/>                            
                        </li>
                    </ul>
                </button>
            </Link>
        </>        
                    // <>
        //     <Link href={`/${url}`}>
        //         <div className={`border-${color}-500 border-2 text-${color}-500 py-5 rounded focus:outline-none cursor-pointer mx-auto mt-2 hoverBlueBack`}>
        //             <button className="w-full text-center">
        //                 <p className="mt-1 xs:mt-0 ml-2 xs:ml-4 text-base xs:text-base font-bold">
        //                     <Language jp={jp} en={en}/>
        //                 </p>
        //             </button>
        //         </div>
        //     </Link>  
        // </>
    )
}

export default LinkButtonTwo
