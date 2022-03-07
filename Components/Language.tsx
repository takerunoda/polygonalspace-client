import React from 'react'
import { usePageContext } from '../context/PageContext'

interface ComponentProps {
    jp: string | JSX.Element
    en: string | JSX.Element
}

const Language = ({jp, en} : ComponentProps) => {
    const {language} = usePageContext()
    return (
        <>
           {language ? jp : en} 
        </>
    )
}

export default Language
