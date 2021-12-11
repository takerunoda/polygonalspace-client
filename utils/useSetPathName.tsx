import { Dispatch, SetStateAction, useEffect } from 'react'
import { NextRouter } from 'next/router'

interface FunctionProps {
    router: NextRouter
    setPathName: Dispatch<SetStateAction<string>>

}

export const useSetPathName = ({router, setPathName} : FunctionProps) => {
    const currentPage = router.pathname
    
    useEffect(() => { 
      setPathName(currentPage)
  }, [currentPage])
}
