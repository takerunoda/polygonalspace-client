import React, { Dispatch, SetStateAction } from 'react'

interface FunctionProps {
    modalRef: any,
     setShowModal: Dispatch<SetStateAction<boolean>>
}

export const clickOutsideModal = (
    e : React.MouseEvent, {modalRef, setShowModal} : FunctionProps) => {
        if(!modalRef.current) return
        // FYI https://github.com/Microsoft/TypeScript/issues/15394
        if(!modalRef.current.contains(e.target as Node)){
            setShowModal(false)
        }
    }