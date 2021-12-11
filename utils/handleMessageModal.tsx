import { Dispatch, SetStateAction } from "react";

interface FunctionProps {
    showMessageModal: boolean
    setShowMessageModal: Dispatch<SetStateAction<boolean>>
    messageData: string | JSX.Element, 
    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
    timeoutId:NodeJS.Timeout | null | undefined, 
    setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
}

export const handleMessageModal = (
                    {   showMessageModal, 
                        setShowMessageModal, 
                        messageData, 
                        setMessage, 
                        timeoutId, 
                        setTimeoutId} : FunctionProps
    ) => {
        setMessage(messageData)
        setShowMessageModal(true) 
    timeoutId && clearTimeout(timeoutId)
    const x = setTimeout(() => {
        setShowMessageModal(false)         
    }, 10000);
    setTimeoutId(x)
}
