import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { usePageContext } from '../context/PageContext'

export const useBodyOverflowHiddenNav = () => {
    const {spMenuState} = usePageContext()
    const router = useRouter()
    const currentPage = router.pathname
    useEffect(() => {
        const bodyOverflowHidden = () => {
            if(spMenuState) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "visible"
            }
        }
        bodyOverflowHidden()
    }, [spMenuState, currentPage])
}