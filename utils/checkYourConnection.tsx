import React from 'react'
import Language from '../Components/Language'

interface FunctionProps {
            handleMessageModal: ({ messageData }: {
                messageData: string | JSX.Element;
            }) => void
    }

export const checkYourConnection = ({handleMessageModal} : FunctionProps) => {
                    let messageData 
                        messageData = <Language jp={<>
                            <p>インターネット接続をご確認ください<span className="text-lg"> 🛰</span>
                            </p>
                        </>} en={<>
                            <p>Please Check your internect connection<span className="text-lg"> 🛰</span>
                            </p>
                        </>}/>
                        messageData && handleMessageModal({messageData})
                        return
                }