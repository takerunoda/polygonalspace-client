import { BsCalendar } from "react-icons/bs"
import Language from "../Components/Language"
import { formatDate } from "./formatDate"

interface FunctionProps {
    originallyCreated : Date | undefined, 
}

export const handleOriginallyCreated = ({originallyCreated} : FunctionProps) => {
    const x = (<>
    <Language jp={<><div className="flex ml-1 mt-1 ">
                <div className="font-bold">
                    原文掲載日: &nbsp;
                </div>
                <div className="flex text-left">
                    <div className="mt-2 md:mt-1 mr-2 text-indigo-500">
                        <BsCalendar />
                    </div>
                    <div className=" text-indigo-500">
                        {originallyCreated ? formatDate(originallyCreated) : null}
                    </div>
                </div>
            </div></>} en={<><div className="font-bold">
                    Originally Published: 
                </div>
                <div className="flex ml-1 mt-1 text-left">
                    <div className="mt-2 md:mt-1 mr-2 text-indigo-500">
                        <BsCalendar />
                    </div>
                    <div className=" text-indigo-500">
                        {originallyCreated ? formatDate(originallyCreated) : null}
                    </div>
                </div></>}/>
                </>) 
                return x
            }