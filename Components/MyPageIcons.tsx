import React from 'react'
import Language from './Language'
import { AiOutlineMail } from 'react-icons/ai'
import { HiOutlineIdentification } from 'react-icons/hi'
import { RiCalendarCheckFill, RiLockPasswordLine } from 'react-icons/ri'
import { IoMdLogIn } from 'react-icons/io'

interface ComponentProps {
    titleKey: string
}
const MyPageIcons = ({titleKey} : ComponentProps) => {
    return (
        <ul className="text-base sm:text-xl font-bold my-2 flex">
            <li className="text-3xl text-purple-500 mr-3">
                {titleKey === "userId" && <HiOutlineIdentification />}
                {titleKey === "userEmail" && <AiOutlineMail />}
                {titleKey === "joined" && <RiCalendarCheckFill />}
                {titleKey === "passwordLogin" && <RiLockPasswordLine />}
                {titleKey === "googleLogin" && <IoMdLogIn />}
            </li>
            <li className="mt-1 sm:mt-0">
                {titleKey === "userId" && 
                <Language jp={"ユーザーID"} en={"User ID"}/>}
                {titleKey === "userEmail" && <Language jp={"メールアドレス"} en={"Email Address"}/>}
                {titleKey === "joined" && <Language jp={"アカウント作成日"} en={"Joined"}/>}
                {titleKey === "passwordLogin" && <Language jp={"パスワードログイン"} en={"Password Login"}/>}     
                {titleKey === "googleLogin" && <Language jp={"Google Login"} en={"Google Login"}/>}     
            </li>
        </ul>)
        }

export default MyPageIcons
