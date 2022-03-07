import React, { useState } from 'react'
import Language from './Language'
import { translation } from '../utils/translation'

interface ComponentProps {
   handleOnclick: () => void
   translationString: string
}

const ProceedButton = (
    {handleOnclick, translationString} : ComponentProps) => {
    const [translationProceed] = useState(translation.filter(item => item.key === translationString)[0])

    return (
        <div className="mt-8">
            <button className="w-60 md:w-80 border-purple-500 border-2 text-purple-500 py-5 rounded focus:outline-none cursor-pointer mx-auto mt-2 hoverBlueBack font-bold"
            onClick={handleOnclick}>
                <Language jp={translationProceed.jp} en={translationProceed.en}/>
            </button>
        </div>
    )
}

export default ProceedButton
