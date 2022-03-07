import React from 'react'
import { usePageContext } from '../context/PageContext'
import { usePostContext } from '../context/PostContext'
import { useUserMemoContext } from '../pages/user-memo/[userId]'
import PostItem from './PostItem'
import Language from './Language';
import Breadcrumb from './Breadcrumb';
import LoaderSmall from './LoaderSmall'
import PageSubTitle from './PageSubTitle';
import DataSourceList from './DataSourceList'
import { handleScrollPosition } from '../utils/handleScrollPosition'
import { handleUserWhoPosts } from '../utils/handleUserWhoPosts'

const UserMemoComponent = () => {
    const { language } = usePageContext()
    const { userPost } =  usePostContext()
    const { initialData, loadingGeneral, userId, 
            elementRef, 
            elementInitialRef, 
            currentPage, 
            hasMoreGeneral, 
            isVisibleGeneral, 
            isVisibleGeneralInitial} = useUserMemoContext()
    const handlePosition = () => handleScrollPosition({path: "postUserScroll"})
    const handleLoadingPage = () => {
        const x = setTimeout(() => {
            return <LoaderSmall />
        }, 1);
        const y = setTimeout(() => {
            clearTimeout(x)
            return <div className="h2">{language ? "このユーザーが書いたメモはありません" : "The user has no published articles"}</div>
        }, 5000);
    }
    const breadcrumb_1 = { name: "メモ", name_EN: "Memo", url: `/memo`}
    const breadcrumb_2 = { name: `${userId}のメモ`, name_EN: `Written by ${userId}`, url: `/user-memo/${userId}`}

  return (
      <>
        <Breadcrumb 
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="mt-8">
           { initialData && initialData[0] ? 
           (<>
            <h1 className="h1 w-10/12 mx-auto">               
                    <Language jp={`ユーザー "${initialData[0].authorId && handleUserWhoPosts(initialData[0].authorId) }"のメモ`} en={`Written by User ${initialData[0].authorId && handleUserWhoPosts(initialData[0].authorId) }`}/>
            </h1>
            <PageSubTitle 
                jp={"NASAの宇宙画像についてのメモ書きです 📝"} 
                en={"Notes on NASA space images (Japanese) 📝"}/>
            </> ) 
           : <h1 className="h1 text-center">
               {handleLoadingPage}
               </h1>}
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
                {userPost && 
                (userPost.map((item, index) => {
                    if(userPost.length === index + 1){
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
                }))}
            </div>        
            <DataSourceList imageOnly={true}/>            
            {loadingGeneral
            && <div className="loaderSmallGettingItems">
                <LoaderSmall />
            </div>}
        </div>

      </>
  )
}

export default UserMemoComponent