import React from 'react';
import Link from 'next/link';
import Language from './Language';

interface ChildProps {
        name: string
        name_EN: string
        url: string
    }
interface ComponentProps {
    breadcrumb_1: ChildProps | null
    breadcrumb_2: ChildProps | null
    }

const Breadcrumb = ({breadcrumb_1, breadcrumb_2} : ComponentProps) => {

  return <div className="w-full sm:w-auto ml-8 lg:ml-56">
            <nav className="flex wrap" aria-label="Breadcrumb">
            <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center mb-2 sm:mb-0">
                <Link href="/">
                <a href="#" className="inline-flex items-center text-xs sm:text-sm text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Home
                </a>
                </Link>
                </li>
                {breadcrumb_1 && <li className="mb-2 sm:mb-0">
                <div className="flex items-center ">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                <Link href={breadcrumb_1.url}>
                    <a className="ml-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                        <Language jp={breadcrumb_1.name} en={breadcrumb_1.name_EN}/>
                    </a>
                </Link>
                </div>
                </li>}
                {breadcrumb_2 && <li className="mb-2 sm:mb-0" aria-current="page">
                <div className="flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <span className="ml-1 text-xs sm:text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">
                        <Language jp={breadcrumb_2.name} en={breadcrumb_2.name_EN}/>
                    </span>
                </div>
                </li>}
            </ol>
            </nav>
  </div>;
};

export default Breadcrumb;
