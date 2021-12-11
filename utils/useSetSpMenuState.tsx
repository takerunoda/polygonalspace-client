import { Dispatch, SetStateAction, useEffect } from 'react'

interface FunctionProps {
    setSpMenuState: Dispatch<SetStateAction<boolean>>
    pathName: string
}

export const useSetSpMenuState = ({setSpMenuState, pathName} : FunctionProps) => {
//Close the mobile menu  when page is changed
  useEffect(() => {
    setSpMenuState(false)
  }, [pathName])
}