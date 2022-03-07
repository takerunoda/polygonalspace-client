import React from 'react'
import { formatDate } from '../utils/formatDate'
import { MdUpdate } from 'react-icons/md'
import { BsCalendar } from 'react-icons/bs'

export const DateInLIstBlog = ({item} : {item: any}) => {
                    return (
                        <div className="mr-5 text-sm sm:text-base font-bold flex justify-end">
                            {item.updated_at !== item.created_at ? <div className="mb-2 ml-2 flex justify-end">
                                <div className="mt-1 mr-2 text-blue-500">
                                    <MdUpdate />
                                </div>
                                <div className="text-blue-500 ">
                                    {formatDate(item.updated_at)}
                                </div>
                            </div> : 
                            <div className="mb-2 flex justify-end">
                                <div className="mt-1 mr-2 text-blue-500">
                                    <BsCalendar />
                                </div>
                                <div className="text-blue-500">
                                    {formatDate(item.created_at)}
                                </div>
                            </div>}
                        </div>)}