import React, { MutableRefObject } from 'react'
import { nasaStateDataInterface } from '../Interfaces'
import ResultItem from './ResultItem'

interface ComponentProps {
    data: nasaStateDataInterface[] | undefined
    elementRef: MutableRefObject<any> 
    currentPage: number 
    hasMore: boolean 
    isVisible: boolean 
}

const ResultsComponent = ({ data, elementRef, currentPage, hasMore, isVisible } : ComponentProps) => {
  return (
        <ul className="outer">
            {data && 
            (data.map((item, index) => {
                if(data.length === index + 1){
                    return  <ResultItem 
                        item={item}
                        key={`${item.key}_${index}`}
                        elementRef={elementRef}
                        last={true} 
                        currentPage={currentPage} 
                        hasMore={hasMore} 
                        isVisible={isVisible}   />
                        
                } else {
                    return  <ResultItem 
                        item={item}
                        key={`${item.key}_${index}`}
                        elementRef={elementRef}
                        last={false} 
                        currentPage={currentPage} 
                        hasMore={hasMore} 
                        isVisible={isVisible}   />
                }
            }))}
        </ul>

  )
}

export default ResultsComponent