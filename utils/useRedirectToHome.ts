import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '../context/UserContext'

export const useRedirectToHomeLoggedin = () => {
    const {userState: {isLoggedin}} = useUserContext()
    const router = useRouter()
    const routerRef = useRef(router)
    useEffect(() => {
        const routerCurrent = routerRef.current
        if(isLoggedin){
            routerCurrent.push('/')
        }
    }, [isLoggedin])
}