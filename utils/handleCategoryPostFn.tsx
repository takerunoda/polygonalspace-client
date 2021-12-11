import React from "react"
import Link from "next/link"
import { toLowerCaseAndConcat } from "./toLowerCaseAndConcat"
import Language from "../Components/Language"

interface FunctionProps {
    category : string[] | undefined, 
    title : string, 
    description : string, 
}

export const handleCategoryPostFn = ({category , title, description} : FunctionProps) => {
    if(!category) return
    const categories = category.filter(item => item !== title).filter(item => item !== "").filter(item => item.length < 30)

    const x = categories.map((item : any)=> 
            <li className="text-blue-500 mr-2 pb-1 sm:pb-2">
                [&nbsp;<Link href={`/category-posts/${toLowerCaseAndConcat(item)}`}>
                    <span className="hover:underline cursor-pointer">{item}</span>
                </Link>&nbsp;]&nbsp;&nbsp;
            </li>
            )
    const y = <Language jp={<div>
        <ul className="flex flex-wrap">
           <li><span className="">キーワード:&nbsp;&nbsp;</span></li> 
            {x}
        </ul>
    </div>} en={<div>
        <ul className="flex flex-wrap">
           <li><span className="">Keywords:&nbsp;&nbsp;</span></li> 
            {x}
        </ul>
    </div>}/>
    return categories.length > 0 ? y : ""
}

