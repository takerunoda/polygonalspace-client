import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { delete_account_google } from './urls';
import { handleRequestAccessToken } from './handleRequestAccessToken';

interface FunctionProps {
        inputData: {
            userEmail: string;
            password: string;
        }
        userDispatch: Dispatch<any>
        router: NextRouter
        setLoadingDeleteAccount: Dispatch<SetStateAction<boolean>>
        accessToken: string
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
}
    export const handleDeleteAccountGoogle =  async (res: any, {inputData, userDispatch, router, setLoadingDeleteAccount, accessToken, handleMessageModal} : FunctionProps
        ) => {
        setLoadingDeleteAccount(true)
        try { 
            if(!res){
                throw new Error("Authentication failed")
            }
            const googleToken = res.tokenId
            const { userEmail } = inputData
            const inputDataGoogle = { 
                                        userEmail: userEmail,
                                        googleToken: googleToken
                                    }

            const response = await handleRequestAccessToken({
                    urlName: delete_account_google,
                    requestType: "DELETE",
                    inputData: inputDataGoogle,
                    accessToken,})
                    if(response.data.ok == true){
                    setLoadingDeleteAccount(false)
                    const messageData = <Language jp={<>
                        <p>アカウントを削除しました
                            <span className="text-2xl"></span>
                        </p>
                    </>} en={<>
                        <p>Account has been deleted
                            <span className="text-2xl"></span>
                        </p>
                    </>}/>
                    messageData && handleMessageModal({messageData})
                        userDispatch({type: "NULL"})
                        router.push("/")
                    }
                    return
         } catch (err: any) {
                if(err) { if(err.response.data.errors.userEmail){
                const errorType = err.response.data.errors.userEmail
                let messageData
                if(errorType === "emailsDoNotMatch"){
                    messageData = <Language jp={<p>メールアドレスが一致しません<span className="text-2xl"></span></p>} en={<p>Emails do not match<span className="text-2xl"></span></p>}/>
                }  
                else {return}
                handleMessageModal({messageData})
                }
            }
        setLoadingDeleteAccount(false)
        }
    }