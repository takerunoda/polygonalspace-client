import { Dispatch, SetStateAction, useEffect } from 'react'
import { handleRequestAccessToken } from './handleRequestAccessToken'
import { getAccessToken } from './tokens'
import { send_userbookmark_ids } from './urls'

interface Functionprops {
    userId: string
    setUserBookmarkIds: Dispatch<SetStateAction<string[]>>
    isLoggedin: boolean
}

export const useUserBookmarkIds = ({userId, setUserBookmarkIds, isLoggedin} : Functionprops) => {
    useEffect(() => {
        const x = async () => {
            try {
                const getToken = await getAccessToken()
                        const accessToken = await getToken.accessToken
                        
                        const response = await handleRequestAccessToken({
                        urlData: send_userbookmark_ids,
                        requestType: "POST",
                        inputData: null,
                        accessToken: accessToken,})
                        
                        const ok = response.data.ok
                        if(ok === true){
                            const returnedUserIds = response.data.userBookmarkIds
                            returnedUserIds && setUserBookmarkIds(returnedUserIds)
                            return
                        } else {
                            throw new Error("request failed")
                        }
                    } catch (err) {
                        console.log(err);
                        return
                    }}
        x()
    }, [])  
}