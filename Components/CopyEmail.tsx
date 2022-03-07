import React, { useState } from 'react'
import Language from './Language';

const CopyEmail = ({ copyText } : { copyText: string}) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyTextToClipboard = async (text : string) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return
    }}

  const handleCopyClick = async () => {
    try {
        await copyTextToClipboard(copyText)
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
    } catch (err) {
        console.log(err);      
    }}

  return (
    <ul>
        <li>
            <input type="text" value={copyText} className="hidden" readOnly />
        </li>
      <li>
        <button onClick={handleCopyClick} className={`${!isCopied ? "text-purple-500 border-purple-500" : "text-red-500 border-red-500"} border rounded mt-5 font-bold`}>
            <Language jp={<p className="py-2 px-2 w-36 "> {isCopied ? <span className="text-sm">コピーしました</span> : 'コピー'}</p>} en={<p className="py-2 px-2 w-28 "> {isCopied ? 'Copied!' : 'Copy'}</p>}/>
        </button>
      </li>
    </ul>
  )}
export default CopyEmail
