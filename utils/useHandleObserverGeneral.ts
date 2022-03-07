import { MutableRefObject, SetStateAction, useEffect, useRef } from 'react'

interface FunctionProps {
    pageChange: any
    setIsVisibleGeneral: (value: SetStateAction<boolean>) => void
    elementRef: MutableRefObject<any>
    items: any[] | undefined
}

export const useHandleObserverGeneral = ({pageChange,  
    setIsVisibleGeneral, elementRef, items } : FunctionProps) => {
        const handlePageChangeRef = useRef(pageChange)
        const callback = (entries: any) => {
                const firstOne = entries[0]
                setIsVisibleGeneral(firstOne.isIntersecting)
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
                handlePageChangeRef.current = pageChange;
            }, [pageChange]);
        useEffect(() => {
            if(typeof window === "undefined") return
            if(!items) return            
            const currentRef = elementRef.current
            const currentObserver = observer.current
            if(currentRef) {
                currentObserver && currentObserver.observe(currentRef)
            }
            return () => {
                if(currentRef){
                    currentObserver && currentObserver.unobserve(currentRef)
                }}
        }, [elementRef, items])
}