import React from 'react'
import { useFunctionsContext } from '../context/FunctionsContext';

const ResendConfirmationYesButton = () => {
    const {handleResendConfirmationFn} = useFunctionsContext()

    return (
        <>
            <button 
            className="buttonIndigo mr-4" 
            onClick={handleResendConfirmationFn}>Yes</button>            
        </>
    )
}

export default ResendConfirmationYesButton
