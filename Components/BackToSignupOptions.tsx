import React from 'react'
import Link from 'next/link'
import Language from './Language'
import { BiUserPlus } from 'react-icons/bi'

const BackToSignupOptions = () => {
    return (<div className="mt-5 text-center">
                        <ul className="flex justify-center">
                            <li className="text-3xl text-indigo-500 mr-2">
                                <BiUserPlus />
                            </li>
                            <li className="mt-1  cursor-pointer  ">
                                <Link href="/signup-options" passHref>
                                    <button className={`text-center rounded focus:outline-none text-sm sm:text-base font-bold text-blue-500 hover:underline`}>
                                        <Language jp={"ユーザー登録メニュー"} en={"Back to Signup Options"}/>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                </div>
    )
}

export default BackToSignupOptions
