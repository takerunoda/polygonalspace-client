import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import Language from './Language'

interface ComponentProps {
    handleSettings: () => void
}

const SearchSettingsButton = ({handleSettings} : ComponentProps) => {
        return (<div className="text-center mb-10">
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white w-36 py-4 px-4  rounded focus:outline-none cursor-pointer" onClick={handleSettings}>
                <ul className="flex justify-center">
                    <li className="mt-0 sm:mt-0  mr-2 sm:mr-3"><IoSettingsOutline className="text-xl sm:text-2xl text-white"/></li>
                    <li className=" text-sm sm:text-base">
                        <Language jp={"検索設定"} en={<><p></p><p>Settings</p></>} />
                    </li>
                </ul>
            </button>
        </div>)
        }

export default SearchSettingsButton
