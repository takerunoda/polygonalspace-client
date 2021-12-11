import React from 'react'
import Language from './Language'

interface ComponentProps {
    translationObject: {
    key: string;
    jp: string;
    en: string;
} | null
}

const ReadBefore = ({translationObject}: ComponentProps) => {
    return (
        <h2 className="text-base sm:text-lg text-blue-500 my-8 px-7 text-left">
            {translationObject && <Language jp={translationObject.jp} en={translationObject.en}/>}
        </h2>
    )
}

export default ReadBefore
