import { Dispatch, SetStateAction } from "react";
import Language from "../Components/Language";
import { my_bookmark_add } from "./urls";
import { checkYourConnection } from "./checkYourConnection";
import { handleRequestAccessToken } from "./handleRequestAccessToken";

interface FunctionProps {
    response: any, 
    imageId: string
    mediaType: string
    imageUrl: string
    setLoadingClickBookmark: Dispatch<SetStateAction<boolean>>
    setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
    handleMessageModal: ({ messageData }: {
        messageData: string | JSX.Element;
    }) => void
}

export const updateBookmark = async ({response,  imageId, mediaType, imageUrl, setLoadingClickBookmark, setAddBookmarkModalToggleConfirm, handleMessageModal} : FunctionProps) => {
        const accessToken = await response.accessToken
        try { 
            const response = await handleRequestAccessToken({
                    urlName: my_bookmark_add,
                    requestType: "PUT",
                    inputData: {imageId, mediaType, imageUrl},
                    accessToken,})

                    const responseTwo = response.data.ok
                    return responseTwo
                } catch (err: any) {
                console.log(`${err}`);
                setAddBookmarkModalToggleConfirm(false)
                setLoadingClickBookmark(false)
                if(err) {
                    if(err.message === "Network Error"){
                        checkYourConnection({handleMessageModal})
                        return
                    }
                let messageData                
                if(err.response && err.response.data.errors){
                    if(err.response.data.errors === "alreadyBookmarked"){
                    messageData = <Language jp={<p>ブックマーク済みのアイテムです。<span className="text-lg"></span></p>} en={<p>Already Bookmarked</p>}/>
                }} else {
                    messageData = <Language jp={<p>ブックマークできませんでした。<span className="text-lg"></span></p>} en={<p>Bookmark Failed</p>}/>
                }
                messageData && handleMessageModal({messageData})
            }
            return
        }
    }