import React, { Dispatch, SetStateAction } from "react"
import { NextRouter } from "next/router"
import { BookmarkItemInterface } from "../Interfaces"
import Language from "../Components/Language"
import { toLowerCaseAndConcat } from "./toLowerCaseAndConcat"

interface FunctionProps {
    setCategoryBookmarks: Dispatch<SetStateAction<BookmarkItemInterface[]>>
    category : string[] | undefined, 
    title : string, 
    description : string, 
    router: NextRouter
}

export const handleCategoryBookmark = ({setCategoryBookmarks, category , title, description, router} : FunctionProps) => {
    const handleOnclick = ({item} : {item: string}) => {
        setCategoryBookmarks([])
        router.push(`/category-shared/${toLowerCaseAndConcat(item)}`)
    }
    if(!category) return
    const categories = category.filter(item => item !== title).filter(item => description.includes(item)).filter(item => item !== "").filter(item => item.length < 40)

    const x = categories.map((item : string, index: number) => 
            <li className="text-blue-500 mr-2 text-base" key={index}>
                <h3>
                    [&nbsp;<button onClick={() => handleOnclick({item: item})}>
                        <span className="hover:underline cursor-pointer">{item}</span>             
                    </button>&nbsp;]&nbsp;&nbsp;
                </h3>
            </li>
            )
    const y = <Language jp={<div>
        <ul className="flex flex-wrap">
           <li><span className="font-bold">キーワード:&nbsp;&nbsp;</span></li> 
            {x}
        </ul>
    </div>} en={<div>
        <ul className="flex flex-wrap">
           <li><span className="font-bold">Keywords:&nbsp;&nbsp;</span></li> 
            {x}
        </ul>
    </div>}/>
    return categories.length > 0 ? y : ""
}

