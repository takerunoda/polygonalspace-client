import React, { FormEvent } from "react"
import { useModalContext } from "../context/ModalContext"
import { useFunctionsContext } from "../context/FunctionsContext"
import Language from "./Language"

interface ComponentProps {
    category : string[] | undefined, 
    title : string, 
    description : string, 
}

const Category = ({
        category, 
        title, 
        description, 
} : ComponentProps) => {
    const {handleNASAModalCloseFn} = useModalContext()
    const {handleSearchSubmitFn, handleListFn} = useFunctionsContext()
    const categories = category && category.filter(item => item !== title).filter(item => description.includes(item)).filter(item => item !== "").filter(item => item.length < 30)

    const handleHandleList = (item : any) => {
        const category = item
        const jp = item
        const en = item
        const id = Math.random().toString(36).substring(2,11);
        const data = {  category: category,
                        jp: jp,
                        en: en,
                        id: id,
                    }
        handleListFn({item: data})
        setTimeout(() => {
            handleNASAModalCloseFn()
        }, 1000);
    }
    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
            handleSearchSubmitFn(e)
        }
            
    return (<>
        <form onSubmit={handleOnSubmit}>
            {categories && categories.length > 0 && <ul className="flex flex-wrap">
                <li>
                    <span className="font-bold">
                        <Language jp={"キーワード"} en={"Keywords"}/>&nbsp;&nbsp;</span>
                </li>
                {categories && categories.map((item : any)=> 
                <li className="text-indigo-500" key={item}>
                    [&nbsp;<button className="hover:text-red-400 hover:underline cursor-pointer" 
                    onClick={() => handleHandleList(item)} 
                    type="submit">
                        {item}       
                    </button>&nbsp;]&nbsp;&nbsp; 
                </li>
                )} 
            </ul>}
        </form>
    </>)
}

export default Category