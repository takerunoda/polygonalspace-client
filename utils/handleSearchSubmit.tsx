import { Dispatch, FormEvent, MutableRefObject, SetStateAction } from 'react'
import axios, { CancelTokenSource } from 'axios';
import { nasaStateDataInterface } from '../Interfaces';
import Language from '../Components/Language';
import { data, nasa } from './urls';
import { handleMessageModal } from './handleMessageModal';

interface FunctionProps {
                    setNasaState: Dispatch<SetStateAction<nasaStateDataInterface[] | undefined>>
                    setSearchCurrentPage: Dispatch<SetStateAction<number>>
                    setSearchTotalPages: Dispatch<SetStateAction<number>>
                    setLoading: Dispatch<SetStateAction<boolean>>
                    setHasMore: Dispatch<SetStateAction<boolean>>
                    scrollRef: (ref: any) => void
                    keywordRef: MutableRefObject<null>
                    resultsRef: MutableRefObject<null>
                    query: string
                    postsPerPageNASA: number 
                    setTotalPosts: Dispatch<SetStateAction<number | undefined>>
                    cancelSourceSearch: CancelTokenSource | undefined 
                    setCancelSourceSearch: Dispatch<SetStateAction<CancelTokenSource | undefined>>
                    showMessageModal: boolean
                    setShowMessageModal: Dispatch<SetStateAction<boolean>>
                    setMessage: Dispatch<SetStateAction<string | JSX.Element>>
                    timeoutId: NodeJS.Timeout | null | undefined
                    setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | null | undefined>>
                    mediaPreference: number
                    sortPreference: boolean
                }

export const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>,
    {   setNasaState,
        setLoading,
        scrollRef,
        keywordRef,
        resultsRef,
        query,
        postsPerPageNASA,
        setTotalPosts,
        setSearchCurrentPage,
        setSearchTotalPages,
        setHasMore,
        cancelSourceSearch, setCancelSourceSearch,
        showMessageModal,
        setShowMessageModal,
        setMessage,
        timeoutId,
        setTimeoutId,
        mediaPreference,
        sortPreference,
    } : FunctionProps) => {     
        try {
            const source = axios.CancelToken.source()
            if(cancelSourceSearch && cancelSourceSearch !== undefined){
                cancelSourceSearch.cancel("Canceled due to a new search")
                console.log("canceled - 1");                
                console.log(`query: ${query}`);
            }
                setCancelSourceSearch(source)
            e.preventDefault();
            // set loading true when a query is submitted
                setNasaState([])
                setSearchCurrentPage(1)
                setLoading(true)
                keywordRef && keywordRef.current && scrollRef(keywordRef)            
               if (query === '' || query === undefined)  return
                const inputData = { 
                    query: query, 
                    currentPage: 1, 
                    mediaPreference: mediaPreference, 
                    sortPreference: sortPreference, 
                }
                const url = `${process.env.NODE_ENV === 'production' ?
                        process.env.NEXT_PUBLIC_SERVER_URL :
                        process.env.NEXT_PUBLIC_SERVER_URL_2}/${nasa}/${data}`
                

                const response = 
                await axios({
                        method: 'POST',
                        url: url,
                        data: inputData,
                        withCredentials: true,
                        cancelToken: source.token
                        });
                const ok = await response.data.ok
                if(ok !== true){
                    throw new Error("request failed")
                }
                const nasaStateData = response.data.nasaStateData
                const totalPages = response.data.totalPages
                const totalPostsData = response.data.totalPosts ? response.data.totalPosts : 0
                    const newItemsSet = [...new Set([...nasaStateData])]

                let newItems
                newItems = newItemsSet.sort((a, b) => {
                if(!a.dateCreated || !b.dateCreated) return 0
                const A = a.dateCreated ? new Date(a.dateCreated).getTime() : 0
                const B = b.dateCreated ? new Date(b.dateCreated).getTime() : 0
                const X = inputData.sortPreference === true ? 
                B - A : A - B
                return X
                })

                newItems && setNasaState(newItems)                
                setLoading(false)          
                resultsRef && resultsRef.current && scrollRef(resultsRef)
                console.log(`${query}: ${JSON.stringify(newItems)}`);
                setTotalPosts(totalPostsData)
                setSearchTotalPages(totalPages)
                setHasMore(nasaStateData.length > 0);
        } catch (err: any) {
            let messageData
            if(err){ 
                if(err.response && err.response.data.errors){
                    if(err.response.data.errors === "searchNumber"){
                    messageData = <Language jp={<p>1日50件以上検索するにはユーザー登録が必要です <span className="text-lg"></span></p>} en={<p>Signup is required to search for 50+ keywords a day <span className="text-lg"></span></p>}/>
                }
                    if(err.response.data.errors === "searchNumberLoggedin"){
                    messageData = <Language jp={<p>1日の検索上限に達しました。 <span className="text-lg"></span></p>} en={<p>You've reachead the daily search limit. <span className="text-lg"></span></p>}/>
                }
            }
        } else {
            setLoading(false)            
            return 
        }
        messageData && handleMessageModal({showMessageModal, setShowMessageModal, messageData, setMessage, timeoutId, setTimeoutId})
        }
        setLoading(false)
    }

