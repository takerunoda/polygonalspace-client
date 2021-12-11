import React from 'react'
import { BsCalendar } from 'react-icons/bs'
import { MdUpdate } from 'react-icons/md'
import { formatDate } from '../utils/formatDate'

interface ComponentProps {
    createdAt : Date | undefined
    updatedAt : Date | undefined
}

const DateInDetails = ({createdAt, updatedAt} : ComponentProps) => {
        return (
            <div className="mb-3 mr-5 md:mr-16 text-sm sm:text-lg font-bold">
                <ul>
                    {createdAt !== updatedAt ? 
                    <li className="text-right font-bold flex">
                        <div className="mt-1 mr-2 text-right text-blue-500  ml-auto">
                            <MdUpdate />
                        </div>
                        <div className="text-right text-blue-500">
                            {updatedAt ? formatDate(updatedAt) : null}
                        </div>
                    </li> :
                    <li className="text-right font-bold flex mb-2">
                        <div className="mt-1 mr-2 text-right text-gray-600  ml-auto">
                            <BsCalendar />
                        </div>
                        <div className="text-right text-gray-700">
                            {createdAt ? formatDate(createdAt) : null}
                        </div>
                    </li>}
                </ul>
            </div>)
}

export default DateInDetails
