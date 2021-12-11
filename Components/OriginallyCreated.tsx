import { BsCalendar } from "react-icons/bs"
import { formatDate } from "../utils/formatDate"
import Language from "./Language"

interface FunctionProps {
    originallyCreated : Date | string | undefined, 
}

const OriginallyCreated = ({originallyCreated} : FunctionProps) => {
    return (<>
            <div className="mt-1 text-sm sm:text-lg font-bold">
                <div className="font-bold mb-0 sm:mb-2">
                    <Language jp={"原文掲載日"} en={"Originally Published"}/>
                </div>
                <div className="flex text-left mt-1 sm:mt-2">
                        <div className="mt-1 mr-2 text-indigo-500">
                            <BsCalendar />
                        </div>
                    <div className=" text-indigo-500">
                        {originallyCreated ? formatDate(originallyCreated) : null}
                    </div>
                </div>
            </div>             
        </>) 
}

export default OriginallyCreated