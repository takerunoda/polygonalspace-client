import { useEffect } from 'react'

interface FunctionProps {
    pathName: string;
}

export const useCancelOverflowHidden = ({pathName} : FunctionProps) => {
    const bodyOverflowHidden = () => {
        if(pathName !== "/" 
        && pathName !== "/nasa-search-custom" 
        && !pathName.includes("bookmark_details") 
        ){ document.body.style.overflow = "visible"}         
    }
    useEffect(() => {
        bodyOverflowHidden()
    }, [pathName])
}