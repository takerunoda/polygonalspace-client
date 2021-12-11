import React, { useEffect, useState } from 'react'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Header from './Header'
import MessageModal from './MessageModal'
// import ScrollTop from './ScrollTop'
import { ChildrenProps } from '../Interfaces'
import { useModalContext } from '../context/ModalContext'
import { usePageContext } from '../context/PageContext'
import { useBodyOverflowHiddenNav } from '../utils/useBodyOverflowHiddenNav'
import { useResize } from '../utils/useResize'

const Layout = ({children}: ChildrenProps) => {
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const {message, setMessage, showMessageModal, setShowMessageModal} = modalContext  
    const {pathName, spMenuState, setSpMenuState} = pageContext  
    const [width, setWidth] = useState(0)
    useBodyOverflowHiddenNav({showModal: spMenuState})
    useResize({width, setWidth, setSpMenuState})   

        return (
        <div className={styles.layout} >
        <div className="w-full mx-auto overflow-x-hidden overflow-y-scroll">
            <div className={`${!pathName.includes("_id") && "mb-36 sm:mb-0"} `}>
                <Header />
            </div>
            <MessageModal message={message} setMessage={setMessage} showMessageModal={showMessageModal} setShowMessageModal={setShowMessageModal}/>
            <div className={`${!pathName.includes("_id") && "mb-24 sm:mb-0"} `}>
                { children }
            </div>
            <Footer />
            {/* <ScrollTop /> */}
        </div>
        </div>
    )
}

export default Layout
