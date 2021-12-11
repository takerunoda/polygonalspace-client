import { Dispatch, SetStateAction } from "react";
import Language from "../Components/Language";
import { checkYourConnection } from "./checkYourConnection";
import { handleMessageModal } from "./handleMessageModal";

interface FunctionProps {
        showMessageModal: boolean
        setShowMessageModal: Dispatch<SetStateAction<boolean>>
        setMessage: Dispatch<SetStateAction<string | JSX.Element>>
        timeoutId: NodeJS.Timeout | null | undefined
        setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
}

export const googleError = (err:any, {showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId} : FunctionProps) => {
    if(err.message === "Network Error"){
        checkYourConnection({showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId})
        return
    }
    if(err.error === "popup_closed_by_user"){
        return
    }
    let messageData
        messageData = <Language jp={<>
            <p>Googleログインできません<span className="text-lg"> 🔐</span>
            </p>
        </>} en={<>
            <p>Cannot proceed to Google Login<span className="text-lg"> 🔐</span>
            </p>
        </>}/>
        messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
        return

}
