import Cookies from 'js-cookie'

interface FunctionProps {
    path: string
}

export const handleScrollPosition = ({path} : FunctionProps) => {
const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);    
            const position = JSON.stringify(window.pageYOffset)
             Cookies.set(path, position, 
                {expires: inFifteenMinutes})
            }