import React from 'react'
import parse from 'html-react-parser';
import Link from 'next/link';
import { usePageContext } from '../context/PageContext';
import SNS from './SNS';
import Like from './Like';
import Language from './Language';
import DataSource from './DataSource';
import Breadcrumb from './Breadcrumb';
import DateInDetails from './DateInDetails';
import ImageComponent from './ImageComponent';
import { updatePostNoAuth } from '../utils/updatePostNoAuth';
import { handleUserWhoPosts } from '../utils/handleUserWhoPosts';
import { handleCategoryPost } from '../utils/handleCategoryPost';
import { trimArticleVeryShort } from '../utils/trimArticleVeryShort';
import { useMemoDetailsContext } from '../pages/memo-item/[slug]';

const MemoDetailsComponent = () => {
    const memoDetailsContext = useMemoDetailsContext()
    const {spMenuState} = usePageContext()
    const {postData, post, setPost} = memoDetailsContext
    const breadCrumbData = `${postData && postData.articleTitle && parse((postData.articleTitle).toString())}`  
    const breadcrumb_1 = { name: "メモ", name_EN: "Memo", url: `/memo`}
    const breadcrumb_2 = { 
            name: trimArticleVeryShort(breadCrumbData),
            name_EN: trimArticleVeryShort(breadCrumbData),
            url: `/memo-item/${postData && postData.slug && postData.slug}`}

  return (
    <>
        {postData && <Breadcrumb 
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />}
        <div className="detailsOuter">
            {postData && <div className="detailsInner" key={postData._id}>
                   <div className={`${spMenuState && "pt-36"}`}></div>
                    <h1 className="detailsTitle">
                        {postData.articleTitle && parse((postData.articleTitle).toString())}
                    </h1>
                        <DateInDetails createdAt={postData.createdAt} updatedAt={postData.updatedAt} />
                    <h2>
                        <ImageComponent item={postData}/>
                    </h2>
                    <div className="detailsInnerTwo">
                        <div className="flex">
                            <div className="detailsLike">
                                <Like 
                                updateNoAuth={updatePostNoAuth}
                                post={post} 
                                setPost={setPost}/>
                            </div>                        
                        </div>
                        <div className="my-4">
                                <span className="font-bold"><Language jp={"投稿者"} en={"Written by"}/>: </span><span className="text-blue-500">
                                    <Link href={`/user-memo/${postData.authorId}`} passHref>
                                    <span className="hover:underline cursor-pointer"> {postData.authorId && handleUserWhoPosts(postData.authorId)}</span>
                                    </Link>
                                </span>
                        </div>
                        <div className="mb-5 w-full md:w-2/3 text-sm sm:text-lg font-semibold">
                            {handleCategoryPost({
                                category: postData.category, 
                                title: postData.imageTitle ?? "", 
                                description: postData.imageDescription ?? ""})}
                        </div>
                        <div className="detailsDescription">
                                {parse(`<div>${postData.article}</div>`)}
                                <DataSource  platform={postData.platform} imageOnly={true} />
                        </div>
                        <div className="mt-48 mb-10 md:mb-16 h2 text-blue-800 ">
                            <p>
                                <span className="mr-2"></span><Language jp={"NASAのオリジナルテキスト"} en={"Original Text from NASA"}/>
                            </p>
                            <Link href={`/shared-item/${postData.sharedUrl ?? ""}`} passHref>
                                    <h2 className="text-blue-500 hover:text-purple-500 hover:underline cursor-pointere">
                                        <p className="text-base sm:text-lg py-3  ">
                                            {`"${postData.imageTitle}"`}
                                        </p>
                                    </h2>
                            </Link>           
                        </div>
                    </div>
                {post && <SNS 
                    title={post.articleTitle?.toString() ?? ""} 
                    href={window.location.href}/> }                   
                </div>
            }
        </div>  
    </>)}

export default MemoDetailsComponent