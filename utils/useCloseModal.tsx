import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'

interface FunctionProps {
  showArticleModal: boolean
  setShowArticleModal: Dispatch<SetStateAction<boolean>>
  showShareModal: boolean
  setShowShareModal: Dispatch<SetStateAction<boolean>>
  showDetailsModal: boolean
  setShowDetailsModal: Dispatch<SetStateAction<boolean>>
  showBookmarkModal: boolean
  setShowBookmarkModal: Dispatch<SetStateAction<boolean>>
}

export const useCloseModal = ({showArticleModal, setShowArticleModal, showShareModal, setShowShareModal, showDetailsModal, setShowDetailsModal, showBookmarkModal, setShowBookmarkModal} : FunctionProps) => {
//if a modal is opened, the other modals will be closed
  useEffect(() => {
    if(showArticleModal){
        setShowShareModal(false)
        setShowDetailsModal(false)
        setShowBookmarkModal(false)
    }
    if(showDetailsModal){
        setShowShareModal(false)
        setShowArticleModal(false)
        setShowBookmarkModal(false)
    }
    if(showShareModal){
        setShowArticleModal(false)
        setShowDetailsModal(false)
        setShowBookmarkModal(false)
    }
    if(showDetailsModal){
        setShowArticleModal(false)
        setShowShareModal(false)
        setShowBookmarkModal(false)
    }

  }, [showDetailsModal, setShowDetailsModal,
        showShareModal, setShowShareModal,
        showArticleModal, setShowArticleModal,
        showBookmarkModal, setShowBookmarkModal,
      ])
  
  // const router = useRouter()
  // const currentPage = router.pathname
}