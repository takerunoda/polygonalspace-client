import React from 'react'
import Language from './Language'
import { FcSearch } from 'react-icons/fc'

interface ComponentProps {
    custom: boolean
}

const NasaSearchH1 = ({custom} : ComponentProps) => {
    return (
        <>
            <h1 className="h1">
                <div className=" flex justify-center">
                    <div className="text-indigo-500 text-4xl sm:text-5xl mt-1 sm:mt-0 mr-2 sm:mr-3">
                        <FcSearch />
                    </div>
                    <div className="pt-1">
                        
                    <Language jp={<p>NASAの</p>} en={<p>Search for</p>} />
                    </div>
                </div>
                    <Language jp={<p>宇宙画像を検索</p>} en={<p>NASA Space images</p>} />               
                {custom && <div className="text-lg sm:text-2xl font-bold mt-1 sm:mt-2 text-center;">
                    <Language jp={<p>(フリーワード)</p>} en={<p>(Custom Search)</p>} />          
                </div>}
            </h1>
        </>)}

export default NasaSearchH1
