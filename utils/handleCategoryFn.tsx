import React from "react"
import Language from "../Components/Language"

interface FunctionProps {
    category : string[] | undefined, 
    title : string, 
    description : string, 
}

export const handleCategoryFn = ({category , title, description} : FunctionProps) => {
    if(!category) return
    const categories = category.filter(item => item !== title).filter(item => description.includes(item)).filter(item => item !== "").filter(item => item.length < 30)

    const x = categories.map((item : any)=> 
            <li className="text-indigo-500 hover:underline">
                <p>[&nbsp;<span className="hover:underline cursor-pointer">{item}</span>&nbsp;]</p>
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

