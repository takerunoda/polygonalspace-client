import React from 'react'
import { formatDate } from '../utils/formatDate'
import { MdUpdate } from 'react-icons/md'
import { BsCalendar } from 'react-icons/bs'

interface ComponentProps {
    createdAt : string | Date | undefined
    updatedAt : string | Date | undefined
}

const DateInDetails = ({createdAt, updatedAt} : ComponentProps) => {
        return (
            <div className="mb-3 mr-5 md:mr-16 text-sm sm:text-lg font-bold">
                    {createdAt !== updatedAt ?
                    <ul>
                        <li className="text-right font-bold flex mb-2">
                            <div className="mr-1 text-right text-blue-500  ml-auto">
                                <MdUpdate className="text-xl sm:text-2xl" />
                            </div>
                            <div className="text-right text-blue-500">
                                {createdAt ? formatDate(createdAt) : null}
                            </div>
                        </li>
                        <li className="text-right font-bold flex mb-2">
                            <div className="mt-1 mr-2 text-right text-gray-600  ml-auto">
                                <BsCalendar />
                            </div>
                            <div className="text-right text-gray-700">
                                {createdAt ? formatDate(createdAt) : null}
                            </div>
                        </li>
                    </ul>
                    :
                    <div className="text-right font-bold flex mb-2">
                        <div className="mt-1 mr-2 text-right text-blue-500  ml-auto">
                            <BsCalendar />
                        </div>
                        <div className="text-right text-blue-500">
                            {createdAt ? formatDate(createdAt) : null}
                        </div>
                    </div>
                    }
            </div>)}

export default DateInDetails
