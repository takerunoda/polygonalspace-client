import React, { Dispatch, SetStateAction, useEffect } from 'react'

interface FunctionProps {
    width: number
    setWidth: Dispatch<SetStateAction<number>>
    setSpMenuState: Dispatch<SetStateAction<boolean>>
}

export const useResize = ({width, setWidth, setSpMenuState} : FunctionProps) => {
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
           width && width > 600 && setSpMenuState(false) 
    }, [width])

}