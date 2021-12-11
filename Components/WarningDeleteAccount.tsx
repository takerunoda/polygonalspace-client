import React from 'react'
import Language from './Language'
import { IoWarningOutline } from 'react-icons/io5'

const WarningDeleteAccount = () => {
    return (
        <>
            <h2 className="authInner">
                <div className="text-red-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                    <IoWarningOutline className="mx-auto" />
                </div>
                <div className="text-base text-gray-700 text-left px-3">
                    <Language jp={<>
                        <p className="my-5">アカウントを削除すると、アカウントデータはデータベースから削除されます。削除したデータを回復することはできません。 </p>
                        <p>アカウントの削除を進める場合は、下のフォームに入力して「削除する」のボタンをクリックしてください。</p>
                    </>} en={<>
                        <p className="my-5">Please be noted that your account data will be removed from database. You cannot undo this deletion process. </p>
                    </>}/> 
                </div>
            </h2>
        </>)}

export default WarningDeleteAccount
