import Cookies from 'js-cookie'
import { useEffect } from 'react'

export const useSetPrevePageDetails = (pathName: string) => {
        useEffect(() => {
            Cookies.set("prevePageDetails", JSON.stringify(pathName))
        }, [pathName])
    }
