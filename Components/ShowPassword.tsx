import React from 'react'
import { usePageContext } from '../context/PageContext';
import Language from './Language';
import { RiLockPasswordLine } from 'react-icons/ri';

interface ComponentProps {
    handleOnclickShowPassword: () => void
}

const ShowPassword = ({handleOnclickShowPassword}: ComponentProps) => {
    const { passwordVisibility } = usePageContext()
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
