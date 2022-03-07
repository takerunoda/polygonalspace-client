import React from 'react'
import Language from './Language';
import { usePageContext } from '../context/PageContext'
import { IoLanguage } from 'react-icons/io5';
import { VscArrowBoth } from 'react-icons/vsc';

const LanguageToggle = () => {
    const { language, setLanguage } = usePageContext()
    const onClickLanguage = () => {
        setLanguage(!language)
    }

    return (
        <div className="ml-auto">
            <div className="flex">
                <div className="text-2xl mt-1">
                    <IoLanguage />
                </div>
                <div className={`w-44 ml-2 flex justify-start font-medium text-indigo-500`} style={{ lineHeight:"30px"}}>
                    <Language jp={"Language : JP"} en={"言語を選択 : 日 "}/>
                    <div className="mx-1 mt-2">
                        <VscArrowBoth />
                    </div>
                    <Language jp={"EN"} en={"英"}/>
                </div>
            </div>

            <div className="flex mt-3">
                <label className="switch">
                    <input type="checkbox" onClick={onClickLanguage}/>
                    <span className="slider round"></span>
                </label>
                <div className="leading-6 ml-5"><Language jp={"日本語"} en={"English"}/></div>
            </div>
        </div>
    )
}

export default LanguageToggle
