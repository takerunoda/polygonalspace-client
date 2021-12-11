import { Dispatch, SetStateAction, useEffect } from 'react'
import { getAccessToken } from './tokens'

interface FunctionProps {
    setUserStatusAdmin: Dispatch<SetStateAction<string | undefined>>
}

const useSetUserStatusAdmin = ({setUserStatusAdmin} : FunctionProps) => {
        useEffect(() => {
        let userStatus: string | undefined
        const A = async () => {
            const response = await getAccessToken()
            if(response.ok === true){
                userStatus = response.userStatus
                userStatus && setUserStatusAdmin(userStatus)            
            }}
            A()            
        }, [])
    }

export default useSetUserStatusAdmin
