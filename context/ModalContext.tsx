import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { ChildrenProps } from "../Interfaces";
import { useCloseModal } from "../utils/useCloseModal";


type ModalContextType = {
  //showArticleModal: Article Modal  
  showArticleModal: boolean
  setShowArticleModal: Dispatch<SetStateAction<boolean>>
  //showShareModal: Share Modal    
  showShareModal: boolean
  setShowShareModal: Dispatch<SetStateAction<boolean>>
  //showDetailsModal: NASA
  showDetailsModal: boolean
  setShowDetailsModal: Dispatch<SetStateAction<boolean>>
  showBookmarkModal: boolean
  setShowBookmarkModal: Dispatch<SetStateAction<boolean>>
  myBookmarkModalToggleConfirm: boolean
  setMyBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
  postModalToggleConfirm: boolean
  setPostModalToggleConfirm: Dispatch<SetStateAction<boolean>>
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
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalWrapper({ children } : ChildrenProps ) {
  const [showArticleModal, setShowArticleModal] = useState<boolean>(false)
  const [showShareModal, setShowShareModal] = useState<boolean>(false)
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)
  const [showBookmarkModal, setShowBookmarkModal] = useState<boolean>(false)
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false)
  const [message, setMessage] = useState<string | JSX.Element>("")
  const [modalToggleConfirmDeleteAccount, setModalToggleConfirmDeleteAccount] = useState<boolean>(false)
  const [myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm] = useState(false)
  const [postModalToggleConfirm, setPostModalToggleConfirm] = useState(false)
  const [addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm] = useState(false)  
  const [resendConfirmModalToggleConfirm, setResendConfirmModalToggleConfirm] = useState(false)  
  const [modalToggleConfirmRequestPasswordReset, setModalToggleConfirmRequestPasswordReset] = useState(false)  
  
  const modalValue = useMemo(() => ({
        showDetailsModal, setShowDetailsModal,
        showShareModal, setShowShareModal,
        showArticleModal, setShowArticleModal,
        showBookmarkModal, setShowBookmarkModal,
        myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm,
        postModalToggleConfirm, setPostModalToggleConfirm,
        showMessageModal, setShowMessageModal,
        modalToggleConfirmDeleteAccount, setModalToggleConfirmDeleteAccount,
        message, setMessage,     
        addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm,
        resendConfirmModalToggleConfirm, setResendConfirmModalToggleConfirm,
        modalToggleConfirmRequestPasswordReset, setModalToggleConfirmRequestPasswordReset,
    }), [
        showDetailsModal, setShowDetailsModal,
        showShareModal, setShowShareModal,
        showArticleModal, setShowArticleModal,
        showBookmarkModal, setShowBookmarkModal,
        myBookmarkModalToggleConfirm, setMyBookmarkModalToggleConfirm,
        postModalToggleConfirm, setPostModalToggleConfirm,
        showMessageModal, setShowMessageModal,
        modalToggleConfirmDeleteAccount, setModalToggleConfirmDeleteAccount,
        message, setMessage,    
        addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm,
        resendConfirmModalToggleConfirm, setResendConfirmModalToggleConfirm,
        modalToggleConfirmRequestPasswordReset, setModalToggleConfirmRequestPasswordReset,
    ])

  useCloseModal({showArticleModal, setShowArticleModal, showShareModal, setShowShareModal, showDetailsModal, setShowDetailsModal, showBookmarkModal, setShowBookmarkModal})

  return (
    <ModalContext.Provider value={modalValue}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}