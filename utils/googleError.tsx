import Language from "../Components/Language";
import { checkYourConnection } from "./checkYourConnection";

interface FunctionProps {
        handleMessageModal: ({ messageData }: {
                        messageData: string | JSX.Element;
                    }) => void        
}

export const googleError = (err:any, {handleMessageModal} : FunctionProps) => {
    if(err.message === "Network Error"){
        checkYourConnection({handleMessageModal})
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
        messageData && handleMessageModal({messageData})
        return

}
