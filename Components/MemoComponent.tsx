import React from 'react'
import { usePostContext } from '../context/PostContext'
import { useMemoContext } from '../pages/memo'
import PostItem from './PostItem'
import { handleScrollPosition } from '../utils/handleScrollPosition'
import Language from '../Components/Language';
import LoaderSmall from '../Components/LoaderSmall';
import PageSubTitle from '../Components/PageSubTitle';
import Breadcrumb from '../Components/Breadcrumb';
import { FcDocument } from 'react-icons/fc'
import DataSourceList from './DataSourceList'

const MemoComponent = () => {
    const {allPost: data} = usePostContext()
    const { initialData, loadingGeneral,
            elementRef, 
            elementInitialRef, 
            currentPage, 
            hasMoreGeneral, 
            isVisibleGeneral, 
            isVisibleGeneralInitial} = useMemoContext()
    const handlePosition = () => handleScrollPosition({path: "postScroll"})
    const breadcrumb_1 = null
    const breadcrumb_2 = { name: "メモ", name_EN: "Memo", url: `/memo`}

  return (
  <>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="mt-8">
            <h1 className="h1 flexJustifyCenter">
                <div className="transform text-indigo-500 text-4xl sm:text-5xl sm:mt-0 mr-1 sm:mr-2">
                    <FcDocument />
                </div>
                <div className="pt-1">
                    <Language jp={"メモ"} en={"Memo"}/>
                </div>
            </h1>
            <PageSubTitle 
                    jp={"NASAの宇宙画像についてのメモ書きです 📝"} 
                    en={"Memos on NASA space pictures (Japanese) 📝"}/>
            <div className="outer">
            {initialData && initialData.map((item, index) => {
                if(initialData.length === index + 1){
                return <PostItem 
                            item={item} 
                            elementRef={elementInitialRef} 
                            currentPage={currentPage}
                            hasMore={hasMoreGeneral}
                            isVisible={isVisibleGeneral}
                            isVisibleInitial={isVisibleGeneralInitial}
                            key={item._id}
                            handlePosition={handlePosition}
                            last={true} />
                } else {
                return <PostItem 
                            item={item} 
                            elementRef={elementInitialRef} 
                            currentPage={currentPage}
                            hasMore={hasMoreGeneral}
                            isVisible={isVisibleGeneral}
                            isVisibleInitial={isVisibleGeneralInitial}
                            key={item._id}
                            handlePosition={handlePosition}
                            last={false} />
                        }
                })}
            {data && 
                data.map((item, index) => {
                    if(data.length === index + 1){
                    return <PostItem 
                                item={item} 
                                elementRef={elementRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item._id}
                                handlePosition={handlePosition}
                                last={true} />

                    } else {
                    return <PostItem 
                                item={item} 
                                elementRef={elementRef} 
                                currentPage={currentPage}
                                hasMore={hasMoreGeneral}
                                isVisible={isVisibleGeneral}
                                isVisibleInitial={isVisibleGeneralInitial}
                                key={item._id}
                                handlePosition={handlePosition}
                                last={false} />
                    }
                })}
            </div>
            <DataSourceList imageOnly={true}/>
            {loadingGeneral && 
            <div className="loaderSmallGettingItems">
                <LoaderSmall />
            </div>}
        </div>
  </>
  )
}

export default MemoComponent