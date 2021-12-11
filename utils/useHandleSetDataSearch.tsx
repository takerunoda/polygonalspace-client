import { Dispatch, SetStateAction, useEffect } from 'react'
import Cookies from 'js-cookie'
import { nasaStateDataInterface } from '../Interfaces'

interface FunctionProps {
                        nasaState: nasaStateDataInterface[] | null,
                        postsPerPage: number,
                        setLastPage: Dispatch<SetStateAction<number>>,
                        currentPage: number,
                        currentPageString: string,
                        setCurrentNasaData: Dispatch<SetStateAction<nasaStateDataInterface[] | undefined>>}                       

export const useHandleSetDataSearch = ( { 
                                    nasaState,
                                    postsPerPage,
                                    setLastPage,
                                    currentPage,
                                    currentPageString,
                                    setCurrentNasaData} : FunctionProps) => {
                useEffect(() => {
                        const x: number = nasaState ? nasaState.length : 1
                        
                        const y = Math.ceil(x / postsPerPage)

                        setLastPage(y)

                        const indexOfLastPost: number = currentPage * postsPerPage

                        const indexOfFirstPost = indexOfLastPost - postsPerPage
                        
                        const currentPosts: nasaStateDataInterface[] = nasaState ? nasaState.slice(indexOfFirstPost, indexOfLastPost) : []

                        currentPosts && setCurrentNasaData(currentPosts)

                        Cookies.set(currentPageString, JSON.stringify(currentPage), {sameSite: 'strict'});

                    }, [nasaState, currentPage])}
