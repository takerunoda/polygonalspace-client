import { useEffect, useRef } from 'react'
import { useUserContext } from '../context/UserContext'
import { handleRequestAccessToken } from './handleRequestAccessToken'
import { getAccessToken } from './tokens'
import { send_userbookmark_ids } from './urls'

export const useUserBookmarkIds = () => {
    const { setUserBookmarkIds, 
            userState: {isLoggedin} } = useUserContext()
    const setUserBookmarkIdsRef = useRef(setUserBookmarkIds)
    useEffect(() => {
        const setUserBookmarkIdsCurrent = setUserBookmarkIdsRef.current
        const x = async () => {
            if(isLoggedin === false) return
            try {
                const getToken = await getAccessToken()
                        const accessToken = await getToken.accessToken
                        const response = await handleRequestAccessToken({
                        urlName: send_userbookmark_ids,
                        requestType: "POST",
                        inputData: null,
                        accessToken,})
                        
                        const ok = response.data.ok
                        if(ok === true){
                            const returnedUserIds = response.data.userBookmarkIds
                            returnedUserIds && setUserBookmarkIdsCurrent(returnedUserIds)
                            return
                        } else {
                            throw new Error("request failed")
                        }
                    } catch (err) {
                        console.log(err);
                        return
                    }}
        x()
    }, [isLoggedin])  
}