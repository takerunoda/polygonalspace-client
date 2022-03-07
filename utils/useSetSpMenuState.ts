import { useEffect, useRef } from 'react'
import { usePageContext } from '../context/PageContext'

export const useSetSpMenuState = () => {
  const {setSpMenuState, pathName} = usePageContext()
//Close the mobile menu  when page is changed
  const setSpMenuStateRef = useRef(setSpMenuState)
  useEffect(() => {
    const setSpMenuStateCurrent = setSpMenuStateRef.current
    setSpMenuStateCurrent(false)
  }, [pathName])
}