import axios from "axios";
import { handleRequest } from "./handleRequest";
import { access_token } from "./urls";

export const getAccessToken = async () => {
        try {
            const response = await handleRequest({
                    urlName: access_token,
                    requestType: "POST",
                    inputData: null,
            })
            const ok = await response.data.ok
            if(ok !== true){
                    throw new Error("getAccessToken failed")
            }
        const data = await response.data
        return data
        } catch (err: any) {
                const message = err.message
                const name = err.name
                console.log(`name: ${name} message: ${message}`); 
                return name
        }
}