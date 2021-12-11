import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { useModalContext } from '../context/ModalContext';
import { scrollToTop } from '../utils/scrollToTop';
import { useToggleScrollVisivility } from '../utils/useToggleScrollVisivility';

const ScrollTop = () => {
        const [isVisibleScroll, setIsVisibleScroll] = useState(false);
        const modalContext = useModalContext()
        if ( !modalContext ) {
        return null;
        }
        const {
                showDetailsModal, 
                showShareModal, 
                showArticleModal, 
                showBookmarkModal, 
        } = modalContext

        useToggleScrollVisivility({setIsVisibleScroll, showDetailsModal, showShareModal, showArticleModal, showBookmarkModal})

    return (
            !showDetailsModal && 
            !showShareModal && 
            !showArticleModal &&
            !showBookmarkModal  && 
            isVisibleScroll ?
            (<div onClick={scrollToTop} className="bg-white border-4 border-yellow-500 rounded-full text-yellow-500 text-6xl opacity-60 hover:opacity-100 cursor-pointer fixed right-4 bottom-4 sm:right-16 sm:bottom-20 z-50 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white">
                <IoIosArrowUp />
            </div>) : <></>
    )
}

export default ScrollTop
