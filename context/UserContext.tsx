import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { ChildrenProps } from "../Interfaces";
import { useUpdateAccessToken } from "../utils/useUpdateAccessToken"
import { useGetUserDataFromCookies } from "../utils/useGetUserDataFromCookies"

interface ChildProps {
      userEmail: string,
      password: string,
  }
interface ChildPropsTwo {
      userEmail: string,
      password: string,
  }

type UserContextType = {
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>
  userStatus: string;
  setUserStatus: Dispatch<SetStateAction<string>>
  loginType: string;
  setLoginType: Dispatch<SetStateAction<string>>
  userBookmarkIds: string[];
  setUserBookmarkIds: Dispatch<SetStateAction<string[]>>
  accessToken: string
  setAccessToken: Dispatch<SetStateAction<string>>
  isLoggedin: boolean
  setIsLoggedin: Dispatch<SetStateAction<boolean>>
  inputDataRequestPasswordReset: ChildProps
  setInputDataRequestPasswordReset: Dispatch<SetStateAction<ChildProps>>
  inputDataResend: ChildProps
  setInputDataResend: Dispatch<SetStateAction<ChildProps>>
  passwordLogin: boolean |undefined
  setPasswordLogin: Dispatch<SetStateAction<boolean |undefined>>
  googleLogin: boolean |undefined
  setGoogleLogin: Dispatch<SetStateAction<boolean |undefined>>
  createdAt: Date | undefined
  setCreatedAt: Dispatch<SetStateAction<Date | undefined>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserWrapper({ children } : ChildrenProps ) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false)
  const [userStatus, setUserStatus] = useState<string>("member")
  const [loginType, setLoginType] = useState<string>("")
  const [userBookmarkIds, setUserBookmarkIds] = useState<string[]>([]);
  const [passwordLogin, setPasswordLogin] = useState<boolean | undefined>()
  const [googleLogin, setGoogleLogin] = useState<boolean | undefined>()
  const [createdAt, setCreatedAt] = useState<Date>()
  const [inputDataRequestPasswordReset, setInputDataRequestPasswordReset] = useState({
      userEmail: "",
      password: "",
  })
  const [inputDataResend, setInputDataResend] = useState({
      userEmail: "",
      password: "",
  })

  const userValue = useMemo(() => ({
          userEmail, setUserEmail, 
          userId, setUserId, 
          accessToken, setAccessToken,
          isLoggedin, setIsLoggedin,
          userStatus, setUserStatus,
          loginType, setLoginType,
          userBookmarkIds, setUserBookmarkIds,
          passwordLogin, setPasswordLogin,
          googleLogin, setGoogleLogin,
          createdAt, setCreatedAt,
          inputDataRequestPasswordReset, setInputDataRequestPasswordReset,
          inputDataResend, setInputDataResend,
    }), [
          userEmail, setUserEmail, 
          userId, setUserId, 
          accessToken, setAccessToken,
          isLoggedin, setIsLoggedin,
          userStatus, setUserStatus,
          loginType, setLoginType,
          userBookmarkIds, setUserBookmarkIds,
          passwordLogin, setPasswordLogin,
          googleLogin, setGoogleLogin,
          createdAt, setCreatedAt,
          inputDataRequestPasswordReset, setInputDataRequestPasswordReset,
          inputDataResend, setInputDataResend,
    ])

  useGetUserDataFromCookies({setIsLoggedin, setUserEmail, setUserId})    

  useUpdateAccessToken({accessToken, setAccessToken, isLoggedin, userStatus, setUserStatus, loginType, setLoginType
    // , setPasswordLogin, setGoogleLogin
  })

  return (
    <UserContext.Provider value={userValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}