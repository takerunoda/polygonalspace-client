import { MutableRefObject, SetStateAction, useEffect, useRef } from 'react'

interface FunctionProps {
    pageChangeInitial: any
    setIsVisibleGeneralInitial: (value: SetStateAction<boolean>) => void
    elementInitialRef: MutableRefObject<any>
}

export const useHandleObserverGeneralInitial = ({pageChangeInitial,  
    setIsVisibleGeneralInitial, elementInitialRef } : FunctionProps) => {
        const handlePageChangeRef = useRef(pageChangeInitial)
        const callback = (entries: any) => {
                const firstOne = entries[0]
                setIsVisibleGeneralInitial(firstOne.isIntersecting)
                if(firstOne.isIntersecting){
                    handlePageChangeRef.current()
                }
        } 
        const options = { 
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }
        const interSection = (typeof window === "undefined") ? null : new IntersectionObserver(callback, options)
        const observer = useRef(interSection)

        useEffect(() => {
                handlePageChangeRef.current = pageChangeInitial;
            }, [pageChangeInitial]);

        useEffect(() => {
            if(typeof window === "undefined") return
            const currentElement = elementInitialRef.current
            const currentObserver = observer.current
            if(currentElement) {
                currentObserver && currentObserver.observe(currentElement)
            }
            return () => {
                if(currentElement){
                    currentObserver && currentObserver.unobserve(currentElement)
                }}
        }, [elementInitialRef])
}