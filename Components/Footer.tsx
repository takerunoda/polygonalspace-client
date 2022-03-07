import React from 'react'
import PrivacyAndTOSnav from './PrivacyAndTOSnav';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const MyName = process.env.NEXT_PUBLIC_MYNAME
  const twitterAddress = process.env.NEXT_PUBLIC_TWITTER_ADDRESS
    return (
        <footer className="w-full mx-auto border-t border-gray-300 text-center py-10  text-sm sm:text-base">
            <div className="flex justify-center text-center mb-5">
                <PrivacyAndTOSnav center={true}/>
            </div>
            <ul className="flex justify-center">
              <li>
                <ul className="flex font-bold">
                  <li>
                    Built by&nbsp;<a className="text-blue-500 hover:underline"
                      href={twitterAddress && twitterAddress}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{MyName && MyName}</a>, {year}
                  </li>
                </ul>
              </li>
            </ul>
      </footer>)}

export default Footer
