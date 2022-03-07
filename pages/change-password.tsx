import React from 'react'
import { PageProps } from '../Interfaces'
import HeadItemNoIndex from '../Components/HeadItemNoIndex'
import ChangePasswordComponent from '../Components/ChangePasswordComponent'
import { defaultPicture, headData } from '../utils/headData'


const ChangePassword = ({ headObject, siteUrl, baseName, twitterID, MyName } : PageProps) => {

    return (<>
    {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItemNoIndex
                headObject= {headObject}
                siteUrl= {siteUrl}
                slug= {headObject.slug}
                baseName= {baseName}
                twitterID= {twitterID}
                MyName= {MyName}            
            />}
        <ChangePasswordComponent />
    </>)
    }

export default ChangePassword

export const getStaticProps = async () => {
            const headObject = headData.find(x => x.page === "no-index")
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