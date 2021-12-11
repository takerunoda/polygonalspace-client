import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';
import Language from '../Components/Language';
import LoaderPage from '../Components/LoaderPage';
import MyPageIcons from '../Components/MyPageIcons';
import ConfirmDeleteBookmarkModal from '../Components/ConfirmDeleteBookmarkModal';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { formatDate } from '../utils/formatDate';
import { useGetgLoginStatus } from '../utils/useGetgLoginStatus';
import { useBodyOverflowHidden } from '../utils/useBodyOverflowHidden';
import { useHandleObserverGeneral } from '../utils/useHandleObserverGeneral';
import { GoBookmark } from 'react-icons/go';
import { RiUserSettingsLine } from 'react-icons/ri';
import HeadItem from '../Components/HeadItem';

const MyPage = () => {
    const [hasMoreMyBookmark, setHasMoreMyBookmark] = useState(true)
    const [isVisibleMyBookmark, setIsVisibleMyBookmark] = useState(false)
    const [loadingMyBookmark, setLoadingMyBookmark] = useState<boolean>(false)            
    const userContext = useUserContext()
        if ( !userContext ) {
        return null;
    }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
        return null;
    }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
    }    
    const { accessToken,
            userEmail, 
            userId,
            userStatus, 
            loginType, setLoginType,
            isLoggedin,
            passwordLogin, setPasswordLogin,
            googleLogin, setGoogleLogin,
            createdAt, setCreatedAt
        } = userContext            
    const { userBookmark, setUserBookmark,
            myBookmarkDeleteItem, setMyBookmarkDeleteItem            
        }  = bookmarkContext
    const { showArticleModal } = modalContext
    const observerMyBookmarkRef = useRef<HTMLDivElement>(null)

     useHandleObserverGeneral({ 
            setIsVisibleGeneral: setIsVisibleMyBookmark, 
            loadingGeneral: loadingMyBookmark, 
            hasMoreGeneral: hasMoreMyBookmark, 
            observerGeneralRef: observerMyBookmarkRef })

    //redirect if not logged in
    // useIfNotLoggedIn({isLoggedin, router})
    
    //handles body overflow hidden
    useBodyOverflowHidden({showModal: showArticleModal})

    useGetgLoginStatus({setPasswordLogin, setGoogleLogin, setLoginType, setCreatedAt, accessToken})


    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
            
    return (
        isLoggedin ? <>
            <HeadItem
                imageUrl={""}
                title={"My Page | マイページ"}
                description={""}
                noIndex={true}
                defaultURL={true}
            />
        <ConfirmDeleteBookmarkModal item={myBookmarkDeleteItem}/>
        <div className="w-full mx-auto mb-64">
        {/* if user state is neither null nor undefined, display items here based on the bookmark array*/}
        <h1 className="h1 flex justify-center">
            <div className="text-indigo-500 text-4xl sm:text-5xl mr-2 sm:mr-3">
                <RiUserSettingsLine />
            </div>
            <div className="pt-1">
            <Language jp={`マイページ`} en={`My Page`} />
            </div>
        </h1>
        <div className="w-64 sm:w-96 mx-auto">
            <div className="mb-8 sm:mb-16">
                <h2 className="mb-4">
                    <MyPageIcons titleKey={"userId"}/>
                    <div className="text-sm sm:text-base font-bold text-blue-500">
                        {userId}
                    </div>
                </h2>
                <h2 className="mb-4">
                    <MyPageIcons titleKey={"userEmail"}/>
                    <div className={`text-sm sm:text-base font-bold text-blue-500 ${userStatus === "guest" && "ml-10"}`}>
                        {userStatus !== "guest" && userEmail}
                        {userStatus === "guest" && <Language jp={`ゲストログイン`} en={`Guest Login`} />}
                    </div>
                </h2>
                <h2 className="mb-4">
                    <MyPageIcons titleKey={"joined"}/>
                    <ul className="ml-10">
                    {userStatus !== "guest" ?  
                    <li className="text-sm sm:text-base font-bold text-blue-500">
                            {createdAt ? formatDate(createdAt) : <p className="text-transparent">Loading...</p>}
                        </li> : <li className="text-sm sm:text-base font-bold text-blue-500">{userStatus === "guest" && date}</li>}
                    </ul>
                </h2>
                <h2 className="mb-4">
                    <MyPageIcons titleKey={"passwordLogin"}/>
                    <div className="font-bold ml-10">
                        {userStatus !== "guest" ? 
                        <p className={`text-sm sm:text-base font-bold ${passwordLogin !== undefined ? "text-blue-500" : "text-transparent"}`}>
                            {passwordLogin === undefined && " Loading..."}
                            <Language jp={``} en={``} />
                            {passwordLogin && <Language jp={`設定済み`} en={`ON`} />}
                            {!passwordLogin && <Language jp={`未設定`} en={`OFF`} />}
                        </p> : 
                        <p className={`text-sm sm:text-base bold text-blue-500`}>
                            <Language jp={`未設定`} en={`OFF`} />
                        </p>} 
                    </div>                
                </h2>
                <h2 className="mb-2">
                    <MyPageIcons titleKey={"googleLogin"}/>
                    <div className=" font-bold ml-10">
                        {userStatus !== "guest" ? 
                        <p className={`text-sm sm:text-base font-bold ${googleLogin !== undefined ? "text-blue-500" : "text-transparent"}`}>
                            {googleLogin === undefined && "Loading..."}
                            <Language jp={``} en={``} />
                            {googleLogin && <Language jp={`設定済み`} en={`ON`} />}
                            {!googleLogin && <Language jp={`未設定`} en={`OFF`} />}
                        </p> : 
                        <p className={`text-sm sm:text-base bold text-blue-500`}>
                            <Language jp={`未設定`} en={`OFF`} />
                        </p>}
                    </div>
                </h2>
                <h2>
                    {isLoggedin && ( <ul className="flex mt-6">
                        <li className="text-2xl sm:text-3xl mr-4 sm:mr-3  text-purple-500">
                            <GoBookmark />
                        </li>
                            <Link href={`/mybookmarks`}>
                                <li className="text-base sm:text-xl hover:underline font-bold cursor-pointer">                
                                    <Language jp={`ブックマーク`} en={`Bookmarks`} />
                                </li>
                            </Link>         
                    </ul>)}
                </h2>
            </div>
            {(userStatus === "admin" || userStatus === "editor") && ( 
            <h2 className="my-4 sm:my-8">
                <div className="">
                    <Link href={`/user-posts/${userId}`}>
                    <button className="text-base sm:text-xl hover:underline font-bold my-6 cursor-pointer">
                        <Language jp={`投稿した記事`} en={`Articles you wrote`} />
                    </button>
                    </Link>         

                </div>
            </h2>)}
            {(userStatus === "admin" || userStatus === "editor") && ( <h2 className="mb-12 sm:mb-20">
                <Link href={`/admin-shared-bookmarks`}>
                    <button className="text-base sm:text-xl hover:underline font-bold cursor-pointer">
                        <Language jp={`シェアページの管理`} en={`Manage Shared Page`} />
                    </button>
                </Link>         
            </h2>)}
        </div>
        {userStatus !== "guest" && passwordLogin === true && !loadingMyBookmark && 
        <h2 className="text-center">
            <Link href="/change-password">
                <button className="text-purple-600 text-base sm:text-xl mb-10 ms:mb-12 rounded border-purple-600 border-2 p-4 w-56 text-center mx-auto hover:text-blue-500 hover:border-blue-500 cursor-pointer font-bold">
                        <Language jp={`パスワードの変更`} en={`Change Password`} />
                </button>
            </Link>
        </h2>
        }
        {userStatus !== "guest" && loginType === "password" && !googleLogin && userEmail.endsWith("@gmail.com")&&!loadingMyBookmark && <h2 className="text-center">
        <Link href="/enable-google-signin">
            <button className="text-green-500 text-base sm:text-xl mb-10 ms:mb-12 rounded border-green-500 border-2 p-4 w-56 text-center mx-auto hover:text-blue-500 hover:border-blue-500 cursor-pointer font-bold">
                <Language jp={`Googleログインを有効にする`} en={`Enable Sign-in with Google`} />
            </button>
        </Link></h2>}
        {userStatus !== "guest" && loginType === "google" && !passwordLogin && !loadingMyBookmark &&  <h2 className="text-center">
        <Link href="/enable-password-signin">
            <button className="text-green-500 text-base sm:text-xl mb-10 ms:mb-12 rounded border-green-500 border-2 p-4 w-56 text-center mx-auto hover:text-blue-500 hover:border-blue-500 cursor-pointer font-bold">
                <Language jp={`パスワードログインを有効にする`} en={`Enable Password Signin`} />
            </button>
        </Link></h2>}
        {userStatus !== "guest" && loginType === "password" && !loadingMyBookmark && 
        <h2 className="text-center">
            <Link href="/delete-account">
                <button className="text-indigo-600 text-base sm:text-xl mb-10 ms:mb-12 rounded border-indigo-600 border-2 p-4 w-56 text-center mx-auto hover:text-blue-500 hover:border-blue-500 cursor-pointer font-bold">
                        <Language jp={`アカウントの削除`} en={`Delete Account`} />
                </button>
            </Link>
        </h2>
        }
        {userStatus !== "guest" && loginType === "google" && !loadingMyBookmark && 
        <h2 className="text-center">
            <Link href="/delete-account-google">
                <button className="text-indigo-600 text-base sm:text-xl mb-10 ms:mb-12 rounded border-indigo-600 border-2 p-4 w-56 text-center mx-auto hover:text-blue-500 hover:border-blue-500 cursor-pointer font-bold">
                        <Language jp={`アカウントの削除`} en={`Delete Account`} />
                        
                </button>
            </Link>
        </h2>}
    </div>
    </> : 
    <LoaderPage />)}

export default MyPage
