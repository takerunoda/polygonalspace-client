import React, { Dispatch, SetStateAction } from 'react'
import Language from '../Components/Language'
import { handleMessageModal } from './handleMessageModal'

interface FunctionProps {
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
}

export const checkYourConnection = ({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId} : FunctionProps) => {
                    let messageData 
                        messageData = <Language jp={<>
                            <p>インターネット接続をご確認ください<span className="text-lg"> 🛰</span>
                            </p>
                        </>} en={<>
                            <p>Please Check your internect connection<span className="text-lg"> 🛰</span>
                            </p>
                        </>}/>
                        messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                        return
                }