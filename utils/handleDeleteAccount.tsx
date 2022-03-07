import { NextRouter } from 'next/router';
import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language';
import { delete_account } from './urls';
import { handleRequestAccessToken } from './handleRequestAccessToken';

interface FunctionProps {
        inputData: {
            userEmail: string;
            password: string;
        }
        userDispatch: Dispatch<any>
        setModalToggleConfirm: Dispatch<SetStateAction<boolean>>
        router: NextRouter
        language: boolean
        setLoadingDeleteAccount: Dispatch<SetStateAction<boolean>>
        accessToken: string
        handleMessageModal: ({ messageData }: {
            messageData: string | JSX.Element;
        }) => void
    }
    export const handleDeleteAccount =  async ({inputData, router, userDispatch, language, setLoadingDeleteAccount: setLoadingDeleteAccount, accessToken, setModalToggleConfirm, handleMessageModal} : FunctionProps
        ) => {
        setLoadingDeleteAccount(true)
        setModalToggleConfirm(false)
        try {
            const response = await handleRequestAccessToken({
                    urlName: delete_account,
                    requestType: "DELETE",
                    inputData: {...inputData, language: language},
                    accessToken})
                    if(response.data.ok == true){
                    setLoadingDeleteAccount(false)
                    const messageData = <Language jp={<>
                        <p>アカウントを削除しました
                            <span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>Account has been deleted
                            <span className="text-lg"></span>
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
                if(errorType === "userNotExist"){
                    messageData = <Language jp={<p>メールアドレスまたはパスワードが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name or password</p>}/>
                }  
                else {return}
                handleMessageModal({messageData})
            } else if (err.response.data.errors.password){
                const errorType = err.response.data.errors.password
                let messageData
                if(errorType === "incorrectPassword"){
                    messageData =<Language jp={<p>メールアドレスまたはパスワードが正しくありません<span className="text-lg"></span></p>} en={<p>Incorrect user name or password<span className="text-lg"></span></p>}/>
                } else {return}
                handleMessageModal({messageData})
            }}
            setLoadingDeleteAccount(false)
        }
    }
