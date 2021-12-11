import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface FunctionProps {
    showModal: boolean
}

export const useBodyOverflowHiddenNav = ({showModal} : FunctionProps) => {
    const router = useRouter()
    const currentPage = router.pathname

    const bodyOverflowHidden = () => {
        if(showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "visible"
        }
    }
    useEffect(() => {
        bodyOverflowHidden()
    }, [showModal, currentPage])
}