import React from 'react'
import Link from 'next/link'
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext'
import Language from './Language';
import LanguageToggle from './LanguageToggle';
import AuthController from './AuthController';
import PrivacyAndTOSnav from './PrivacyAndTOSnav';
import { BsBookmarks } from 'react-icons/bs';
import { HiPencilAlt } from 'react-icons/hi';
import { RiArticleLine } from 'react-icons/ri';
import { BiSearchAlt, BiShareAlt } from 'react-icons/bi';
import { RiHome2Line, RiUserSettingsLine } from 'react-icons/ri';

const Navbar =() => {      
      const { spMenuState, setSpMenuState, pathName } = usePageContext()
      const { userState: { userEmail, isLoggedin, userStatus } } = useUserContext() 
      const handleToggle = () => { setSpMenuState(!spMenuState) }
      const baseName = process.env.NEXT_PUBLIC_BASE_SITE_NAME ?? ""

    return (
      <div className={`w-full mx-auto ${!pathName.includes("-item") && !pathName.includes("blog") && "fixed"} sm:relative sm:bg-white sm:opacity-100 z-40`}> 
      <nav id="header" className={`w-full sm:w-11/12 mx-auto z-10 top-0 bg-white opacity-100 
      ${spMenuState && "pb-96 sm:pb-0 "}
      `}>
        <div className="flex justify-between py-4 pb-2">
            {/* toggle button */}
            <div className="block md:hidden mt-3 ml-4 pr-4">
               <button onClick={handleToggle} id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600  hover:border-purple-500 appearance-none focus:outline-none">
                  <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <title>Menu</title>
                     <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                  </svg>
               </button>
            </div>
               <Link href="/" passHref>
                  <div onClick={() => setSpMenuState(false)} className="mr-3 sm:ml-10 items-center sm:px-5 py-5 sm:py-3 inline-block cursor-pointer hover:opacity-70">
                        <a className="font-Ubuntu text-2xl sm:text-3xl text-purple-600 no-underline hover:no-underline ">
                           <img src="/siteTitle.jpg" className={`w-36 sm:w-72`} alt={baseName}/>
                        </a>
                  </div>
               </Link>
         {!isLoggedin && <div className="block md:hidden text-green-700 w-24 md:w-48 -right-0 ml-auto text-center mr-3 xs:mr-10">
            <div className="text-base mr-3">
               {userStatus !== "guest" && <Language jp={isLoggedin ? userEmail.replace(/"/g, "").substr(0, userEmail.replace(/"/g, "").indexOf("@")) : ""} en={isLoggedin ? userEmail.replace(/"/g, "").substr(0, userEmail.replace(/"/g, "").indexOf("@")) : ""}/>}                         
               {userStatus === "guest" && <Language jp={"ゲスト"} en={"Guest"}/>}
            </div>   
            <div className="w-16 -right-0 ml-auto mt-0 md:mt-2">
               <AuthController />
            </div>
         </div>}
        <div className={`m-0 w-0 md:w-auto ${!isLoggedin && "hidden"} md:flex justify-center ml-auto`}>
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <div className="mx-5 mt-1 text-center text-blue-500 font-bold">
              <div className="w-56 hidden md:block mb-2 text-base mr-2 text-center">
               {userStatus !== "guest" && isLoggedin && userEmail.replace(/"/g, "").substr(0, userEmail.replace(/"/g, "").indexOf("@"))}
               {userStatus === "guest" && <Language jp={"ゲスト"} en={"Guest"}/>}                         
              </div>
          <div className="hidden md:block md:mr-10">
               <AuthController />
          </div>
          </div>
        </div>
      </div>
         <div className="w-full container mx-auto flex flex-wrap items-center justify-between mb-0 sm:mb-5 pl-5 md:pl-0">
            <div className={` m-auto w-full flex-center md:flex  md:content-center md:items-center md:w-auto ${spMenuState ? "" : "hidden"} md:block mt-2 md:mt-2 z-20`} id="nav-content">
               <ul className="sm:flex sm:flex-wrap items-center pl-12 sm:pl-0">
                  <li className="mr-0 py-1 sm:mr-8 sm:py-3">
                     <div className="inline-block">
                      <Link href="/" passHref>
                         <div className="inline-flex cursor-pointer">
                           <div className={`text-2xl mr-2 mt-0 ${pathName === "/" ? "text-purple-500 no-underline  ": "text-blue-500"}`}>
                              <RiHome2Line />
                           </div>
                           <p className={`inline-block ${pathName === "/" ? "text-purple-500 underline font-bold sm:font-normal": "text-gray-800  hover:text-purple-500 hover:no-underline sm:hover:underline"}`}>
                              <Language jp={"Home"} en={"Home"}/>
                           </p>
                         </div>
                        </Link>
                     </div>
                  </li>
                  <li className="navbarItem">
                     <div className="inline-block">
                      <Link href="/nasa-search" passHref>
                         <div className="inline-flex cursor-pointer">
                           <div className={`text-2xl mr-2 ${pathName === "/nasa-search" ? "text-purple-500 no-underline ": "text-blue-500"}`}>
                              <BiSearchAlt />
                           </div>
                           <a className={`inline-block ${pathName === "/nasa-search" ? "text-purple-500 underline font-bold sm:font-normal": "text-gray-800  hover:text-purple-500 hover:no-underline sm:hover:underline"}`}>
                           <Language jp={"検索"} en={"Search"}/>
                           </a>
                         </div>
                        </Link>
                     </div>
                  </li>
                  <li className="navbarItem">
                     <div className="inline-block">
                     <Link href="/shared" passHref>
                         <div className="inline-flex cursor-pointer">
                           <div className={`text-2xl mr-2 ${pathName === "/shared" ? "text-purple-500 no-underline  ": "text-blue-500"}`}>
                              <BiShareAlt />
                           </div>
                           <a className={`inline-block ${pathName === "/shared" ? "text-purple-500 underline font-bold sm:font-normal": "text-gray-800  hover:text-purple-500 hover:no-underline sm:hover:underline"}`}>
                           <Language jp={"共有"} en={"Shared"}/>
                           </a>
                         </div>
                        </Link>
                     </div>
                  </li>
                  <li className="navbarItem">
                     <div className="inline-block">
                     <Link href="/blogs" passHref>
                         <div className="inline-flex cursor-pointer">
                           <div className={`text-2xl mr-2 ${pathName === "/blogs" ? "text-purple-500 no-underline  ": "text-blue-500"}`}>
                              <RiArticleLine />
                           </div>
                           <a className={`inline-block ${pathName === "/blogs" ? "text-purple-500 underline font-bold sm:font-normal": "text-gray-800  hover:text-purple-500 hover:no-underline sm:hover:underline"}`}>
                           <Language jp={"ブログ"} en={"Blog"}/>
                           </a>
                         </div>
                        </Link>
                     </div>
                  </li>
                  <li className="navbarItem">
                     <div className="inline-block">
                     <Link href="/memo" passHref>
                         <div className="inline-flex cursor-pointer">
                           <div className={`text-2xl mr-2 ${pathName === "/memo" ? "text-purple-500 no-underline  ": "text-blue-500"}`}>
                              <HiPencilAlt />
                           </div>
                           <a className={`inline-block ${pathName === "/memo" ? "text-purple-500 underline font-bold sm:font-normal": "text-gray-800  hover:text-purple-500 hover:no-underline sm:hover:underline"}`}>
                           <Language jp={"メモ"} en={"Memo"}/>
                           </a>
                         </div>
                        </Link>
                     </div>
                  </li>
                  {isLoggedin && (
                  <li className="navbarItem">
                     <div className="inline-block">
                     <Link href="/mybookmarks" passHref>
                         <div className="inline-flex cursor-pointer">
                           <div className={`text-2xl mr-2 ${pathName === "/mybookmarks" ? "text-purple-500 no-underline  ": "text-blue-500"}`}>
                              <BsBookmarks />
                           </div>
                           <a className={`inline-block ${pathName === "/mybookmarks" ? "text-purple-500 underline font-bold sm:font-normal": "text-gray-800  hover:text-purple-500 hover:no-underline sm:hover:underline"}`}>
                            <Language jp={"ブックマーク"} en={"Bookmarks"}/>
                           </a>
                         </div>
                        </Link>
                     </div>
                  </li>
                  )}
                  {isLoggedin && (
                  <li className="navbarItem">
                     <div className="inline-block">
                     <Link href="/mypage" passHref>
                         <div className="inline-flex cursor-pointer">
                           <div className={`text-2xl mr-2 ${pathName === "/mypage" ? "text-purple-500 no-underline  ": "text-blue-500"}`}>
                              <RiUserSettingsLine />
                           </div>
                           <a className={`inline-block ${pathName === "/mypage" ? "text-purple-500 underline font-bold sm:font-normal": "text-gray-800  hover:text-purple-500 hover:no-underline sm:hover:underline"}`}>
                            <Language jp={"マイページ"} en={"MyPage"}/>
                           </a>
                         </div>
                        </Link>
                     </div>
                  </li>
                  )}
               </ul>
            <div className="md:hidden w-60 text-left max-w-5xl break-words mt-3sm:mt-8 ml-10 sm:ml-0">
                  <div className="my-3 ml-2">
                     <PrivacyAndTOSnav center={false}/>
                  </div>
                  <div className="md:hidden ml-2 mt- flex justify-between w-32">
                        <LanguageToggle />
                  </div>
                  {isLoggedin && <div className="block md:hidden text-green-700 w-48 -right-0 ml-auto text-center mr-10">   
                     <div className="w-56 -left-0 mr-auto mt-5">
                        <AuthController />
                     </div>
                  </div>}
            </div>            
               
            </div>
         </div>
      </nav>
      </div>)
}

export default Navbar
