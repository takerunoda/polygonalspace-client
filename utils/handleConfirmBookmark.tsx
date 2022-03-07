import { Dispatch, SetStateAction } from "react"
import Language from "../Components/Language"
import { BookmarkItemInterface, ImageInterface } from "../Interfaces"
import { handleMediaType } from "./handleMediaType"
import { categoryLowerCase } from "./categoryLowerCase"

interface FunctionProps {
                item: any
                isLoggedin: boolean
                setAddBookmarkModalToggleConfirm: Dispatch<SetStateAction<boolean>>
                setMyBookmarkAddItem: Dispatch<SetStateAction<ImageInterface | BookmarkItemInterface | null>>
                userBookmarkIds: string[]
                handleMessageModal: ({ messageData }: {
                    messageData: string | JSX.Element;
                }) => void
            }

export const handleConfirmBookmark = ({ item, isLoggedin, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds, handleMessageModal} : FunctionProps) => {
        if(!isLoggedin){
            const messageData = <Language jp={<>
                <p>ブックマークするにはログインが必要です
                    <span className="text-lg"> 🔐</span>
                </p>
            </>} en={<>
                <p>Login is required to bookmark
                    <span className="text-lg"> 🔐</span>
                </p>
            </>}/>
            
            handleMessageModal({messageData})
            return
        } 
        if(userBookmarkIds.includes(item.imageId)){
            const  messageData = <Language jp={<p>ブックマーク済みのアイテムです。<span className="text-lg"> </span></p>} en={<p>Already Bookmarked</p>}/>
            
        handleMessageModal({messageData})
            return
        }
        try {
            if(typeof item.key === "string"){
                setMyBookmarkAddItem({
                        imageId: item.key, 
                        imageTitle: item.title,
                        imageUrl: handleMediaType(item), 
                        imageDescription: item.description ? item.description.replace(/<[^>]+>/g, '') : "",
                        like: 0,
                        mediaType: item.mediaType,
                        category: item.keywords,
                        categoryValue: categoryLowerCase(item.keywords),
                        originallyCreatedAt: item.dateCreated,
                        platform:"NASA",
                        confirm: false
                })
            setAddBookmarkModalToggleConfirm(true)
            } else if(typeof item.imageId === "string"){
                setMyBookmarkAddItem({
                        imageId: item.imageId, 
                        imageTitle: item.imageTitle,
                        imageUrl: item.imageUrl, 
                        imageDescription: item.description ? item.description.replace(/<[^>]+>/g, '') : "",
                        like: 0,
                        mediaType: item.mediaType,
                        category: item.category,
                        categoryValue: item.categoryValue,
                        originallyCreatedAt: item.originallyCreatedAt,
                        platform:"NASA",
                        confirm: false
                })
                setAddBookmarkModalToggleConfirm(true)
            } else{
                throw new Error("bookmark failed")
            }            
        } catch (err) {
                console.log("bookmark failed")
                const  messageData = <Language jp={<p>ブックマークできませんでした。<span className="text-lg"> </span></p>} en={<p>Bookmark faled</p>}/>
                handleMessageModal({messageData})
                    return
                }
            }