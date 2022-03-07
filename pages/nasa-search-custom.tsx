import React from 'react'
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import { PageProps } from '../Interfaces';
import HeadItem from '../Components/HeadItem';
import NasaSearchCustomComponent from '../Components/NasaSearchCustomComponent';
import { useSetQueryNull } from '../utils/useSetQueryNull';
import { useBodyOverflowHidden } from '../utils/useBodyOverflowHidden';
import { defaultPicture, headData } from '../utils/headData';

const NASA_Custom = ({ headObject, siteUrl, baseName, twitterID, MyName,} : PageProps) => {
    const { showSearchSettings } = useSearchContext()
    const { showDetailsModal, } = useModalContext()  
    useSetQueryNull()
    useBodyOverflowHidden({showModal: showDetailsModal})
    useBodyOverflowHidden({showModal: showSearchSettings})      

    return (<>
        {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItem
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {`nasa-search`}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <NasaSearchCustomComponent />
    </>)}

export default NASA_Custom

export const getStaticProps = async () => {
    const headObject = headData.find(x => x.page === "nasa_images_custom")
    const siteUrl = process.env.SITE_URL
    const baseName = process.env.BASE_SITE_NAME
    const twitterID = process.env.TWITTER_ID
    const MyName = process.env.MYNAME
    const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
    const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl}

      return {
            props: {
                    headObject: updatedHeadObject && updatedHeadObject,
                    siteUrl: siteUrl,
                    baseName: baseName,
                    twitterID: twitterID,
                    MyName: MyName,
            }, 
            revalidate: 10
  }
}