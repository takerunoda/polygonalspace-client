import { Dispatch, SetStateAction } from 'react'
import { NextRouter } from 'next/router'
import { BookmarkItemInterface } from '../Interfaces'
import Language from '../Components/Language'
import { getAccessToken } from './tokens'
import { deleteBookmark } from './deleteBookmark'

interface FunctionProps {
                        item: BookmarkItemInterface, 
                        setLoadingDeleteBookmark: Dispatch<SetStateAction<boolean>>
                        router: NextRouter
                        userBookmark: BookmarkItemInterface[];
                        setUserBookmark: Dispatch<SetStateAction<BookmarkItemInterface[]>>
                        setUserBookmarkIds: Dispatch<SetStateAction<string[]>>     
                        logoutFunction: () => Promise<void>
                        handleMessageModal: ({ messageData }: {
                            messageData: string | JSX.Element;
                        }) => void
                    }

export const handleDeleteBookmark = async ({item, setLoadingDeleteBookmark, router, userBookmark, setUserBookmark, setUserBookmarkIds, logoutFunction, handleMessageModal
} : FunctionProps) => {
        //going through all items in bookmark and filtering out the item which has the same id as the clicked item to create a new bookmark array
        //then updates the user state with the updated bookmark array
        try {
        setLoadingDeleteBookmark(true)
            const response = await getAccessToken()
        if(!response.ok || response.ok !== true){
            if(response.includes("error") || response.includes("Error")){
                await logoutFunction()
                router.push("/login")
                setLoadingDeleteBookmark(false)
                return
            }
        }
            const userBookmarkData = userBookmark.filter((x: any) => x.imageId !== item.imageId)
            if(userBookmarkData.length === 0){
                const object = {_id: "",
                                imageId:"randomId" ,
                                imageTitle:"",
                                imageUrl:"",
                                imageDescription:"",
                                like: 0,
                                platform:""}
            setUserBookmark([object]) 
            } else {
            setUserBookmark(userBookmarkData)
            }
            const ok = await deleteBookmark({response, imageId: item.imageId})
            if(ok === true){
                setLoadingDeleteBookmark(false)
                setUserBookmarkIds(prev => prev.filter(x => x !== item.imageId))
                    const messageData = <Language jp={<>
                        <p>ブックマークを削除しました
                            <span className="text-lg"></span>
                        </p>
                    </>} en={<>
                        <p>Bookmark item was deleted
                            <span className="text-lg"></span>
                        </p>
                    </>}/>

                handleMessageModal({messageData})
            } else {
                setLoadingDeleteBookmark(false)
                throw new Error("Bookmark deletion failed")
            }
        } catch (err: any) {
           console.log(err)
            setLoadingDeleteBookmark(false)
           return 
        }
    }