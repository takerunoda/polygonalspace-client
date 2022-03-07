import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useModalContext } from '../context/ModalContext'

interface FunctionProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const useShowModalGeneral = ({setShowModal} : FunctionProps) => {
    const setShowModalRef = useRef(setShowModal)
    const { showMessageModal } = useModalContext()  

    useEffect(() => {
        const setShowModalCurrent = setShowModalRef.current
        showMessageModal && setShowModalCurrent(false)
    }, [showMessageModal])

}

