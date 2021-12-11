import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link';
import LikeTwo from './LikeTwo';
import Language from './Language';
import { PostInterface } from '../Interfaces';
import { usePostContext } from '../context/PostContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { trimArticleShort } from '../utils/trimArticleShort';
import { updatePostNoAuth } from '../utils/updatePostNoAuth';
import { handleUserWhoPosts } from '../utils/handleUserWhoPosts';
import { handleOnclickDeletePost } from '../utils/handleOnclickDeletePost';
import { FaTrash } from 'react-icons/fa';
import { RiArticleLine } from 'react-icons/ri';
import { DateInList } from './DateInLIst';

interface ComponentProps {
    item: PostInterface
    items: PostInterface[]
    setItems: Dispatch<SetStateAction<PostInterface[]>>
    observerPostRef: React.RefObject<HTMLDivElement> 
    handlePosition: () => void
    last: boolean 
}

const PostItem = ({item, items, setItems, observerPostRef, handlePosition, last} : ComponentProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const postContext = usePostContext()
        if ( !postContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const {userId} = userContext;
    const { postDeleteItem, setPostDeleteItem, }  = postContext
    const { postModalToggleConfirm, setPostModalToggleConfirm,          
        } = modalContext

    return (
            <div className="itemOuter" key={item._id}>
                <h2 className="itemTitleA">
                    <div className="itemTitleB">
                        <div className="itemTitleIcon">
                            <RiArticleLine />
                        </div>
                        <p>
                            {item.articleTitle}
                        </p>
                    </div>
                </h2>
                <DateInList item={item} />
                <h2 className="itemImage">
                    <img src={(item.imageUrl).includes("http:") ? (item.imageUrl).replace("http:", "https:") : (item.imageUrl)} alt={item.imageTitle}/>
                </h2>
                <div className="itemLike">
                    <LikeTwo 
                        post={item} 
                        updateNoAuth={updatePostNoAuth} 
                        postData={items} 
                        setPostData={setItems}/>
                </div>                        
                <div className="my-4">
                    <span className="text-green-500"><Language jp={"投稿者"} en={"Written by"}/>: </span><Link href={`/user-posts/${item.authorId}`}><a className="text-blue-500">{item.authorId && handleUserWhoPosts(item.authorId)}</a>
                    </Link>
                </div>
                <h2 className="overflow-x-scroll">
                    {(typeof item.article === "string") && trimArticleShort(item.article)}
                </h2>
                <div className="itemReadMore">
                    <Link href={`/post-details/${item._id}`}>
                        <button className="buttonGreenMiddleSecond"
                                onClick={handlePosition}>
                                <div>
                                    Read More
                                </div>
                        </button>
                    </Link>
                    <div className={(userId !== item.authorId ) ? "hidden": ""}>
                        <button className="itemTrash" onClick={() => handleOnclickDeletePost({item, setPostDeleteItem, setPostModalToggleConfirm})}>
                            <FaTrash />
                        </button>
                    </div>                    
                </div>
                {last && <div className="" ref={observerPostRef}></div>}
                </div>)}

export default PostItem