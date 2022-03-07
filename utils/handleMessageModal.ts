import { Dispatch, MutableRefObject, SetStateAction } from "react";

interface FunctionProps {
    setShowMessageModal: Dispatch<SetStateAction<boolean>>
    messageData: string | JSX.Element, 
    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
    timeoutRef: MutableRefObject<any>
}

export const handleMessageModalFunction = (
                    {   setShowMessageModal, 
                        messageData, 
                        setMessage, 
                        timeoutRef,
                    } : FunctionProps
    ) => {
        setMessage(messageData)
        setShowMessageModal(true) 
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
        setShowMessageModal(false)         
    }, 10000);
}
