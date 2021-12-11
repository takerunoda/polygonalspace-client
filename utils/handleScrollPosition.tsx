import Cookies from 'js-cookie'

interface FunctionProps {
    path: string
}

export const handleScrollPosition = ({path} : FunctionProps) => {
            const position = JSON.stringify(window.pageYOffset)
             Cookies.set(path, position)
            }