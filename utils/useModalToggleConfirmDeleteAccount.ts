import { useEffect, useRef } from 'react'
import { useModalContext } from '../context/ModalContext'

const useModalToggleConfirmDeleteAccount = () => {
    
    const { showMessageModal, 
            setModalToggleConfirmDeleteAccount } = useModalContext()
    const setModalToggleConfirmRef = useRef(setModalToggleConfirmDeleteAccount)
    useEffect(() => {
        const setModalToggleConfirmCurrent = setModalToggleConfirmRef.current
        showMessageModal && setModalToggleConfirmCurrent(false)
    }, [showMessageModal])
}

export default useModalToggleConfirmDeleteAccount