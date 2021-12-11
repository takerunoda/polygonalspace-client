import { handleRequestAccessToken } from "./handleRequestAccessToken";
import { verify_access_token_delete_post } from "./urls";

interface FunctionProps {
        response: any
        idToSend: {postId: string, authorId: string}
}

export const deletePost = async ({response, idToSend} : FunctionProps) => {
                const accessToken = response.accessToken
        try {
            const response = await handleRequestAccessToken({
                    urlData: verify_access_token_delete_post,
                    requestType: "DELETE",
                    inputData: idToSend,
                    accessToken: accessToken,})

        const ifOK = response.data.ok
                return ifOK
        } catch (err: any) {
                        console.log(err)
                        const ifOK = false
                        return ifOK
                }
        }