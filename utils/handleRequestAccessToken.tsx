import axios from "axios";

interface FunctionProps {
    urlData: string
    requestType: "POST" | "PUT" | "DELETE" | "GET"
    inputData: any
    accessToken: string
}
export const handleRequestAccessToken = async ({urlData, requestType, inputData, accessToken} : FunctionProps) => {
        const url  = `${process.env.NODE_ENV === 'production' ?
                    process.env.NEXT_PUBLIC_SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL_2}/${urlData}`
        const response = await axios({
                    method: requestType,
                    url: url,
                    data: inputData,
                    headers: {"authorization" : `Bearer ${accessToken}`},    
                    withCredentials: true
                    });
        return response
}