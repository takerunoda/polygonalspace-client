import Cookies from 'js-cookie'
import { useEffect } from 'react'

interface FunctionProps {
    path: string
}

export const useScrollPosition = ({path} : FunctionProps) => {
    useEffect(() => {
        const x = Cookies.get(path)
        const position = x ? JSON.parse(x) : 0
         window.scrollTo({
             top: position,
         })
        }, [])
}