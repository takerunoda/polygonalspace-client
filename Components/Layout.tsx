import React from 'react'
import { usePageContext } from '../context/PageContext'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Header from './Header'
import MessageModal from './MessageModal'
import { ChildrenProps } from '../Interfaces'
import { useResize } from '../utils/useResize'
import { useSetPathName } from '../utils/useSetPathName'
import { useSetCurrentPage } from '../utils/useSetCurrentPage'
import { useSetSpMenuState } from '../utils/useSetSpMenuState'
import { useSetLanguageCookie } from '../utils/useSetLanguageCookie'
import { useUpdateAccessToken } from '../utils/useUpdateAccessToken'
import { useSetBrowserLanguage } from '../utils/useSetBrowserLanguage'
import { useCancelOverflowHidden } from '../utils/useCancelOverflowHidden'
import { useBodyOverflowHiddenNav } from '../utils/useBodyOverflowHiddenNav'
import { useGetUserDataFromCookies } from '../utils/useGetUserDataFromCookies'

const Layout = ({children}: ChildrenProps) => {
    const {pathName} = usePageContext()  
    useBodyOverflowHiddenNav()
    useResize()
    useGetUserDataFromCookies()
    useUpdateAccessToken()
    useSetBrowserLanguage()
    useSetLanguageCookie()
    useSetPathName()
    useSetCurrentPage()
    useSetSpMenuState() 
    useCancelOverflowHidden()

        return (
        <div className={styles.layout} >
        <div className="w-full mx-auto overflow-x-hidden overflow-y-scroll">
            <div className={`${!pathName.includes("-item") && !pathName.includes("blog") && "mb-24 sm:mb-0"} `}>
                <Header />
            </div>
            <MessageModal />
            <div className={`${!pathName.includes("-item") && !pathName.includes("blog") && "mb-24 sm:mb-0"} `}>
                { children }
            </div>
            <Footer />
        </div>
        </div>)}

export default Layout
