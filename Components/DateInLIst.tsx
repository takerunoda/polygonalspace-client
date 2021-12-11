import React from 'react'
import { BsCalendar } from 'react-icons/bs'
import { MdUpdate } from 'react-icons/md'
import { formatDate } from '../utils/formatDate'

interface ComponentProps {
    item: any
}

export const DateInList = ({item} : ComponentProps) => {
                    return (
                        <div className="mr-5 text-sm sm:text-base font-bold flex justify-end">
                            {item.createdAt !== item.updatedAt ? <div className="mb-2 ml-2 flex justify-end">
                                <div className="mt-1 mr-2 text-blue-500">
                                    <MdUpdate />
                                </div>
                                <div className="text-blue-500 ">
                                    {formatDate(item.updatedAt)}
                                </div>
                            </div> : 
                            <div className="mb-2 flex justify-end">
                                <div className="mt-1 mr-2 text-gray-600">
                                    <BsCalendar />
                                </div>
                                <div className="text-gray-700">
                                    {formatDate(item.createdAt)}
                                </div>
                            </div>}
                        </div>
                    )}