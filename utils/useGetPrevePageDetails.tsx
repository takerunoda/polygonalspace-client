import Cookies from 'js-cookie'
import { Dispatch, SetStateAction, useEffect } from 'react'

    export const useGetPrevePageDetails = (setParentPage: Dispatch<SetStateAction<string>>
) => {
        useEffect(() => {
            const x = Cookies.get("prevePageDetails")
            const y = x && JSON.parse(x)
            setParentPage(y)
        }, [])
    }
