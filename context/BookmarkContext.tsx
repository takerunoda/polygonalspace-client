import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { ChildrenProps, BookmarkItemInterface, ImageInterface } from "../Interfaces";

type BookmarkContextType = {
  userBookmark: BookmarkItemInterface[];
  setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
  allBookmarks: BookmarkItemInterface[];
  setAllBookmarks: Dispatch<SetStateAction<BookmarkItemInterface[]>>
  categoryBookmarks: BookmarkItemInterface[];
  setCategoryBookmarks: Dispatch<SetStateAction<BookmarkItemInterface[]>>
  myBookmarkDeleteItem: BookmarkItemInterface | null;
  setMyBookmarkDeleteItem: Dispatch<SetStateAction<BookmarkItemInterface | null>>
  myBookmarkAddItem: ImageInterface | BookmarkItemInterface | null;
  setMyBookmarkAddItem: Dispatch<SetStateAction<ImageInterface | BookmarkItemInterface | null>>
}
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export function BookmarkWrapper({ children } : ChildrenProps ) {
  const [userBookmark, setUserBookmark] = useState<BookmarkItemInterface[]>([]);
  const [allBookmarks, setAllBookmarks] = useState<BookmarkItemInterface[]>([]);
  const [categoryBookmarks, setCategoryBookmarks] = useState<BookmarkItemInterface[]>([]);
  const [myBookmarkDeleteItem, setMyBookmarkDeleteItem] = useState<BookmarkItemInterface | null>(null)
  const [myBookmarkAddItem, setMyBookmarkAddItem] = useState<ImageInterface | BookmarkItemInterface | null>(null)  

  const userValue = useMemo(() => ({
          userBookmark, setUserBookmark, 
          allBookmarks, setAllBookmarks,
          categoryBookmarks, setCategoryBookmarks,
          myBookmarkDeleteItem, setMyBookmarkDeleteItem,
          myBookmarkAddItem, setMyBookmarkAddItem,
    }), [
          userBookmark, setUserBookmark, 
          allBookmarks, setAllBookmarks,
          categoryBookmarks, setCategoryBookmarks,
          myBookmarkDeleteItem, setMyBookmarkDeleteItem,
          myBookmarkAddItem, setMyBookmarkAddItem,
    ])

  return (
    <BookmarkContext.Provider value={userValue}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarkContext() {
  return useContext(BookmarkContext);
}