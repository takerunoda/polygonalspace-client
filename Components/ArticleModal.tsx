import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { ArticleDraftInterface } from '../Interfaces'
import Language from './Language'
import CloseModal from './CloseModal'
import OriginallyCreated from './OriginallyCreated'
import ConfirmAddPostModal from './ConfirmAddPostModal'
import ConfirmUpdatePostModal from './ConfirmUpdatePostModal'
import { useUserContext } from '../context/UserContext'
import { usePostContext } from '../context/PostContext'
import { useModalContext } from '../context/ModalContext'
import { useBookmarkContext } from '../context/BookmarkContext'
import { handleCategoryFn } from '../utils/handleCategoryFn'
import { clickOutsideModal } from '../utils/clickOutsideModal'
import { replaceSpecialCharacters } from '../utils/replaceSpecialCharacters'

interface PageProps {
    draft: ArticleDraftInterface | null, 
    setDraft: Dispatch<SetStateAction<ArticleDraftInterface | null>>
    currentArticle: string | HTMLTextAreaElement,
    currentTitle: string | HTMLInputElement,
    update: boolean
}

const ArticleModal = ({draft, setDraft}: PageProps) => {
    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const postContext = usePostContext()
        if ( !postContext ) {
            return null;
        }
    const {userEmail} = userContext    
    const { showArticleModal, setShowArticleModal} = modalContext
    const {draftConfirm, setDraftConfirm, readyToPublish, setReadyToPublish, draftConfirmUpdate, setDraftConfirmUpdate} = postContext
    const [draftInput, setDraftInput] = useState<string | null>(null)
    const [titleInput, setTitleInput] = useState<string | null>(null)

    const modalRef = useRef<HTMLDivElement>(null)   
    const onChangeDraft = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDraftInput(e.target.value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value)
    }
    const handleReadyToPublish = () => {
        draft && draftInput && titleInput && setReadyToPublish({
            imageId: draft.imageId, 
            imageTitle: draft.title,
            imageUrl: draft.url,
            sharedUrl: draft.sharedUrl,
            category: draft.category,
            categoryValue: draft.categoryValue,
            platform:draft.platform,
            article: draftInput,
            articleTitle: titleInput,
            like: 0,
            user: userEmail,
        })
        setDraftConfirm(true)
    }

    return draft && (
    <>
    <div 
        className={`fixed z-30 pt-0 left-0 top-0 w-full h-full overflow-auto sm:mx-auto leading-loose tracking-widest text-base md:text-xl bg-opacity-0 bg-gray ${showArticleModal ? "block" : "hidden"}`} 
        onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal:setShowArticleModal})}>
        <div className="bg-white m-auto p-5 overflow-y-scroll pb-48 z-40" ref={modalRef}>
            <CloseModal toggleModal={setShowArticleModal}/>
            <ConfirmAddPostModal />
            <ConfirmUpdatePostModal />
            {`draft: ${JSON.stringify(draft)}`}
            <div className="my-16 w-10/12 mx-auto">
            <h1 className="h1">
                <Language jp={"ドラフト"} en={"Draft"}/>
            </h1>                
            <>
                    <div className="text-3xl mb-7 leading-normal h-16 font-semibold relative text-center">
                            <Language jp={"記事のタイトル"} en={"Title of the Article"}/>
                    </div>
                    <input className="border border-gray-500 rounded text-xl w-full p-2" type="text" onChange={onChangeTitle} required />
                    <div className="text-3xl mt-16 mb-7 leading-normal h-16 font-semibold relative text-center">                  
                            <Language jp={"本文"} en={"Description"}/>
                    </div>
                { !draftConfirm && !draftConfirmUpdate ? <textarea className="border border-gray-500 rounded text-xl w-full p-2" onChange={onChangeDraft}  cols={100} rows={10} required/> 
                : <textarea onChange={onChangeDraft} cols={100} rows={10} disabled/>
                }
                <div className="mt-16 mx-auto text-center">
                    <div className="my-4 mr-3">
                    {!draftConfirm && !draftConfirmUpdate? 
                        <button className="buttonIndigoBigger" onClick={handleReadyToPublish}>
                            <Language jp={"投稿する"} en={"Post"}/>
                        </button>
                        : 
                        <button className="buttonIndigoBigger">
                            <Language jp={"投稿する"} en={"Post"}/>
                        </button>
                        }
                    </div>
                </div>
            </>
            </div>
            <div className="w-3/4 mx-auto">
                    <h2 className="h2 mb-8 text-center text-xl font-bold">
                        <Language jp={"オリジナルテキスト"} en={"Original Text"}/>
                    </h2>
                    <div className="w-full items-center text-center">
                        <div className="mb-8">
                            {draft.title}
                        </div>
                        <div className="w-full mb-8 items-center text-center">
                            <img className="w-full" src={(draft.url).includes("http:") ? (draft.url).replace("http:", "https:") : (draft.url)} alt={draft.title}/>
                        </div>
                    </div>
                    <div className="mb-5">
                        {handleCategoryFn({
                            category: draft.category, 
                            title: draft.title, 
                            description: draft.description })}
                    </div>
                    <div className="mb-5">
                        <OriginallyCreated originallyCreated={draft.originallyCreatedAt} />
                    </div>                                                
                    <div className="mb-5 leading-10">
                        {replaceSpecialCharacters(draft.description)}
                    </div>
                    <p className="mt-5"><Language jp={"出典"} en={"Data Source"}/>:  {draft.platform} API</p>
            </div>
        </div>
    </div>
    </>
    )
}

export default ArticleModal
