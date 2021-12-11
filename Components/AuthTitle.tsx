import React from 'react'
import Language from './Language'
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'

interface ComponentProps {
    jp: string
    en: string
}

const AuthTitle = ({jp, en} : ComponentProps) => {
    return (
                <h1 className="h2 text-indigo-500">
                    <ul className="flex justify-center">
                        <li className="text-3xl sm:text-4xl mr-2 sm:mr-3 ">
                            {(en.includes("Signup") || en.includes("signup")) && <AiOutlineUserAdd />}
                            {(en.includes("Login")) && <AiOutlineUser />}
                        </li>
                        <li className="">
                            <Language jp={jp} en={en}/>
                        </li>
                    </ul>
                </h1>
    )
}

export default AuthTitle
