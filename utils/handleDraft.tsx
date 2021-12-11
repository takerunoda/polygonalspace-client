import { Dispatch, SetStateAction } from "react"
import { DraftInterface } from "../Interfaces"

interface FunctionProps {
    setShow: Dispatch<SetStateAction<boolean>>
    setDraft: Dispatch<SetStateAction<DraftInterface | null>>
    id: string, 
    title: string, 
    url: string, 
    description: string, 
    platform: string, 
    category: string[] | undefined
    categoryValue: string[] | undefined
    originallyCreatedAt: Date | string | undefined
}

export const handleDraft = ({setShow, setDraft, id, title, url, description, platform, category, categoryValue, originallyCreatedAt} : FunctionProps) => {
    setShow(true)
    setDraft({
            id: id, 
            title: title,
            url: url,
            description: description,
            platform:platform,
            category: category,
            categoryValue: categoryValue,
            originallyCreatedAt: originallyCreatedAt,
        })
    }