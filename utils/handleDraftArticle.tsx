import { Dispatch, SetStateAction } from "react"
import { ArticleDraftInterface } from "../Interfaces"

interface FunctionProps {
    setShow: Dispatch<SetStateAction<boolean>>
    setDraft: Dispatch<SetStateAction<ArticleDraftInterface | null>>
    _id: string | undefined, 
    imageId: string, 
    title: string, 
    url: string, 
    sharedUrl: string, 
    description: string, 
    platform: string, 
    category: string[] | undefined
    categoryValue: string[] | undefined
    originallyCreatedAt: Date | string | undefined
}

export const handleDraftArticle = ({setShow, setDraft, _id, imageId, title, url, sharedUrl, description, platform, category, categoryValue, originallyCreatedAt} : FunctionProps) => {
    setShow(true)
    setDraft({
            _id: _id,
            imageId: imageId, 
            title: title,
            url: url,
            sharedUrl: sharedUrl,
            description: description,
            platform:platform,
            category: category,
            categoryValue: categoryValue,
            originallyCreatedAt: originallyCreatedAt,
        })
    }