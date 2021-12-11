import Cookies from 'js-cookie'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface FunctionProps {
    setUserBookmarkIds: Dispatch<SetStateAction<string[]>>,
    isLoggedin: boolean
}

export const useCheckUserBookmarkIds = 
            ({setUserBookmarkIds, isLoggedin} : FunctionProps) => {
                useEffect( () => {
                        const userBookmarkIds = () => {
                            const x = Cookies.get("userBookmarkIds")
                            x && setUserBookmarkIds(JSON.parse(x))
                        }
                    isLoggedin &&  userBookmarkIds()
                }, [])
            }