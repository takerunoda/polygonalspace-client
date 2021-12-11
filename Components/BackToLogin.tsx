import React from 'react'
import Link from 'next/link'
import Language from './Language'
import { IoMdLogIn } from 'react-icons/io'
const BackToLogin = () => {
    return (<div className="mt-5 text-center">
                        <ul className="flex justify-center">
                            <li className="text-3xl text-indigo-500 mr-2">
                                <IoMdLogIn />
                            </li>
                            <Link href="/login">
                                <li className="mt-1 cursor-pointer">
                                    <button className={`text-center rounded focus:outline-none text-sm sm:text-base font-bold text-blue-500 hover:underline`}>
                                        <Language jp={"ログイン画面"} en={"Back to Login"}/>
                                    </button>
                                </li>
                            </Link>
                        </ul>
                </div>
    )
}

export default BackToLogin
