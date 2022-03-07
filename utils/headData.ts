export const defaultPicture = `PIA16884_large.jpg`
const datePublished = "Wed Dec 15 2021 09:27:55 GMT+0900 (Japan Standard Time)"
const dateModified = "Sun Jan 30 2022 12:42:32 GMT+0900 (Japan Standard Time)"

export  const defaultDescription = `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can select Japanese keywords to search for images. Users can bookmark items　and share bookmarks, etc. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`

export const headData = [
                //About page
                {page: `about`, 
                title:`Polygonal Space`, 
                slug: `/`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can select Japanese keywords to search for images. Users can bookmark items　and share bookmarks, etc. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`, datePublished: datePublished, dateModified: dateModified},
                
                //nasa_images 
                {page: `nasa_images`, 
                title:`NASA Image Search`, 
                slug: `nasa-search`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can select Japanese keywords to search for images. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`, datePublished: datePublished, dateModified: dateModified},

                //nasa_images_custom 
                {page: `nasa_images_custom`, 
                title:`NASA Custom Search`, 
                slug: `nasa-search-custom`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can input keywords to search for NASA space images. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`, datePublished: datePublished, dateModified: dateModified},

                //all_posts 
                {page: `all_posts`, 
                title:`Memo`, 
                slug: `memo`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。NASA APIから取得した宇宙画像/テキストを元にして作成した投稿記事の一覧を表示しています。 This page shows a list of posts which are written based on the space images/texts retrieved from NASA API`, datePublished: datePublished, dateModified: dateModified},

                //blog_posts 
                {page: `blog_posts`, 
                title:`Blog`, 
                slug: `blogs`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。宇宙関連のトピックについて書いた記事の一覧を表示しています。 This page shows a list of blog posts on space topics`, datePublished: datePublished, dateModified: dateModified},

                //shared_bookmarks 
                {page: `shared_bookmarks`, 
                title:`Shared Bookmarks`, 
                slug: `shared`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。NASA APIから取得した画像/テキストデータを一部紹介しています。This page shows some NASA images/texts retrieved via API`, datePublished: datePublished, dateModified: dateModified},

                //category_posts 
                {page: `category_posts`, 
                title:``, 
                slug: `category-memo`, imageUrl: defaultPicture, 
                description: defaultDescription, 
                datePublished: datePublished, 
                dateModified: dateModified},

                //category_bookmarks
                {page: `category_bookmarks`, 
                title:``, 
                slug: `category-shared`, imageUrl: defaultPicture, 
                description: defaultDescription, 
                datePublished: datePublished, 
                dateModified: dateModified},

                //user_posts
                {page: `user_posts`, 
                title:`Memo`, 
                slug: `user-memo`, imageUrl: defaultPicture, 
                description: defaultDescription, datePublished: datePublished, dateModified: dateModified},

                //post_details
                {page: `post_details`, 
                title:``, 
                slug: `memo-item`, imageUrl: defaultPicture, 
                description: defaultDescription},

                //post_details
                {page: `blog_details`, 
                title:``, 
                slug: `blog`, imageUrl: defaultPicture, 
                description: defaultDescription},

                //bookmark_details
                {page: `bookmark_details`, 
                title:``, 
                slug: `shared-item`, imageUrl: defaultPicture, 
                description: defaultDescription},

                //privacy
                {page: `privacy`, 
                title:`Privacy Policy`, 
                slug: `privacy-policy`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。このページでは、当サイトのプライバシーポリシーを掲載しています。`, datePublished: datePublished, dateModified: dateModified},
                //terms
                {page: `terms`, 
                title:`Terms of Service`,
                slug: `terms-of-service`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。このページでは、当サイトの利用規約を掲載しています。`, datePublished: datePublished, dateModified: dateModified},
                //login
                {page: `login`, 
                title:`Login`, 
                slug: `login`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。このページでは、当サイトのログインページを表示しています。`, datePublished: datePublished, dateModified: dateModified},
                //signup
                {page: `signup`, 
                title:`Signup`, 
                slug: `signup`, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。このページでは、当サイトのユーザー登録ページを表示しています。`, datePublished: datePublished, dateModified: dateModified},
                //change password
                {page: `no-index`, 
                title:`Polygonal Space`, 
                slug: ``, imageUrl: defaultPicture, 
                description: `Polygonal Space (ポリゴナル・スペース)は、NASAの宇宙画像を検索するWebアプリです。日本語のキーワードを選択して検索できます。`, datePublished: datePublished, dateModified: dateModified},

                ]
