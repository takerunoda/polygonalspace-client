import { useEffect } from 'react'
import { usePageContext } from '../context/PageContext'

export const useCancelOverflowHidden = () => {
  const {pathName} = usePageContext()
    useEffect(() => {
        const bodyOverflowHidden = () => {
            if(pathName !== "/" 
            && pathName !== "/nasa-search-custom" 
            && !pathName.includes("bookmark_details") 
            ){ document.body.style.overflow = "visible"}         
        }
        bodyOverflowHidden()
    }, [pathName])
}