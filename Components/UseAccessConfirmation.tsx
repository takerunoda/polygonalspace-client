import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useUserContext } from '../context/UserContext'
import { useModalContext } from '../context/ModalContext'
import Language from './Language'
import { confirmation } from '../utils/urls'
import { handleRequest } from '../utils/handleRequest'

const UseAccessConfirmation = () => {
    let queryString
    if (typeof window !== "undefined") {
      queryString = window.location.search;
    }
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('id')
    const confirmationToken = urlParams.get('token')
    const { userDispatch } = useUserContext()
    const { handleMessageModal } = useModalContext()
    const router = useRouter()
        const accessConfirmation = async () => {
            router.push('/')
            try {
            const response = userId && confirmationToken && await handleRequest({
                    urlName: `${confirmation}/${userId}/${confirmationToken}`,
                    requestType: "POST",
                    inputData: null,
            })
            const ok = response && await response.data.ok
                if(ok === true && response){
                    userDispatch({
                        type: "SET_VALUES",
                        payload: {
                            accessToken: response.data.accessToken,
                            userId: JSON.parse(response.data.userId),
                            userEmail: response.data.userEmail,
                            userStatus: response.data.userStatus,
                            loginType: response.data.loginType,
                            isLoggedin: true
                        }})
                    const messageData = <Language jp={<>
                        <p>ユーザー登録が完了しました <span className="text-lg">🚀✨</span> 
                        </p>
                    </>} en={<>
                        <p>Successfully created your account<span className="text-lg">🚀✨</span>
                        </p>
                    </>}/>                
                    messageData && handleMessageModal({messageData})
                    router.push("/")
                } else {
                    router.push("/")
                    throw new Error("Error occured")
                }
            } catch (err: any) {
                console.log(err);
            }
        }
    const accessConfirmationRef = useRef(accessConfirmation)

    useEffect(() => {
        const accessConfirmationCurrent = accessConfirmationRef.current
        accessConfirmationCurrent()
    }, [userId, confirmationToken])
    return null
}

export default UseAccessConfirmation