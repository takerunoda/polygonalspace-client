import React from 'react'
import { RiLockPasswordLine } from 'react-icons/ri';
import Language from './Language';

interface ComponentProps {
    passwordVisibility: boolean
    handleOnclickShowPassword: () => void
}

const ShowPassword = ({passwordVisibility, handleOnclickShowPassword}: ComponentProps) => {
    return (    <div className="w-full text-center mt-10">
                    <button className={`text-center rounded focus:outline-none cursor-pointer text-sm sm:text-base font-bold ${!passwordVisibility ? "text-purple-500 hover:underline " : "text-indigo-500 hover:underline "}`} onClick={handleOnclickShowPassword}>
                            <ul className="flex">
                                <li className="text-2xl mr-2 text-gray-600">
                                    <RiLockPasswordLine />
                                </li>
                                <li className="hover:underline">
                                <Language jp={<>{!passwordVisibility ? "パスワードを表示" : "パスワードを非表示"} </>} en={<>{!passwordVisibility ? "Show Password" : "Hide Password"}</>} />                      
                                </li>
                            </ul>
                    </button>
                </div>
    )
}

export default ShowPassword
