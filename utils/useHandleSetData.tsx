import { Dispatch, SetStateAction, useEffect } from 'react'
import Cookies from 'js-cookie'
import { PostInterface, BookmarkItemInterface } from '../Interfaces'

interface FunctionProps {
                        postData: PostInterface[] | BookmarkItemInterface[] | null,
                        postsPerPage: number,
                        setLastPage: Dispatch<SetStateAction<number>>,
                        currentPage: number,
                        currentPageString: string,
                        setData: Dispatch<SetStateAction<PostInterface[] | BookmarkItemInterface[]>>}                       

export const useHandleSetData = ( { postData,
                                    postsPerPage,
                                    setLastPage,
                                    currentPage,
                                    currentPageString,
                                    setData} : FunctionProps) => {
                useEffect(() => {
                        const x: number = postData ? postData.length : 1
                        
                        const y = Math.ceil(x / postsPerPage)

                        setLastPage(y)

                        const indexOfLastPost: number = currentPage * postsPerPage

                        const indexOfFirstPost = indexOfLastPost - postsPerPage
                        
                        const currentPosts: BookmarkItemInterface[] | PostInterface[] = postData ? postData.slice(indexOfFirstPost, indexOfLastPost) : []

                        setData(currentPosts)

                        Cookies.set(currentPageString, JSON.stringify(currentPage), {sameSite: 'strict'});

                    }, [postData, currentPage])}
