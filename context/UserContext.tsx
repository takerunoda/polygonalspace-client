import { createContext, Dispatch, SetStateAction, useContext, useMemo, useReducer, useState } from "react"
import { BookmarkItemInterface, ChildrenProps, ImageInterface, UserReducerType } from "../Interfaces";
import { userReducer, userReducerII } from "../utils/userReducers";

interface ChildProps {
      userEmail: string,
      password: string,
  }
type UserContextType = {
  userState: UserReducerType
  userDispatch: Dispatch<any>
  userStateII: any
  userDispatchII: Dispatch<any>
  userBookmarkIds: string[];
  setUserBookmarkIds: Dispatch<SetStateAction<string[]>>
  inputDataRequestPasswordReset: ChildProps
  setInputDataRequestPasswordReset: Dispatch<SetStateAction<ChildProps>>
  inputDataResend: ChildProps
  setInputDataResend: Dispatch<SetStateAction<ChildProps>>
  userBookmark: BookmarkItemInterface[]
  setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
  myBookmarkDeleteItem: BookmarkItemInterface | null;
  setMyBookmarkDeleteItem: Dispatch<SetStateAction<BookmarkItemInterface | null>>
  myBookmarkAddItem: ImageInterface | BookmarkItemInterface | null;
  setMyBookmarkAddItem: Dispatch<SetStateAction<ImageInterface | BookmarkItemInterface | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserWrapper({ children } : ChildrenProps ) {
const initialState = { 
          userEmail: "",
          userId: "",
          accessToken: "",
          isLoggedin: false,
          userStatus: "member",
          loginType: ""
        }
const initialStateII = { 
          passwordLogin: false, 
          googleLogin: false, 
          createdAt: undefined,   
        }
  const [userState, userDispatch] = useReducer(userReducer, initialState)
  const [userStateII, userDispatchII] = useReducer(userReducerII, initialStateII)
  const [userBookmarkIds, setUserBookmarkIds] = useState<string[]>([]);
  const [inputDataRequestPasswordReset, setInputDataRequestPasswordReset] = useState({
      userEmail: "",
      password: "",
  })
  const [inputDataResend, setInputDataResend] = useState({
      userEmail: "",
      password: "",
  })
  const [userBookmark, setUserBookmark] = useState<BookmarkItemInterface[]>([]);
  const [myBookmarkDeleteItem, setMyBookmarkDeleteItem] = useState<BookmarkItemInterface | null>(null)
  const [myBookmarkAddItem, setMyBookmarkAddItem] = useState<ImageInterface | BookmarkItemInterface | null>(null)

  const userValue = useMemo(() => ({
          userState, userDispatch,          
          userStateII, userDispatchII,          
          userBookmarkIds, setUserBookmarkIds,
          inputDataRequestPasswordReset, setInputDataRequestPasswordReset,
          inputDataResend, setInputDataResend,
          userBookmark, setUserBookmark, 
          myBookmarkDeleteItem, setMyBookmarkDeleteItem,
          myBookmarkAddItem, setMyBookmarkAddItem,
    }), [
          userState, userDispatch,          
          userStateII, userDispatchII,          
          userBookmarkIds, setUserBookmarkIds,
          inputDataRequestPasswordReset, setInputDataRequestPasswordReset,
          inputDataResend, setInputDataResend,
          userBookmark, setUserBookmark, 
          myBookmarkDeleteItem, setMyBookmarkDeleteItem,
          myBookmarkAddItem, setMyBookmarkAddItem,
    ])

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
    const context = useContext(UserContext)
        if (context === undefined) {
            throw new Error('useContext(UserContext) is undefined')
        }
    return context
}