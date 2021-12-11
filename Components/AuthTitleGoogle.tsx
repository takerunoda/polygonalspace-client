import React from 'react'
import Language from './Language'
import { AiOutlineUserAdd } from 'react-icons/ai'

const AuthTitleGoogle = () => {
    return (
                <h2 className="h3  text-indigo-500">
                    <ul>
                        <li>
                            <li className="text-3xl sm:text-4xl mr-2 sm:mr-3 ">
                                <AiOutlineUserAdd className="mx-auto text-center"/>
                            </li>
                        </li>
                        <li className="">
                            <p><Language jp={"ユーザー登録"} en={"Signup"}/></p>
                            <p><Language jp={"(Googleアカウント)"} en={"with Google"}/></p>
                        </li>
                    </ul>
                </h2>    )
}

export default AuthTitleGoogle
