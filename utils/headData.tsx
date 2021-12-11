 export const defaultPicture = `${process.env.NODE_ENV === 'production' ?
                        process.env.NEXT_PUBLIC_BASE_URL :
                        process.env.NEXT_PUBLIC_BASE_URL_2}/GSFC_20171208_Archive_e000107_large.jpg`

export  const defaultDescription = `NASA APIを利用して、NASAの宇宙画像を検索するアプリケーションです。日本語の用語一覧から選択して検索できます。記事のブックマーク、共有などが可能です。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can select Japanese keywords to search for images. Users can bookmark items　and share bookmarks, etc. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`

export const headData = [
                //About page
                {page: `about`, 
                title:`Home | Polygonal Space`, 
                imageUrl: 
                defaultPicture, 
                description: `NASA APIを利用して、NASAの宇宙画像を検索するアプリケーションです。日本語の用語一覧から選択して検索できます。記事のブックマーク、共有などが可能です。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can select Japanese keywords to search for images. Users can bookmark items　and share bookmarks, etc. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`},
                
                //nasa_images 
                {page: `nasa_images`, 
                title:`NASA Image Search | Polygonal Space`, 
                imageUrl: defaultPicture, 
                description: `NASA API を利用して、NASAの宇宙画像を検索するアプリケーションです。日本語の用語一覧から選択して検索できます。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can select Japanese keywords to search for images. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`},

                //nasa_images_custom 
                {page: `nasa_images_custom`, 
                title:`NASA Custom Search | Polygonal Space`, 
                imageUrl: defaultPicture, 
                description: `NASA API を利用して、NASAの宇宙画像を検索するアプリケーションです。React (Next.js) / Node.js (Express) / MongoDB / TypeScriptで構築しています。This application enables to sarch for NASA images with API (Application Programming Interface). Users can input keywords to search for NASA space images. This app is built with the following technologies: React (Next.js) / Node.js (Express) / MongoDB / TypeScript.`},

                //all_posts 
                {page: `all_posts`, 
                title:`Posts | Polygonal Space`, 
                imageUrl: defaultPicture, 
                description: `NASA APIから取得した宇宙画像/テキストを元にして作成した投稿記事の一覧を表示しています。 This page shows a list of posts which are written based on the space images/texts retrieved from NASA API`},

                //shared_bookmarks 
                {page: `shared_bookmarks`, 
                title:`Shared Bookmarks | Polygonal Space`, 
                imageUrl: defaultPicture, 
                description: `NASA APIから取得した画像/テキストデータです。他のユーザーに共有されたブックマーク一覧を表示しています。This page shows a list of NASA images/texts which are shared by users.`},

                //category_posts 
                {page: `category_posts`, 
                title:``, 
                imageUrl: defaultPicture, 
                description: defaultDescription},

                //category_bookmarks
                {page: `category_bookmarks`, 
                title:``, 
                imageUrl: defaultPicture, 
                description: defaultDescription},

                //user_posts
                {page: `user_posts`, 
                title:``, 
                imageUrl: defaultPicture, 
                description: defaultDescription},

                //user_bookmarks
                {page: `user_bookmarks`, 
                title:``, 
                imageUrl: defaultPicture, 
                description: defaultDescription},

                //post_details
                {page: `post_details`, 
                title:``, 
                imageUrl: defaultPicture, 
                description: defaultDescription},

                //bookmark_details
                {page: `bookmark_details`, 
                title:``, 
                imageUrl: defaultPicture, 
                description: defaultDescription},

                //privacy
                {page: `privacy`, 
                title:``, 
                imageUrl: defaultPicture, 
                description: defaultDescription},

                ]
