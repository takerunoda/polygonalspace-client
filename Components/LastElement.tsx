import React, { MutableRefObject } from 'react'

interface CompoentProps{
    elementRef: MutableRefObject<any>
    currentPage:  number
    hasMore: boolean
    isVisible: boolean  
    isVisibleInitial: boolean
}

const LastElement = ({elementRef, currentPage, hasMore, isVisible, isVisibleInitial} : CompoentProps) => {
  return (
    <div className="text-center" >
        {/* <p className={` mb-1 py-1 ${isVisible ? "text-white bg-pink-500 rounded w-60 mx-auto" :"text-purple-500"} font-bold text-sm sm:text-base `}>{`isVisible: ${JSON.stringify(isVisible)}`}</p>
        <p className={` mb-1 py-1 ${isVisibleInitial ? "text-white bg-blue-500 rounded w-60 mx-auto" :"text-blue-500"} font-bold text-sm sm:text-base `}>{`isVisibleInitial: ${JSON.stringify(isVisibleInitial)}`}</p>
        <p className={` mb-1 py-1 ${hasMore ? "text-white bg-red-500 rounded w-60 mx-auto" :"text-yellow-500"} font-bold text-sm sm:text-base `}>{`hasMore: ${JSON.stringify(hasMore)}`}</p>
        <p className={` mb-1 py-1 ${currentPage ? "text-white bg-blue-500 rounded w-60 mx-auto" :"text-green-500"} font-bold text-sm sm:text-base `}>{`currentPage: ${JSON.stringify(currentPage)}`}</p> */}
        <p className="font-bold text-orange-500 text-sm sm:text-base py-3" ref={elementRef}>
            {/* ＊ Yes, I am the last one ＊ */}
        </p>
    </div>   
  )
}

export default LastElement