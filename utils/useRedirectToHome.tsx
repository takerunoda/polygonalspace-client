import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useRedirectToHomeLoggedin = (isLoggedin: boolean) => {
    const router = useRouter()
    useEffect(() => {
        if(isLoggedin){
            router.push('/')
        }
    }, [isLoggedin])
}

export const useRedirectToHomeNotLoggedin = (isLoggedin: boolean) => {
    const router = useRouter()
    useEffect(() => {
        if(isLoggedin !== true){
            router.push('/')
        }
    }, [isLoggedin])
}