
import Link from 'next/link'
import React from 'react'
import { useUserContext } from '../context/UserContext'
import Language from './Language'
import { ExternalUrls } from '../utils/ExternalUrls'
import { IoMdLogIn } from 'react-icons/io'
import { HiPencilAlt } from 'react-icons/hi'
import { BiSearchAlt, BiShareAlt } from 'react-icons/bi'
import { FaNodeJs, FaReact } from 'react-icons/fa'
import { RiAccountCircleLine, RiLockPasswordLine } from 'react-icons/ri'
import { SiMongodb, SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { AiFillGithub, AiFillTwitterCircle, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { useIndexContext } from '../pages'

const IndexComponent = () => {
    const indexContext = useIndexContext()
    const {userState: { isLoggedin, accessToken }} = useUserContext();
    const {MyName, twitterAddress} = indexContext;
    const urlNASAMedia = ExternalUrls.linkNASA_MEDIA_GUIDELINES
    const urlNASAImageLibrary = ExternalUrls.linkNASA_IMAGE_LIBRARY
    const urlReact = ExternalUrls.linkREACT
    const urlNextjs = ExternalUrls.linkNEXTJS
    const urlTailwind = ExternalUrls.linkTAILWIND
    const urlNodejs = ExternalUrls.linkNODEJS
    const urlExpress = ExternalUrls.linkEXPRESS
    const urlMongoDB = ExternalUrls.linkMONGODB
    const urlTypescript = ExternalUrls.linkTYPESCRIPT

  return (
          <main>
        {<div className="w-full sm:w-10/12 sm:max-w-3xl mx-auto my-10 sm:border sm:border-blue-400 rounded px-5 sm:px-10 pb-20 sm:pb-28">
        <div className="pb-16 sm:pb-16">
          <div className="text-base md:text-xl leading-relaxed">
            <h1 className="h1">
              <p className="mb-1 sm:mb-3"><Language jp={"Polygonal Space"} en={"What is Polygonal Space?"} /></p>
            </h1>
            <h2 className="w-11/12 sm:w-10/12 mx-auto text-lg sm:text-2xl text-purple-500 font-bold mt-6 mb-10 text-left leading-relaxed">
              <Language jp={"日本語のキーワードを使ってNASAの宇宙画像を検索できるWEBアプリケーションです 🚀✨"} en={"A web application to search for NASA space images 🚀✨"}   />
            </h2>
            <h3 className="leading-relaxed">
              <Language jp={<><span className="text-purple-500 font-bold">Polygonal Space</span> (ポリゴナル・スペース) は、NASAの画像ライブラリーにアクセスして、画像や記事を表示するWEBアプリケーションです。日本語ユーザー向けに、日本語のキーワードを選択してNASAの画像ライブラリーを検索できるように設計されています。</>} en={<><span className="text-purple-500 font-bold">Polygonal Space</span> is a web applciation to retrieve and display space images from NASA (The National Aeronautics and Space Administration) website. The application is designed so that a user can search in the NASA Image and Video Library by simply selecting a keyword from a list.</>} />
            </h3>
          </div>
        </div>
        <div className="pb-16 sm:pb-16">
          <h2 className="h2 text-gray-700"><Language jp={"NASA 画像ライブラリーについて"} en={"NASA Image and Video Library"} /></h2>
          <div className="text-base md:text-xl leading-relaxed">
            <h3 className="leading-relaxed">
            <Language jp={<><a href="" className="text-blue-500 hover:underline font-bold">NASA 画像ライブラリー</a>とは、NASA (アメリカ航空宇宙局) が無料で公開している画像ライブラリーです。望遠鏡や探査機によって撮影された画像を、所定の<a className="text-blue-500 hover:underline font-bold" target="_blank" href={urlNASAMedia} rel="noreferrer" >NASAメディア利用規定</a>のもとで利用することができます。また、NASAはアプリ開発者向けに画像ライブラリーにアクセスするための <a href="" className="text-blue-500 hover:underline font-bold">API</a> (Application Programming Interface) を提供しています。当サイトは、このNASA APIを利用して、画像ライブラリーからデータを取得・表示しています。</>} en={<><a href={urlNASAImageLibrary} className="text-blue-500 hover:underline font-bold">NASA Image and Video Library</a> is a public library which everyone can access for images and videoes taken by telescopes and spacecrafts under <a className="text-blue-500 hover:underline font-bold" target="_blank" href={urlNASAMedia} rel="noreferrer" >Media Usage Guidelines</a>. This website uses the NASA&apos;s <a href="" className="text-blue-500 hover:underline font-bold">API</a> (Application Programming Interface). The API is provided for software engineers who build apps to retrieve images and text data from the library.</>} />
            </h3>
          </div>
        </div>
      <div className="pb-16 sm:pb-16">
          <h2 className="indexH2">
                         <ul className="flex justify-center hover:text-purple-500">
                            <li className={`text-3xl sm:text-4xl mr-1`}>
                              <BiSearchAlt />
                            </li>
                            <Link href="/nasa-search" passHref>
                                <div className={`cursor-pointer hover:underline`}>
                                    <Language jp={"画像検索"} en={"Image Search"} />
                                </div>
                            </Link>
                         </ul>
            </h2>
            <h3>
              <ul className="mx-auto text-lg sm:text-2xl text-purple-500 text-center font-bold leading-relaxed my-6 sm:my-10 w-72 sm:w-96">
                <Language jp={<><p>日本語のキーワードを選んで</p>
                <p className="my-2">NASAの宇宙画像を検索</p>
                </>
                } 
                en={<><p>Choose Keywords</p>
                <p className="my-2"> to Search for Space Images</p>
                </>} />                
              </ul>
            </h3>
          <div className="text-base md:text-xl leading-relaxed">
            <div className="mb-8 sm:mb-12">
              <h3 className="w-10/12 mx-auto text-lg sm:text-2xl text-blue-500 font-bold my-3 sm:my-6 text-center leading-relaxed">
                <ul>
                  <li className="text-gray-700 w-40 mx-auto mb-3 text-lg sm:text-2xl"><Language jp={"ステップ 1"} en={"Step 1"} /></li>
                  <li className="stepTitleIndex"><Language jp={"カテゴリーを選択"} en={"Choose Category"} /></li>
                </ul>
              </h3>
              <h4 className="leading-relaxed">
                <Language jp={"探したいキーワードに近いカテゴリーを選びます。各カテゴリーは、トピックとごとにまとめられており、例えば、「太陽」「火星」といったカテゴリーは、トピック「太陽系」の中にまとめられています。カテゴリーを選ぶと、そのカテゴリーに属するキーワードが表示されます。"} en={`First of all, choose a cagegory that you are interested in. Categories are grouped by a topic. For example, categories "Marth probe" and "Jupiter probe" each belong to a topic "Probe". When you choose a category, keywords that belong to the category will show up.`} />
              </h4>
            </div>
            <div className="mb-8 sm:mb-12">
              <h3 className="w-10/12 mx-auto text-lg sm:text-2xl text-blue-500 font-bold my-3 sm:my-6 text-center leading-relaxed">
                <ul>
                  <li className="stepIndex"><Language jp={"ステップ 2"} en={"Step 2"} /></li>
                  <li className="stepTitleIndex"><Language jp={"キーワードを選択"} en={"Choose Keyword"} /></li>
                </ul>
              </h3>
              <h4 className="leading-relaxed">
                <Language jp={"表示されたキーワードの中から一つ選びます。NASAの画像ライブラリーにアクセスして、そのキーワードに関連した画像記事を取得 & 一覧表示します。"} en={"Second, choose a keywod from the displayed keyword list. When you click a keyword item, this application will access NASA's image library via the NASA API so that it will retrieve and display images and videos which are related to the selected keyword."} />
              </h4>
              <h4 className="leading-relaxed">
                  <Language jp={<>探しているキーワードがリストにない場合は、<span className="text-blue-500 hover:underline font-bold"><Link href="/nasa-search-custom">「フリーワード検索機能 (英語)」</Link></span>を併せてご利用ください (こちらは英語での検索のみとなっています)。</>} en={<>If you cannot find keywords that you are looking for, then please consider using <span className="text-blue-500 hover:underline font-bold"><Link href="/nasa-search-custom font-bold">Custom Search</Link></span> (English only).</>} />
              </h4>
            </div>
            <div className="mb-8 sm:mb-12">
              <h3 className="w-10/12 mx-auto text-lg sm:text-2xl text-blue-500 font-bold my-3 sm:my-6 text-center leading-relaxed">
                <ul>
                  <li className="stepIndex"><Language jp={"ステップ 3"} en={"Step 3"} /></li>
                  <li className="stepTitleIndex"><Language jp={"画像記事を選択"} en={"Choose Image"} /></li>
                </ul>
              </h3>
              <h4 className="leading-relaxed">
                <Language jp={"一覧表示されたアイテムの中から閲覧したい記事を選択します。各アイテムの下側には「開く」ボタンが設けられていて、クリックすると記事を拡大表示することができます。"} en={`Finally, choose an image item from a variety of images in the search result. Each item has a "Open Modal" button. Once you click the button, a modal will show up with a larger image and a more detailed description about that image.`} />
              </h4>
            </div>
            <div>
              <h3 className="w-10/12 mx-auto text-lg sm:text-2xl text-blue-500 font-bold my-3 sm:my-6 text-center leading-relaxed">
                <ul>
                  <li className="stepIndex"><Language jp={"ステップ 4"} en={"Step 4"} /></li>
                  <li className="stepTitleIndex"><Language jp={<div><p>お気に入りを</p><p>ブックマーク</p></div>} en={"Bookmark Your Favorites"} /></li>
                </ul>
              </h3>
              <h4 className="leading-relaxed">
                <Language jp={"モーダルで表示される記事には、画像の下側にブックマークボタンが設けられています。ブックマークすると、「ブックマーク」ページから保存したアイテムを閲覧・削除できます。"} en={`An article shown in the modal can be bookmarked if you are logged in. A bookmark button is prepared for each item. If an item is bookmarked, then you can come back to see it anytime. Bookmarked items will be displayed in "Bookmark" page where you can see them and delete them.`} />
              </h4>
              <h4 className="indexH4">
                ✅ <span className="indexSignupForBookmark"><a href="#about_signup"><Language jp={"ブックマーク機能を利用するには、ユーザー登録が必要です。"} en={"Create a user account to bookmark items."} /></a></span>
              </h4>
              <h4 className="indexH4">
                ✅ <span className="indexSignupForBookmark"><a href="#about_guestlogin"><Language jp={"ゲストログインするとブックマーク機能を試すことができます (登録不要)。"} en={"Or, start Guest login to use  bookmark feature wihtout signup."} /></a></span>
              </h4>
            </div>
          </div>
        </div>
        <div className="pb-16 sm:pb-16">
          <h2 className="indexH2">
                         <ul className="flex justify-center hover:text-purple-500">
                           <li className={`text-3xl sm:text-4xl mr-1 sm:mr-2 `}>
                              <BiShareAlt />
                           </li>
                          <Link href="/shared" passHref>
                            <div className={`cursor-pointer hover:underline`}>
                                <Language jp={"共有ブックマーク"} en={"Shared Bookmarks"}/>
                            </div>
                          </Link>
                         </ul>
            </h2>
            <div className="text-base md:text-xl leading-relaxed">
              <h3 className="leading-relaxed">
              <Language jp={<><span className="text-blue-500 hover:underline font-bold"><Link href="/shared">「共有ブックマーク」</Link></span>ページでは、1人以上のユーザーにブックマークされた画像記事の一部を紹介しています。共有ブックマークのアイテムもブックマークすることが可能です。</>} en={<><span className="text-blue-500 hover:underline font-bold"><Link href="/shared">&quot;Shared Bookmark&quot;</Link></span> page displays some images and videos which are bookmarked by at least one user. You can bookmark items in Shared Bookmark list.</>} />
              </h3>
            </div>
        </div>
        <div className="pb-16 sm:pb-16">
          <h2 className="indexH2">
                         <ul className="flex justify-center hover:text-purple-500">
                           <li className={`text-3xl sm:text-4xl mr-1 sm:mr-2`}>
                              <HiPencilAlt />
                           </li>
                       passHref<Link href="/memo" passHref>
                           <div className={`cursor-pointer hover:underline`}>
                              <Language jp={"投稿"} en={"Posts"}/>
                           </div>
                      </Link>
                         </ul>
            </h2>
            <h3 className="text-base md:text-xl leading-relaxed">
              <p className="leading-relaxed" id="about_guestlogin">
              <Language jp={<><span className="text-blue-500 hover:underline font-bold"><Link href="/memo">「投稿」</Link></span>ページでは、NASAの画像記事をベースにして作成された投稿記事を表示しています。記事の要約・日本語訳が中心です。Polygonal Spaceで許可されたユーザーだけが投稿可能となっています。</>} en={<><span className="text-blue-500 hover:underline font-bold"><Link href="/memo">&quot;Posts&quot;</Link></span> page displays  articles which are created based on NASA&apos;s original articles, mostly summary or translation articles (in Japanese). Only the permitted users are eligible to post an article.</>} />
              </p>
            </h3>
        </div>
        <div className="pb-16 sm:pb-16">
          <h2 className="indexH2">
                         <ul className="flex justify-center hover:text-purple-500">
                           <li className={`text-3xl sm:text-4xl mr-1 sm:mr-2 `}>
                              <AiOutlineUser />
                           </li>
                      {!isLoggedin ? <Link href="/guest-login" passHref>
                           <div className={`cursor-pointer hover:underline`}>
                              <Language jp={"ゲストログイン"} en={"Guest Login"}/>
                           </div>
                      </Link> : 
                            <li className={``}>
                                    <Language jp={"ゲストログイン"} en={"Guest Login"}/>
                            </li>}
                         </ul>
            </h2>
            <h3>
              <ul className="mx-auto text-lg sm:text-2xl text-purple-500 text-center font-bold leading-relaxed my-6 sm:my-10 w-72 sm:w-96">
                <Language jp={<><p>アカウントユーザーが利用する機能を試すことができます。</p><p>[ 登録不要 ]</p></>} en={<><p>Try App Features</p>
                <p>Before Signup</p></>} />
              </ul>
            </h3>
              <h4 className="text-base md:text-xl leading-relaxed"  id="about_signup">
                <p className="leading-relaxed">
                  <Language jp={<><span className="text-blue-500 hover:underline font-bold cursor-pointer">{!isLoggedin ? <Link href="/guest-login">ゲストログイン</Link> : "ゲストログイン"}</span>すると、ブックマーク機能やマイページなど、通常ユーザーの機能を利用することができます。ゲストユーザーは、ログインから1時間後に自動的にログアウトします。</>} en={<>{!isLoggedin ? <span className="text-blue-500 hover:underline font-bold cursor-pointer"><Link href="/guest-login">When you are logged in as a guest</Link></span> : <span className="text-blue-500 font-bold">When you are logged in as a guest</span>}, you can try most of the app features just as a regular account user can do, such as bookmarking items and managing them in MyPage. A guest user will be logged out after 1 hour from login. </>} />
                </p>
              </h4>
        </div>
        <div className="pb-16 sm:pb-16">
          <h2 className="indexH2">
                      <ul className="flex justify-center hover:text-purple-500">
                           <li className={`text-3xl sm:text-4xl mr-1 sm:mr-2 `}>
                              <AiOutlineUserAdd />
                           </li>
                          {!isLoggedin ? <Link href="/memo" passHref>
                              <div className={`cursor-pointer hover:underline`}>
                                  <Language jp={"アカウント登録"} en={"Signup"}/>
                              </div>
                          </Link> : 
                          <li className={``}>
                                  <Language jp={"アカウント登録"} en={"Signup"}/>
                          </li>}
                        </ul>
            </h2>
            <h3>
              <ul className="mx-auto text-lg sm:text-2xl text-center font-bold leading-relaxed my-6 sm:my-10 w-72 sm:w-96 text-purple-500">
              <Language 
                jp={<>
                <p>ユーザー登録には</p>
                <p>2種類の方法があります</p></>} 
                en={<><p>Two Methods for Signup </p>
                  <p></p></>} />
              </ul>
            </h3>
            <h3 className="text-lg sm:text-2xl font-bold my-2 sm:my-6 text-center leading-relaxed">
            {isLoggedin || accessToken ? 
              (<ul className="">
                  <li className="text-4xl sm:text-4xl mb-2 text-blue-500">
                    <RiLockPasswordLine className="mx-auto"/>
                  </li>
                    <li className="text-center">
                    <Language jp={"1. パスワードを設定して登録 "} en={"1. Set Password"} />
                    </li>
                  </ul>
              )  : (
                <ul className="">
                  <li className="text-4xl sm:text-4xl mb-2 text-blue-500">
                    <RiLockPasswordLine className="mx-auto"/>
                  </li>
                    <Link href="/signup-password" passHref>
                    <div className="text-center hover:underline w-72 sm:w-80 mx-auto cursor-pointer">
                    <Language jp={"1. パスワードを設定して登録 "} en={"1. Set Password"} />
                    </div>
                  </Link>
                  </ul>
                )
            }
            </h3>
              <h4 className="text-base md:text-xl leading-relaxed">
                <p className="leading-relaxed">
                  <Language 
                    jp={<>
                      {isLoggedin || accessToken ? 
                        <span className="text-blue-500 font-bold">
                        メールアドレスとパスワードを入力
                        </span> : 
                        <span className="text-blue-500 hover:underline font-bold">
                          <Link href="/signup">
                        メールアドレスとパスワードを入力
                    </Link>
                    </span>}してユーザー登録します。ログインの際には登録したメールアドレスとパスワードを使用してユーザー認証を行います。登録したパスワードはマイページから変更可能です。</>} 
                    en={<>Registering a pair of {isLoggedin || accessToken ? <span className="text-blue-500 font-bold">
                   email address and password</span> : <span className="text-blue-500 hover:underline font-bold"><Link href="/signup">
                   email address and password</Link></span>} is one of the two methods for signup. You will be asked for the registered info everytime you would like to log in. You can change your password anytime in MyPage.</>} />
                </p>
              </h4>
              <h3 className="w-10/12 mx-auto text-lg sm:text-2xl font-bold my-2 sm:my-6 text-left leading-relaxed">
              {isLoggedin || accessToken ? 
                (
                   <ul className="">
                    <li className="text-4xl sm:text-4xl mb-2 text-blue-500">
                      <IoMdLogIn className="mx-auto"/>
                    </li>
                     <li className="text-center">
                      <Language jp={"2. Google認証で登録"} en={<><p className="text-center">
                      2. Sign up with
                     </p>
                     <p className="text-center">
                      Google Authentication
                     </p></>} />
                     </li>
                   </ul>)  : (
                   <ul className="">
                    <li className="text-4xl sm:text-4xl mb-2 text-blue-500">
                      <RiAccountCircleLine className="mx-auto"/>
                    </li>
                     <Link href="/signup-password" passHref>
                     <div className="text-center hover:underline w-72 sm:w-80 mx-auto cursor-pointer">
                      <Language 
                      jp={"2. Google認証で登録"} 
                      en={<><p className="text-center">
                      2. Sign up with
                     </p>
                     <p className="text-center">
                      Google Authentication
                     </p></>} />
                     </div>
                    </Link>
                   </ul>)}
              </h3>
              <h4 className="text-base md:text-xl leading-relaxed">
              <Language 
              jp={<p className="leading-relaxed">
                  {isLoggedin || accessToken ? 
                    <span className="text-blue-500 font-bold">
                    Google認証
                    </span> : 
                    <span className="text-blue-500 hover:underline font-bold">
                      <Link href="/signup">
                    Google認証
                 </Link>
                 </span>}を利用してユーザー登録します。Gmailのメールアドレスをお持ちの方のみ利用可能です。 ユーザー登録後は、Google IDでユーザー認証をしてログインします。Google認証で登録した場合は、パスワードの設定が不要です。
                </p>} 
                en={<p className="leading-relaxed">
                  You can also sign up by {isLoggedin || accessToken ? <span className="text-blue-500 font-bold">
                   Google ID authentication</span> : <span className="text-blue-500 hover:underline font-bold"><Link href="/signup">
                   Google ID authentication</Link></span>} if you have a Gmail address. In this case, you don&apos;t have to register a password. After completing a signup process, you will be able use Google authentication to log in your account.
                </p>} />
              </h4>
              <h4 className="mx-auto text-lg sm:text-2xl text-purple-500 text-center font-bold leading-relaxed my-6 sm:my-10 w-72 sm:w-96">
                <Language jp={"ユーザー登録後でもログイン方法の追加が可能です。"}  en={<ul>
                  {/* <li>You can add </li> */}
                  <li>Add Login Method</li>
                  <li>in MyPage</li>
                </ul>} />
              </h4>
              <h4 className="text-base md:text-xl leading-relaxed">
                <p className="leading-relaxed">
                  <Language 
                  jp={"ユーザー登録後は、「マイページ」からログイン方法の追加設定を行うことができます。例えば、Google認証でユーザー登録後に、パスワードを追加して、パスワードログイン機能を利用することができます。また、Gmailのメールアドレスとパスワードでユーザー登録した場合は、Googleログイン機能を追加することが可能です。"} 
                  en={"Whichever methods you choose for initial signup, you can add another login method in your MyPage. For example, after a signup with Google authentication, you can set a password in order to use a password login. Also, after you are signed up with a Gmail address and a password, you can add a Google login functionality."} />
                </p>
              </h4>
              <h2 className="mx-auto text-lg sm:text-2xl text-purple-500 text-center font-bold leading-relaxed my-6 sm:my-10 w-72">
                <Language jp={"アカウントの削除"} en={"Delete Account"} />
              </h2>
              <h3 className="text-base md:text-xl leading-relaxed">
                <p className="leading-relaxed">
                  <Language jp={"マイページの管理画面からアカウントを削除することができます。アカウントを削除すると、メールアドレス、ブックマークの内容などのユーザー情報がデータベースから消去されます。"} en={"You can delete your account in MyPage. Please be noted that after deletion of your account, your user account data will be gone. That is, when you delete your account, information linked to your user account including an email address and bookmarks will be removed from database."} />
                </p>
              </h3>
          </div>
      <div className="pb-8 sm:pb-8">
          <h2 className="h2">
          <Language jp={<div><p>このサイトで</p>
          <p>使用されている技術</p></div>} en={<div><p>Technologies</p>
          <p>used in this app</p></div>} />
        </h2>
        <div className="md:text-xl leading-relaxed">
          <div className="flex flex-wrap justify-center leading-loose">
            <div className="mb-3 mt-3 sm:mb-6 sm:mt-4 px-10 w-64">
              <ul className="flex justify-center mb-2">
                <li className="text-3xl sm:text-3xl text-blue-500 mt-1 mr-2"><FaReact /></li>
                <li className="text-3xl sm:text-3xl text-blue-500 mt-1 mr-2"><SiNextdotjs /></li>
                <li className="text-3xl sm:text-3xl text-blue-500 mt-1 mr-2"><SiTailwindcss /></li>
              </ul>
              <ul className="flex justify-center">
                <li className=" text-center">
                  <h3>
                    <span className="indexTechnologiesCategory"><Language jp={"フロントエンド"} en={"Frontend"} /></span>
                  </h3>
                  <div className="ml-2">
                    <h3><a className="text-blue-500 hover:text-red-500" target="_blank" href={urlReact} rel="noreferrer">React</a> (<a className="text-blue-500 hover:text-red-500" target="_blank" href={urlNextjs} rel="noreferrer">Next.js</a>)</h3>
                    <h3><a className="text-blue-500 hover:text-red-500" target="_blank" href={urlTailwind} rel="noreferrer">tailwindcss</a></h3>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mb-3 mt-3 sm:mb-6 sm:mt-6 px-10 w-64">
              <ul className="flex justify-center mb-2">
                <li className="text-3xl text-blue-500"><FaNodeJs /></li>
              </ul>
              <ul className="text-center">
                <li>
                  <h3>
                    <span className="indexTechnologiesCategory"><Language jp={"バックエンド"} en={"Backend"} /></span>
                  </h3>
                </li>
                <li>
                  <h3>
                    <a className="text-blue-500 hover:text-red-500" target="_blank" href={urlNodejs} rel="noreferrer">Node.js</a> 
                  </h3>
                  <h3>
                    <a className="text-blue-500 hover:text-red-500" target="_blank" href={urlExpress} rel="noreferrer">Express</a>
                  </h3>
                </li>
              </ul>
            </div>
            <div className="mb-3 mt-3 sm:mb-6 sm:mt-6 px-10 w-64">
              <ul className="flex justify-center">
                <p className="text-3xl text-blue-500 mb-2"><SiMongodb /></p>
              </ul>
              <ul className="text-center">
                <div>
                  <h3>
                    <span className="indexTechnologiesCategory"><Language jp={"データベース"} en={"Database"} /></span>
                  </h3>
                </div>
                <div>
                  <h3>
                    <a className="text-blue-500 hover:text-red-500" target="_blank" href={urlMongoDB} rel="noreferrer">MongoDB</a>
                  </h3>
                </div>
              </ul>
            </div>
            <div className="mb-3 mt-3 sm:mb-6 sm:mt-6 px-10 w-64">
              <ul className="flex justify-center mb-2">
                <p className="text-3xl text-blue-500"><SiTypescript /></p>
              </ul>
              <ul className="text-center">
                <div>
                  <h3>
                    <span className="indexTechnologiesCategory"><Language jp={"その他"} en={"Others"} /></span>
                  </h3>
                </div>
                <div>
                  <h3>
                    <a className="text-blue-500 hover:text-red-500" target="_blank" href={urlTypescript} rel="noreferrer">TypeScript</a>
                  </h3>
                </div>
              </ul>
            </div>
          </div>
        </div>      
      </div>
      <div className="pb-8 sm:pb-8">
          <h2 className="h2">
            <p><Language jp={"コード"} en={"Codes"} /></p>
          </h2>
          <div className="md:text-xl leading-relaxed">
                <ul className="flex justify-center">
                  <li className="text-3xl text-blue-500"><AiFillGithub /></li>
                </ul>
                <p className="text-center my-3">
                  <span className="indexTechnologiesCategory">Github</span>
                </p>
                <ul className="flex justify-between w-48 mx-auto">
                  <li>
                    <p className="text-blue-500 hover:text-red-500"><a target="_blank" href={process.env.NEXT_PUBLIC_GITHUB_CLIENT} rel="noreferrer">Client</a></p>
                  </li>
                  <li>
                    <p className="text-blue-500 hover:text-red-500"><a target="_blank" href={process.env.NEXT_PUBLIC_GITHUB_SERVER} rel="noreferrer">Server</a></p>
                  </li>
                </ul>
          </div>      
        </div>
      <div className="pb-16 sm:pb-16">
          <h2 className="h2">
            <p><Language jp={"作成者"} en={"Developed by"} /></p>
          </h2>
          <div className="md:text-xl leading-relaxed text-center">
              <p className="text-blue-500 hover:text-purple-500 mb-3">
                {MyName}
              </p>
              <div className="w-12 sm:w-16 mx-auto">
                <a href={twitterAddress}
                    target="_blank"
                    rel="noopener noreferrer">
                      <AiFillTwitterCircle className="mx-auto text-blue-400 hover:text-purple-400 cursor-pointer text-5xl sm:text-6xl"/>
                </a>
              </div>
          </div>      
        </div>
        </div>} 
       </main>
  )
}

export default IndexComponent