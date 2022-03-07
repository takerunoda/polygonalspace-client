import React from 'react'
import { useFunctionsContext } from '../context/FunctionsContext';

const RequestPasswordResetYesButton = () => {
    
    const {handleRequestPasswordResetFn} = useFunctionsContext()

    return (
        <>
            <button className="buttonIndigo mr-4" onClick={handleRequestPasswordResetFn}>Yes</button>            
        </>
    )
}

export default RequestPasswordResetYesButton
