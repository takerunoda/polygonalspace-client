import React from 'react'
import parse from 'html-react-parser';
import { usePageContext } from '../context/PageContext';
import { useBlogDetailsContext } from '../pages/blog/[slug]'
import SNS from './SNS';
import LikeBlog from './LikeBlog';
import ImageBlog from './ImageBlog';
import DataSource from './DataSource';
import Breadcrumb from './Breadcrumb';
import DateInDetails from './DateInDetails';
import { removeHr } from '../utils/removeHr';
import { trimArticleVeryShort } from '../utils/trimArticleVeryShort';

const BlogDetailsComponent = () => {
    const {spMenuState} = usePageContext()
    const {postData, post, setPost} = useBlogDetailsContext()
    const breadCrumbData = `${postData && postData.title && parse((postData.title).toString())}`
    const breadcrumb_1 = { name: "ブログ", name_EN: "Blogs", url: `/blogs`}
    const breadcrumb_2 = { 
            name: trimArticleVeryShort(breadCrumbData),
            name_EN: trimArticleVeryShort(breadCrumbData), 
            url: `/blog/${postData && postData.slug && postData.slug}`}

  return (
    <>
        {postData && <Breadcrumb 
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />}
        <div className="detailsOuter">
            {postData && 
               <div className="detailsInner" key={postData.id}>
                   <div className={`${spMenuState && "pt-36"}`}></div>
                    <h1 className="detailsTitle">
                        {postData.title && parse((postData.title).toString())}
                    </h1>
                        <DateInDetails createdAt={postData.created_at} updatedAt={postData.updated_at} />
                    <h2>
                        <ImageBlog item={postData}/>
                    </h2>
                    <div className="detailsInnerTwo">
                        <div className="flex">
                            <div className="detailsLike">
                                <LikeBlog 
                                post={post} 
                                setPost={setPost}/>
                            </div>                        
                        </div>
                        <div className="detailsDescription">
                                {parse(`<div>${removeHr(postData.html.toString())}</div>`)}
                                <DataSource  platform={"NASA"} imageOnly={true} />
                        </div>
                    </div>
                {post && <SNS 
                    title={post.title.toString() ?? ""} 
                    href={window.location.href} />}                    
                </div>
            }
        </div>
    </>
  )
}

export default BlogDetailsComponent