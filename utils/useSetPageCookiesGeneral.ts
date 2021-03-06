import Cookies from 'js-cookie'
import { useEffect } from 'react'

interface FunctionProps {
    currentPage: number
    currentPageCookie: string
    totalPages: number
    totalPagesCookie: string
}

export const useSetPageCookiesGeneral = (
    { currentPage, currentPageCookie, totalPages, totalPagesCookie, } : FunctionProps) => {
        useEffect(() => {
        const in30Minutes = 1/48
        Cookies.set(currentPageCookie, JSON.stringify(currentPage), {expires: in30Minutes})
        Cookies.set(totalPagesCookie, JSON.stringify(totalPages), {expires: in30Minutes})
    }, [currentPage, currentPageCookie, totalPages, totalPagesCookie])
}