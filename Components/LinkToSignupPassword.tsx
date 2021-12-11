import React from 'react'
import Link from 'next/link'
import Language from './Language'
import { IoMdLogIn } from 'react-icons/io'

const LinkToSignupPassword = () => {
    return (<div className="mt-10 text-center">
                    <Link href="/signup-password">
                        <ul className="flex justify-center cursor-pointer  ">
                            <li className="text-3xl text-indigo-500 mr-2">
                                <IoMdLogIn />
                            </li>
                            <li className="mt-1">
                                <button className={`text-center rounded focus:outline-none text-sm sm:text-base font-bold text-blue-500 hover:underline`}>
                                    <Language jp={"ユーザー登録"} en={"Signup"}/>
                                </button>
                            </li>
                        </ul>
                    </Link>
                </div>)}

export default LinkToSignupPassword
