import { useEffect, useRef } from 'react'
import { useModalContext } from '../context/ModalContext'
import { useSearchContext } from '../context/SearchContext'

export const useShowSearchSettings = () => {
    const { showMessageModal } = useModalContext()  
    const { setShowSearchSettings } = useSearchContext()
    const setShowSearchSettingsRef = useRef(setShowSearchSettings)
    useEffect(() => {
        const setShowSearchSettingsCurrent = setShowSearchSettingsRef.current
        showMessageModal && setShowSearchSettingsCurrent(false)
    }, [showMessageModal])

}

