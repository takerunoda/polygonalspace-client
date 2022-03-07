import { createContext, Dispatch, MutableRefObject, SetStateAction, useCallback, useContext, useMemo, useRef, useState } from "react"
import { ChildrenProps } from "../Interfaces";
import { handleNASAModalClose } from "../utils/handleNASAModalClose";
import { handleMessageModalFunction } from "../utils/handleMessageModal";

type ModalContextType = {
  showDetailsModal: boolean
  setShowDetailsModal: Dispatch<SetStateAction<boolean>>
  myBookmarkModalToggleConfirm: boolean
  setMyBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
  showMessageModal: boolean
  setShowMessageModal: Dispatch<SetStateAction<boolean>>
  modalToggleConfirmDeleteAccount: boolean
  setModalToggleConfirmDeleteAccount: Dispatch<SetStateAction<boolean>>
  modalToggleConfirmRequestPasswordReset: boolean
  setModalToggleConfirmRequestPasswordReset: Dispatch<SetStateAction<boolean>>
  message: string | JSX.Element
  setMessage: Dispatch<SetStateAction<string | JSX.Element>>
  addBookmarkModalToggleConfirm: boolean
  setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
  resendConfirmModalToggleConfirm: boolean
  setResendConfirmModalToggleConfirm: Dispatch<SetStateAction<boolean>>
  timeoutRef: MutableRefObject<any>
  handleMessageModal: ({ messageData }: {
      messageData: string | JSX.Element;
    }) => void
  handleNASAModalCloseFn: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalWrapper({ children } : ChildrenProps ) {
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false)
  const [message, setMessage] = useState<string | JSX.Element>("")
  const [modalToggleConfirmDeleteAccount, setModalToggleConfirmDeleteAccount] = useState<boolean>(false)
  const [myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm] = useState<boolean>(false)
  const [addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm] = useState<boolean>(false)  
  const [resendConfirmModalToggleConfirm, setResendConfirmModalToggleConfirm] = useState<boolean>(false)  
  const [modalToggleConfirmRequestPasswordReset, setModalToggleConfirmRequestPasswordReset] = useState<boolean>(false)  
  const timeoutRef = useRef<any>()
  const handleMessageModal = useCallback(({ messageData } : {messageData: string | JSX.Element}) => handleMessageModalFunction({ setShowMessageModal, messageData, setMessage, timeoutRef}), [])
  const handleNASAModalCloseFn = useCallback(() => {
        handleNASAModalClose({
          setShowDetailsModal,
          setAddBookmarkModalToggleConfirm})
  }, [])
  
  const modalValue = useMemo(() => ({
        showDetailsModal, setShowDetailsModal,
        myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm,
        showMessageModal, setShowMessageModal,
        modalToggleConfirmDeleteAccount, setModalToggleConfirmDeleteAccount,
        message, setMessage,     
        addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm,
        resendConfirmModalToggleConfirm, setResendConfirmModalToggleConfirm,
        modalToggleConfirmRequestPasswordReset, setModalToggleConfirmRequestPasswordReset,
        timeoutRef,
        handleMessageModal,
        handleNASAModalCloseFn,
    }), [
        showDetailsModal, setShowDetailsModal,
        myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm,
        showMessageModal, setShowMessageModal,
        modalToggleConfirmDeleteAccount, setModalToggleConfirmDeleteAccount,
        message, setMessage,    
        addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm,
        resendConfirmModalToggleConfirm, setResendConfirmModalToggleConfirm,
        modalToggleConfirmRequestPasswordReset, setModalToggleConfirmRequestPasswordReset,
        timeoutRef,
        handleMessageModal,
        handleNASAModalCloseFn,
    ])

  return (
    <ModalContext.Provider value={modalValue}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
    const context = useContext(ModalContext)
        if (context === undefined) {
            throw new Error('useContext(ModalContext) is undefined')
        }
    return context
}