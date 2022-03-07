import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { usePageContext } from '../context/PageContext'

export const useSetPathName = () => {
  const {setPathName} = usePageContext()
  const router = useRouter()
    const currentPage = router.pathname
    const setPathNameRef = useRef(setPathName)
    useEffect(() => { 
      const setPathNameCurrent = setPathNameRef.current
      setPathNameCurrent(currentPage)
  }, [currentPage])
}
