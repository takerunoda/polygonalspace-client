import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { ChildrenProps, PostInterface } from "../Interfaces";

type allPostType = {
  allPost: PostInterface[]
  setAllPost: Dispatch<SetStateAction<PostInterface[]>>
  categoryPost: PostInterface[]
  setCategoryPost: Dispatch<SetStateAction<PostInterface[]>>
  userPost: PostInterface[]
  setUserPost: Dispatch<SetStateAction<PostInterface[]>>
  loadingDeletePost: boolean
  setLoadingDeletePost: Dispatch<SetStateAction<boolean>>
  draftConfirm: boolean
  setDraftConfirm: Dispatch<SetStateAction<boolean>>
  draftConfirmUpdate: boolean
  setDraftConfirmUpdate: Dispatch<SetStateAction<boolean>>
  postDeleteItem: PostInterface | null;
  setPostDeleteItem: Dispatch<SetStateAction<PostInterface | null>>
  readyToPublish: PostInterface | null;
  setReadyToPublish: Dispatch<SetStateAction<PostInterface | null>>
}

const PostContext = createContext<allPostType | undefined>(undefined)

export function PostWrapper({ children } : ChildrenProps ) {
  const [allPost, setAllPost] = useState<PostInterface[]>([]);
  const [categoryPost, setCategoryPost] = useState<PostInterface[]>([]);
  const [userPost, setUserPost] = useState<PostInterface[]>([]);
  const [postDeleteItem, setPostDeleteItem] = useState<PostInterface | null>(null)
  const [loadingDeletePost, setLoadingDeletePost] = useState(false)
  const [readyToPublish, setReadyToPublish] = useState<PostInterface | null>(null)
  const [draftConfirm, setDraftConfirm] = useState<boolean>(false)
  const [draftConfirmUpdate, setDraftConfirmUpdate] = useState<boolean>(false)

  const postValue = useMemo(() => ({
      allPost, setAllPost,
      categoryPost, setCategoryPost,
      userPost, setUserPost, 
      postDeleteItem, setPostDeleteItem, 
      readyToPublish, setReadyToPublish,
      loadingDeletePost, setLoadingDeletePost, 
      draftConfirm, setDraftConfirm, 
      draftConfirmUpdate, setDraftConfirmUpdate, 
    }), [
      allPost, setAllPost,
      categoryPost, setCategoryPost,
      userPost, setUserPost, 
      postDeleteItem, setPostDeleteItem, 
      readyToPublish, setReadyToPublish,
      loadingDeletePost, setLoadingDeletePost, 
      draftConfirm, setDraftConfirm, 
      draftConfirmUpdate, setDraftConfirmUpdate, 
    ])

  return (
    <PostContext.Provider value={postValue}>
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return useContext(PostContext);
}