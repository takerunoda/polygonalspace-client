import React from 'react'
import Link from 'next/link'
import Language from './Language'

interface ComponentProps {
    jp: string | JSX.Element
    en: string | JSX.Element
    url: string
    color: string
}

const LinkButton = ({jp, en, url, color} : ComponentProps) => {
    return (
        <>
            <Link href={`/${url}`}>
                <div className={`border-${color}-500 border-2 text-${color}-500 py-5 rounded focus:outline-none cursor-pointer mx-auto mt-2 hoverBlueBack`}>
                    <button className="w-full text-center">
                        <p className="mt-1 xs:mt-0 ml-2 xs:ml-4 text-sm xs:text-base font-bold">
                            <Language jp={jp} en={en}/>
                        </p>
                    </button>
                </div>
            </Link>  
        </>
    )
}

export default LinkButton
