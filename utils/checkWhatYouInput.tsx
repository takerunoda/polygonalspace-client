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

export const checkWhatYouInput = ({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId} : FunctionProps) => {
                    let messageData 
                        messageData = <Language jp={<>
                            <p>入力内容をご確認ください<span className="text-lg"> 📝</span>
                            </p>
                        </>} en={<>
                            <p>Please make sure all fields are filled in correctly<span className="text-lg"> 📝</span>
                            </p>
                        </>}/>
                        messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
                        return
                }