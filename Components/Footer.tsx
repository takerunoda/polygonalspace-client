import React from 'react'
import { usePageContext } from '../context/PageContext';
import { RiUserStarLine } from 'react-icons/ri';
import PrivacyAndTOSnav from './PrivacyAndTOSnav';
import { IoPlanetSharp } from 'react-icons/io5';

const Footer = () => {
    const pageContext = usePageContext()
    if ( !pageContext ) {
      return null;
    }
    
  const date = new Date();
  const year = date.getFullYear();
    return (
        <footer className="w-full border-t border-gray-300 text-center py-10  text-sm sm:text-base">
            <div className="flex justify-center text-center mb-5">
                <PrivacyAndTOSnav center={true}/>
            </div>
            <ul className="flex justify-center">
              <li>
                <ul className="flex font-bold">
                  {/* <li className="text-xl sm:text-2xl mr-2 text-pink-500">
                    <IoPlanetSharp />
                  </li> */}
                  <li>
                    Built by&nbsp;<a className="text-blue-500 hover:underline"
                      href={process.env.NEXT_PUBLIC_TWITTER}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{process.env.NEXT_PUBLIC_MYNAME}</a>, {year}
                  </li>
                </ul>
              </li>
            </ul>
      </footer>
    )
}

export default Footer
