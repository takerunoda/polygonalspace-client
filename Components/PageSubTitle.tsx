import React from 'react'
import Language from './Language'

interface ComponentProps {
    jp: string | JSX.Element
    en: string | JSX.Element
}
const PageSubTitle = ({jp, en} : ComponentProps) => {
    return (
            <div className="text-center">
                <h2 className="font-bold text-base w-72 sm:w-96 sm:text-lg mx-auto py-3 px-5 sm:py-5 sm:px-16 rounded border border-purple-400 mb-8 sm:mb-16 text-center inline-block content-center">
                    <Language 
                        jp={jp} 
                        en={en}/>
                </h2>
            </div>)}

export default PageSubTitle
