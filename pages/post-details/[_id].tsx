import React, { useState } from 'react'
import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import parse from 'html-react-parser';
import { ArticleDraftInterface, HeadProps, PostInterface } from '../../Interfaces';
import SNS from '../../Components/SNS';
import Like from '../../Components/Like';
import Image from '../../Components/Image';
import Language from '../../Components/Language';
import HeadItem from '../../Components/HeadItem';
import TrashPost from '../../Components/TrashPost';
import DataSource from '../../Components/DataSource';
import LoaderSmall from '../../Components/LoaderSmall';
import ConfirmDeletePostModal from '../../Components/ConfirmDeletePostModal';
import { getAllPosts } from '../../utils/getAllPosts';
import { trimArticle } from '../../utils/trimArticle';
import { getPostById } from '../../utils/getPostById';
import { useUserContext } from '../../context/UserContext';
import { updatePostNoAuth } from '../../utils/updatePostNoAuth';
import { handleUserWhoPosts } from '../../utils/handleUserWhoPosts';
import { handleCategoryPostFn } from '../../utils/handleCategoryPostFn';
import { useGetPrevePageDetails } from '../../utils/useGetPrevePageDetails';
import { useHandleSetPostDetails } from '../../utils/useHandleSetPostDetails';
import { defaultDescription, defaultPicture, headData } from '../../utils/headData';
import { usePageContext } from '../../context/PageContext';
import { BsPencilSquare } from 'react-icons/bs';
import { useModalContext } from '../../context/ModalContext';
import ArticleModalUpdate from '../../Components/ArticleModalUpdate';
import DateInDetails from '../../Components/DateInDetails';
import { usePostContext } from '../../context/PostContext';
import { useBodyOverflowHidden } from '../../utils/useBodyOverflowHidden';


interface PageProps extends HeadProps {
    postData: PostInterface | null
    defaultPicture: string
    defaultDescription: string
}

const PostDetails = ({ postData, headObject, defaultPicture, defaultDescription  } : PageProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const postContext = usePostContext()
        if ( !postContext ) {
            return null
        }
    const {userId, userStatus} = userContext
    const {spMenuState} = pageContext
    const {showArticleModal, setShowArticleModal} = modalContext
    const {setReadyToPublish} = postContext

    const [post, setPost] = useState<PostInterface | null>(null)
    
    const [draftPostUpdate, setDraftPostUpdate] = useState<ArticleDraftInterface | null>(null)
        
    const [parentPage, setParentPage] = useState("")

    const onClickArticle = () => {
                        setShowArticleModal(true)
                        setReadyToPublish(post)
                    }
    useHandleSetPostDetails({postData: postData, setPost: setPost})    
    useBodyOverflowHidden({showModal: showArticleModal})
    useGetPrevePageDetails(setParentPage) 

    return (<>
        <HeadItem
            imageUrl={postData ? postData.imageUrl : defaultPicture}
            title={postData && typeof postData.articleTitle === "string"? postData.articleTitle : "Polygonal Space "}
            description={postData && postData.article && typeof postData.article === "string"? trimArticle(postData.article) : defaultDescription} 
            noIndex={false}
            defaultURL={false}
        />
        <ConfirmDeletePostModal />
        <ArticleModalUpdate draft={post} />
        <div className="detailsOuter">
            {post ? 
               <div className="detailsInner" key={post._id}>
                   <div className={`${spMenuState && "pt-36"}`}></div>
                    <h1 className="detailsTitle">
                        {post.articleTitle && parse((post.articleTitle).toString())}
                    </h1>
                        <DateInDetails createdAt={post.createdAt} updatedAt={post.updatedAt} />
                    <h2>
                        <Image item={post}/>
                    </h2>
                    <div className="detailsInnerTwo">
                        <div className="flex">
                            <div className="detailsLike">
                                <Like 
                                updateNoAuth={updatePostNoAuth}
                                post={post} 
                                setPost={setPost}/>
                            </div>                        
                            {(userId === post.authorId ) && <div className="ml-5 sm:ml-8 pt-4">
                                <TrashPost item={post} />
                            </div>}
                            {(userStatus === "admin" || userStatus === "editor") && 
                                <div className="mt-4 ml-7 sm:ml-10">
                                    <button className="text-red-600 hover:text-red-400 text-3xl sm:text-4xl" onClick={onClickArticle}>
                                        <BsPencilSquare />
                                    </button>
                                </div>}
                        </div>
                        <h2 className="my-4">
                                <span className="font-bold"><Language jp={"投稿者"} en={"Written by"}/>: </span><span className="text-blue-500">
                                    <Link href={`/user-posts/${post.authorId}`}>
                                    <span className="hover:underline cursor-pointer"> {post.authorId && handleUserWhoPosts(post.authorId)}</span>
                                    </Link>
                                </span>
                        </h2>
                        <h2 className="mb-5 w-full md:w-2/3 text-sm sm:text-lg font-semibold">
                            {handleCategoryPostFn({
                                category: post.category, 
                                title: post.imageTitle ?? "", 
                                description: post.imageDescription ?? ""})}
                        </h2>
                        <div className="detailsDescription">
                                {parse(`<div>${post.article}</div>`)}
                                <DataSource  platform={post.platform} imageOnly={true} />
                        </div>
                        <div className="mt-48 mb-10 md:mb-16 h2 text-blue-800 ">
                            <p>
                                <span className="mr-2"></span><Language jp={"NASAのオリジナルテキスト"} en={"Original Text from NASA"}/>
                            </p>
                            <Link href={`/bookmark-details/${post.sharedUrl ?? ""}`}>
                                    <h2 className="text-blue-500 hover:text-purple-500 hover:underline cursor-pointere">
                                        <p className="text-base sm:text-lg py-3  ">
                                            {`"${post.imageTitle}"`}
                                        </p>
                                    </h2>
                            </Link>           
                        </div>
                    </div>
                <SNS 
                    title={post.articleTitle?.toString() ?? ""} 
                    href={window.location.href}/>                    
                </div> : 
                <div className="detailsLoaderSmall">
                    <LoaderSmall />
                </div>
            }
        </div>  
    </>      
    )

}
export default PostDetails

export const getStaticProps = async (context: GetStaticPropsContext) => {
        const { params } : any = context
        const _id: string = params && params._id
        const idToSend = { postId: _id }
        const data = await getPostById(idToSend)        
        const headObject = headData.find(x => x.page === "post_details")
        const picture = defaultPicture
        const description = defaultDescription


      return {
            props: { 
                    postData: data, 
                    headObject: headObject && headObject, 
                    defaultPicture: picture, 
                    defaultDescription: description }, 
            revalidate: 10
                }
}

export  const getStaticPaths = async () => {
const data: PostInterface[] = await getAllPosts()
const paths = data ? data.map(blog => {
    return blog._id && {
        params: { _id: blog._id.toString() }
    }
}) : []
return {
    paths: paths,
    fallback: true
  };
}