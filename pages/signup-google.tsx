import React from 'react'
import { useUserContext } from '../context/UserContext'
import { PageProps } from '../Interfaces'
import LoaderPage from '../Components/LoaderPage'
import HeadItemNoIndex from '../Components/HeadItemNoIndex'
import SignupGoogleComponent from '../Components/SignupGoogleComponent'
import { defaultPicture, headData } from '../utils/headData'

const SignupGoogle = ({ headObject, siteUrl, baseName, twitterID, MyName } : PageProps) => {
    const { userState: {isLoggedin} } = useUserContext();

    return (
    !isLoggedin ? <>
    {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItemNoIndex
                    headObject= {headObject}
                    siteUrl= {siteUrl}
                    slug= {headObject.slug}
                    baseName= {baseName}
                    twitterID= {twitterID}
                    MyName= {MyName}            
                />}
        <SignupGoogleComponent />
    </> : 
    <LoaderPage />)}

export default SignupGoogle

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