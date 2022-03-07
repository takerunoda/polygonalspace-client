import React from 'react'
import Language from './Language'
import { ExternalUrls } from '../utils/ExternalUrls'

interface FunctionProps { 
    platform:  string
    imageOnly:  boolean
}

const DataSource = ({platform, imageOnly} : FunctionProps) => {
    const urlNasaAPI = ExternalUrls.linkNASA_API
    const urlHubbleAPI = ExternalUrls.linkHUBBLE_API
    return (
                <>
                    <p className="text-gray-600 mt-5 font-semibold">
                        [&nbsp;<Language jp={imageOnly ? "画像出典" : "データ出典"} en={imageOnly ? "Image Source" : "Data Source"}/>:&nbsp; 
                        <a className={platform === "NASA" ? "text-indigo-600" : "text-green-600"} href={platform === "NASA" ? urlNasaAPI : urlHubbleAPI}>{platform}</a>&nbsp;]
                    </p>
                </>)}

export default DataSource