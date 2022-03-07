import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { BookmarkItemInterface, ChildrenProps, PostInterface } from "../Interfaces";

type allPostType = {
  allPost: PostInterface[]
  setAllPost: Dispatch<SetStateAction<PostInterface[]>>
  blogPost: any[]
  setBlogPost: Dispatch<SetStateAction<any[]>>
  categoryPost: PostInterface[]
  setCategoryPost: Dispatch<SetStateAction<PostInterface[]>>
  userPost: PostInterface[]
  setUserPost: Dispatch<SetStateAction<PostInterface[]>>
  allBookmarks: BookmarkItemInterface[];
  setAllBookmarks: Dispatch<SetStateAction<BookmarkItemInterface[]>>
  categoryBookmarks: BookmarkItemInterface[];
  setCategoryBookmarks: Dispatch<SetStateAction<BookmarkItemInterface[]>>
}

const PostContext = createContext<allPostType | undefined>(undefined)

export function PostWrapper({ children } : ChildrenProps ) {
  const [allPost, setAllPost] = useState<PostInterface[]>([]);
  const [blogPost, setBlogPost] = useState<any[]>([]);
  const [categoryPost, setCategoryPost] = useState<PostInterface[]>([]);
  const [userPost, setUserPost] = useState<PostInterface[]>([]);
  const [allBookmarks, setAllBookmarks] = useState<BookmarkItemInterface[]>([]);
  const [categoryBookmarks, setCategoryBookmarks] = useState<BookmarkItemInterface[]>([]);


  const postValue = useMemo(() => ({
      allPost, setAllPost,
      blogPost, setBlogPost,
      categoryPost, setCategoryPost,
      userPost, setUserPost, 
      allBookmarks, setAllBookmarks,
      categoryBookmarks, setCategoryBookmarks,
    }), [
      allPost, setAllPost,
      blogPost, setBlogPost,
      categoryPost, setCategoryPost,
      userPost, setUserPost, 
      allBookmarks, setAllBookmarks,
      categoryBookmarks, setCategoryBookmarks,
    ])

  return (
    <PostContext.Provider value={postValue}>
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
    const context = useContext(PostContext)
        if (context === undefined) {
            throw new Error('useContext(PostContext) is undefined')
        }
    return context
}
