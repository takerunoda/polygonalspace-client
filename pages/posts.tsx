import React, { useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { HeadProps } from '../Interfaces';
import HeadItem from '../Components/HeadItem';
import PostItem from '../Components/PostItem';
import Language from '../Components/Language';
import LoaderSmall from '../Components/LoaderSmall';
import MessageModal from '../Components/MessageModal';
import ConfirmDeletePostModal from '../Components/ConfirmDeletePostModal';
import { usePageContext } from '../context/PageContext';
import { usePostContext } from '../context/PostContext';
import { useModalContext } from '../context/ModalContext';
import { headData } from '../utils/headData';
import { useScrollPosition } from '../utils/useScrollPosition';
import { send_posts_by_page } from '../utils/urls';
import { usePageChangeGeneral } from '../utils/usePageChangeGeneral';
import { handleScrollPosition } from '../utils/handleScrollPosition';
import { useSetPrevePageDetails } from '../utils/useSetPrevePageDetails';
import { useSetPageCookiesGeneral } from '../utils/useSetPageCookiesGeneral';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { HiPencilAlt } from 'react-icons/hi';

interface PageProps extends HeadProps{
    // postsData: PostInterface[]
    // totalPosts: number
}

const Posts = ({ headObject } : PageProps) => {  
    const [loadingPost, setLoadingPost] = useState<boolean>(false)
    const [hasMorePost, setHasMorePost] = useState(true)
    const [isVisiblePost, setIsVisiblePost] = useState(false)
    //Context 
    //useUserContext is either UserContextType or undefined, so it cannot be destructured until it is made sure as not undefined.
    const postContext = usePostContext()
        if ( !postContext ) {
            return null
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }
    const {allPost, setAllPost } = postContext;    
    const {pathName,} = pageContext
    const {showMessageModal, setShowMessageModal, message, setMessage} = modalContext  
    const currentPageCookie = Cookies.get("currentPagePost")
    const [currentPagePost, setCurrentPagePost] = 
               useState((allPost.length > 0) && currentPageCookie ? JSON.parse(currentPageCookie) : 1)
    const totalPageCookie = Cookies.get("totalPagesPost")
    const [totalPagesPost, setTotalPagesPost] =
                    useState(totalPageCookie ? JSON.parse(totalPageCookie) : 2)
    const observerPostRef = useRef<HTMLDivElement>(null)
     useHandleObserverGeneral({ 
            setIsVisibleGeneral: setIsVisiblePost, 
            loadingGeneral: loadingPost, 
            hasMoreGeneral: hasMorePost, 
            observerGeneralRef: observerPostRef })
        usePageChangeGeneral({
            setLoadingGeneral: setLoadingPost, 
            setCurrentPageGeneral: setCurrentPagePost, 
            currentPageGeneral: currentPagePost, 
            setTotalPagesGeneral: setTotalPagesPost, 
            totalPagesGeneral: totalPagesPost, 
            setHasMoreGeneral: setHasMorePost, 
            data: allPost, 
            setData: setAllPost, 
            isVisibleGeneral: isVisiblePost,
            urlName: send_posts_by_page})
    useSetPrevePageDetails(pathName)
    useScrollPosition({path: "postScroll"})
    useSetPageCookiesGeneral({
        currentPage: currentPagePost, 
        currentPageCookie: "currentPagePost", 
        totalPages: totalPagesPost, 
        totalPagesCookie: "totalPagesPost",})
    
    return (<>
        <HeadItem
            imageUrl={headObject.imageUrl}
            title={headObject.title}
            description={headObject.description}
            noIndex={false}
            defaultURL={false}
        />
        <MessageModal message={message} setMessage={setMessage} showMessageModal={showMessageModal} setShowMessageModal={setShowMessageModal}/>
        <ConfirmDeletePostModal />
        <div className="mt-8">
            <h1 className="h1 flexJustifyCenter">
                <div className="transform text-indigo-500 text-4xl sm:text-5xl sm:mt-0 mr-1 sm:mr-2">
                    <HiPencilAlt />
                </div>
                <div className="pt-1">
                    <Language jp={"全ての投稿"} en={"Posts"}/>
                </div>
            </h1>
            <div className={allPost ? "outer" : ""}>
            {allPost ? 
                allPost.map((item, index) => {
                    if(allPost.length === index + 1){
                        return <PostItem item={item} items={allPost} 
                        setItems={setAllPost}      
                        observerPostRef={observerPostRef} 
                        key={item._id}
                        handlePosition={() => handleScrollPosition({path: "postScroll"})}
                        last={true} />
                    } else {
                        return <PostItem item={item} items={allPost} setItems={setAllPost}      observerPostRef={observerPostRef} key={item._id}
                            handlePosition={() => handleScrollPosition({path: "postScroll"})}
                            last={false} />
                    }
                }):   
                    <div className="loaderSmallItemNotExist">
                        <LoaderSmall />
                    </div>
                }
            </div>
        {loadingPost && 
            <div className="loaderSmallGettingItems">
                <LoaderSmall />
            </div>}
        </div>
        </>
    )
}

export default Posts

export const getStaticProps = async () => {
    const headObject = headData.find(x => x.page === "all_posts")

      return {
            props: { headObject: headObject && headObject }, 
            revalidate: 10
  }
}