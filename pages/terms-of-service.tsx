import React from 'react'
import { PageProps } from '../Interfaces';
import HeadItem from '../Components/HeadItem';
import TermsComponent from '../Components/TermsComponent';
import { defaultPicture, headData } from '../utils/headData';

export default function TermsOfService({headObject, siteUrl, baseName, twitterID, MyName} : PageProps) {

  return (
    <>
        {headObject && siteUrl && baseName && twitterID && MyName && 
        <HeadItem
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {`terms-of-service`}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <TermsComponent />        
  </>)
}

export const getStaticProps = async () => {
    const headObject = headData.find(x => x.page === "terms")
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