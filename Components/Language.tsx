import React from 'react'
import { usePageContext } from '../context/PageContext'

interface ComponentProps {
    jp: string | JSX.Element
    en: string | JSX.Element
}

const Language = ({jp, en} : ComponentProps) => {
    const pageContext = usePageContext()
    if(!pageContext) {
        return null
    }
    const {language} = pageContext
    return (
        <>
           {language ? jp : en} 
        </>
    )
}

export default Language
