import { Dispatch, SetStateAction, useEffect } from 'react'

interface FunctionProps {
            setIsVisibleScroll: Dispatch<SetStateAction<boolean>>
            showDetailsModal: boolean,
            showShareModal: boolean,
            showArticleModal: boolean,
            showBookmarkModal: boolean,
}

export const useToggleScrollVisivility = ({setIsVisibleScroll, showDetailsModal, showShareModal, showArticleModal, showBookmarkModal} : FunctionProps) => {
            useEffect(() => {
                const toggleVisibility = () => {
                if (window.pageYOffset > 500) {
                    setIsVisibleScroll(true);
                } else {
                    setIsVisibleScroll(false);
                }
                };

                window.addEventListener("scroll", toggleVisibility);

                return () => window.removeEventListener("scroll", toggleVisibility);
            }, []);

        useEffect(() => {
            if(showDetailsModal == true　){
                setIsVisibleScroll(false)
            }
            if(showShareModal == true){
                setIsVisibleScroll(false)
            }
            if(showArticleModal = true ){
                setIsVisibleScroll(false)
            }
            if(showBookmarkModal == true){
                setIsVisibleScroll(false)
            }
        }, [showDetailsModal, showShareModal ,showArticleModal ,showBookmarkModal])

}

