import { useEffect, useRef } from 'react'
import { usePageContext } from '../context/PageContext'

export const useResize = () => {
    const {width, setWidth, setSpMenuState} = usePageContext()
    const setWidthRef = useRef(setWidth)
    const setSpMenuStateRef = useRef(setSpMenuState)
    
    useEffect(() => {
        const setWidthCurrent = setWidthRef.current
        const handleResize = () => {
            setWidthCurrent(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const setSpMenuStateCurrent = setSpMenuStateRef.current
        width && width > 600 && setSpMenuStateCurrent(false) 
    }, [width])
}