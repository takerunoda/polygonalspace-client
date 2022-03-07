import { Dispatch, SetStateAction } from "react"

interface FunctionProps {
    setShowDetailsModal: Dispatch<SetStateAction<boolean>>
    setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
}

export const handleNASAModalClose = async (
    {setShowDetailsModal,
    setAddBookmarkModalToggleConfirm} : FunctionProps
    ) => {  setAddBookmarkModalToggleConfirm(false)
            setShowDetailsModal(false)
        }
