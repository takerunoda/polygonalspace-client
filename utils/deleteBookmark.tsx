import { handleRequestAccessToken } from "./handleRequestAccessToken";
import { my_bookmark_delete } from "./urls";

interface FunctionProps {
    response: any, 
    imageId: string
}


export const deleteBookmark = async ({response,  imageId} : FunctionProps) => {
        const accessToken = await response.accessToken
        let ifIsOK: boolean = false
        try { 
            const response = await handleRequestAccessToken({
                    urlData: my_bookmark_delete,
                    requestType: "PUT",
                    inputData: {imageId: imageId},
                    accessToken: accessToken,})

                const ok = await response.data.ok
                if( ok === true){
                        ifIsOK = true
                }
                    return ifIsOK        
        } catch (err: any) {
                console.log(err)
                return ifIsOK
        }
}