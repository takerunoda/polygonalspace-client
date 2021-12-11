import { RefObject, useEffect } from 'react'

interface FunctionProps {
    setIsVisibleGeneral: (value: React.SetStateAction<boolean>) => void
    loadingGeneral: boolean
    hasMoreGeneral: boolean
    observerGeneralRef: RefObject<HTMLDivElement>
}

export const useHandleObserverGeneral = ({ 
    setIsVisibleGeneral, loadingGeneral, hasMoreGeneral, observerGeneralRef } : FunctionProps) => {
    const callbackfn = (entries: any) => {
        const [entry] = entries
        setIsVisibleGeneral(entry.isIntersecting)
    } 
    const options = { 
        root: null,
        rootMargin: "200px",
        threshold: 1.0
    }

        useEffect(() => {
            if(loadingGeneral) return
            if(!hasMoreGeneral) return
            const observer = new IntersectionObserver(callbackfn, options)
            if(observerGeneralRef && observerGeneralRef.current) observer.observe(observerGeneralRef.current)
            return () => {
                if(observerGeneralRef && observerGeneralRef.current){
                    observer.unobserve(observerGeneralRef.current)
                }}
        }, [observerGeneralRef, options, loadingGeneral, hasMoreGeneral])


}