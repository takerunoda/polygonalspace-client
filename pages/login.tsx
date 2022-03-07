import React from 'react'
import { useUserContext } from '../context/UserContext'
import { PageProps } from '../Interfaces'
import HeadItem from '../Components/HeadItem';
import LoaderPage from '../Components/LoaderPage';
import LoginComponent from '../Components/LoginComponent';
import { defaultPicture, headData } from '../utils/headData';

const Login = ({headObject, siteUrl, baseName, twitterID, MyName} : PageProps) => {
    const {userState: {isLoggedin}} = useUserContext()

    return (
    !isLoggedin ? <>
        {headObject && siteUrl && baseName && twitterID && MyName && <HeadItem
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {`login`}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
          <LoginComponent />
        </> :
        <LoaderPage />
    )
}

export default Login

export const getStaticProps = async () => {
    const headObject = headData.find(x => x.page === "login")
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
