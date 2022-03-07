import React, { createContext, useContext, useMemo } from 'react'
import { IndexContextType, IndexProps,  } from '../Interfaces';
import HeadItemHome from '../Components/HeadItemHome';
import IndexComponent from '../Components/IndexComponent';
import { defaultPicture, headData } from '../utils/headData';

const IndexContext = createContext<IndexContextType | undefined>(undefined)

const Index = ({headObject, siteUrl, baseName, twitterID, MyName, twitterAddress} : IndexProps) => {
    const value = useMemo(() => ({
        headObject, siteUrl, baseName, twitterID, MyName, twitterAddress
    }), [headObject, siteUrl, baseName, twitterID, MyName, twitterAddress])

  return (
    <IndexContext.Provider value={value}>
        {headObject && siteUrl && baseName && twitterID && MyName && 
        <HeadItemHome
            headObject= {headObject}
            siteUrl= {siteUrl}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName} />}
        <IndexComponent />
    </IndexContext.Provider>)}

export default Index

export function useIndexContext(){
    const context = useContext(IndexContext)
        if(context === undefined){
            throw new Error("useContext(useIndexContext) is undefined")
        }
        return context
    }

export const getStaticProps = async () => {
    const headObject = headData.find(x => x.page === "about")
    const siteUrl = process.env.SITE_URL
    const baseName = process.env.BASE_SITE_NAME
    const twitterID = process.env.TWITTER_ID
    const MyName = process.env.MYNAME
    const twitterAddress = process.env.TWITTER_ADDRESS
    const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
    const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl}

      return {
            props: {
              headObject: updatedHeadObject && updatedHeadObject,
              siteUrl: siteUrl,
              baseName: baseName,
              twitterID: twitterID,
              MyName: MyName,
              twitterAddress: twitterAddress,
            }, 
            revalidate: 10
  }
}