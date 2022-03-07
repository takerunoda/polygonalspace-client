import React, { useState } from 'react'
import Language from './Language'
import Breadcrumb from './Breadcrumb'
import EffectiveAsOf from './EffectiveAsOf'
import EmailAddressModal from './EmailAddressModal'

const TermsComponent = () => {
  const [showEmailAddress, setShowEmailAddress] = useState(false)
  const urlNASAMedia = process.env.NEXT_PUBLIC_NASA_MEDIA_GUIDELINES
  const breadcrumb_1 = null
  const breadcrumb_2 = { name: `利用規約`, name_EN: `Terms of Service`, url: `/terms-of-service`}

  return (
    <main>
    <EmailAddressModal 
      showEmailAddress={showEmailAddress} 
      setShowEmailAddress={setShowEmailAddress}/>
        <Breadcrumb
            breadcrumb_1={breadcrumb_1}
            breadcrumb_2={breadcrumb_2}            
        />
        <div className="privacyOuter">
          <h1 className="h1"><Language jp={`利用規約`} en={`Terms of Service`} /></h1>
              <div className="privacyH2">
                <h2 className="h2">
                  <p><Language jp={`当サイトについて`} en={`About Polygonal Space`} /></p>
                </h2>
                <h3 className="privacyParagraph">
                  <Language jp={`Polygonal Space (以下、「当サイト」と表記)は、NASA (アメリカ航空宇宙局) が提供するAPI (Application Programming Interface) を利用した、WEBアプリケーションです。NASA APIを利用して、NASAが公開している"NASA Image and Video Library"からNASAの画像データ、テキストデータを取得・表示しています。`} en={`Polygonal Space ("this website") is a web application which displays image and text data retrieved from "NASA Image and Video Library" provided by NASA (The National Aeronautics and Space Administration). This application uses NASA API to access the library.`} />
                </h3>
                <h3 className="privacyParagraph">
                  <Language jp={`当サイトは宇宙分野についての情報提供を目的とします。当サイトのユーザー (当サイトの訪問者および利用者を含む、以下「ユーザー」と表記) は当サイトが提供する機能を無料で利用することができます。ユーザーは所定のユーザー登録を行うことで登録ユーザーとなることができます。当サイトの一部機能は、登録ユーザーのみが利用できるように設定されています。`} en={`One of our main purposes in this website is to provide users with educational information about the space. The users of this website ("users" including those who visit or use our website) can use our service in this webiste at free of charge. You can become a registered user ("registered user") by completing signup process. Some of our service are restricted to registered users.`} />
                </h3>
                <h3 className="privacyParagraph">
                <Language jp={`当サイトの検索ページには、複数の宇宙関連のキーワードが表示されており、ユーザーはこれらのキーワードを用いてNASAの記事を検索することができます。特に、日本のユーザーが、日本語のキーワードを用いてNASAの画像・テキスト情報を検索できるように設定されていることが特徴です。`} en={`We prepared space-related keywords that are listed in the search page. You can use the keywords to search for NASA articles. Our application gets the selected keyword, sends a query to NASA website, and retrieves a search result to display for you.  One of the key features of this website is to search for NASA image and text data with Japanese keywords prepared mostly for Japanese users. English keywords are also provided for search.`} />
                </h3>
                <h3 className="privacyParagraph"><Language jp={`ユーザーは、所定の登録手続きを経て、登録ユーザーになることができます。登録ユーザーは、ブックマーク機能を利用することができます。ブックマークとは、検索ページで見つけた記事情報を後で参照できるように保存する機能です。ブックマークした記事は、アカウント情報に紐づけて保存され、アカウントにログインすると表示されます。`} en={`You can create your user account with email address and password or via Google authentication. We prepared  bookmark feature for registered users. With this bookmark feature, you can save your favorite in your account so that you can read them later on.`} /></h3>
              </div>
              <div className="privacyH2">
              <h2 className="h2">
                <p><Language jp={`著作権`} en={`Copyright`} /></p>
              </h2>
                <h3 className="privacyH3SubTitle">
                     <Language jp={`NASA APIを通じたデータの取得について`} en={` Use of NASA API`} />
                </h3>
                <p className="privacyParagraph"><Language jp={`上述の通り、当サイトでは、NASA APIを通じてNASAの画像・テキストデータを取得しています。当サイトにおける画像およびテキストデータの取得および表示に関する規定は、NASAの「メディア利用規定 ("Media Usage Guidelines")」に準拠しています (以下「NASAメディア利用規定」と表記)。`} en={`As mentioned above, this website retrieves NASA image and text data by using NASA API. We comply with NASA's "Media Usage Guidelines" ("NASA Media Usage Guidelines") in regard with retrieving and displaying NASA imaege and text data.`} /></p>
                <p className="privacyParagraph"><Language jp={<><span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlNASAMedia} target="_blank" rel="noreferrer">NASAメディア利用規定</a></span>には、NASAの画像データ等は、当該規定を遵守したうえで、教育・情報目的のためにWEBページ等に掲載できる旨が記載されています。</>} en={<>According to <span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlNASAMedia} target="_blank" rel="noreferrer">NASA Media Usage Guidelines</a></span>, NASA content including images, audio, video, and computer files may be used for educational or informational purposes without needing explicit permission, subject to compliance with these guidelines.</>} /></p>
                <p className="privacyParagraph"><Language jp={`当サイトでは、NASAメディア利用規定に従い、当サイトがNASA APIを通じて取得・掲載する画像・テキストデータに関しては、その旨を注記しています。`} en={`This website, complying with NASA Media Usage Guidelines, mentions the source of image and text data that are retrieved from NASA. `} /></p>
                <p className="privacyParagraph"><Language jp={`NASA APIを通じて当サイトが取得・表示する画像、テキストデータについて、当サイトが著作権を主張することはありません。`} en={`We do not own copyright of the image and text data that are retrieved from NASA and displayed in this website. `} /></p>
                <p className="privacyParagraph"><Language jp={`当サイトに掲載されている内容のうち、当サイトがNASAなどの第三者機関から取得するデータ以外のものに関しては、その著作権は当サイトに帰属します。`} en={`We are the copyright holder of our own content that are created by ourselves. Specifically, we are the copyright holder of the content that are neither retrieved from NASA nor any other third-party websites.`} /></p>
                <h3 className="privacyH3SubTitle">
                  <p><Language jp={`当サイトがNASAから取得したデータを`} en={`Usage of`} /></p>
                  <p><Language jp={`利用する場合について`} en={`Data Displayed in This Website`} /></p>   
                </h3>
                <p className="privacyParagraph">
                  <Language jp={<>ユーザーは、当サイトがNASAから取得・表示する画像・テキストデータを利用することができます (以下、「データ利用」と表記します)。ただし、データ利用する場合は、<span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlNASAMedia} target="_blank" rel="noreferrer">NASAメディア利用規定</a></span>をはじめとした、NASAが規定するデータ利用についての諸規定を遵守する必要があります。</>} en={<>When you use the image and text data retrieved from NASA in this website, you should comply with the NASA guidelines including <span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlNASAMedia} target="_blank" rel="noreferrer"> NASA Media Usage Guidelines</a></span> regarding usage of data provided by NASA.</>} />
                </p>
              </div>
              <div className="privacyH2">
              <h2 className="h2">
                <p><Language jp={`免責事項`} en={`Limits on liability`} /></p>
              </h2>
                <p className="privacyParagraph"><Language jp={`当サイトは、当サイトに掲載された内容によって生じた損害等について、何らの責任を負うものではありません。`} en={`In no event shall the administrator of this website be liable for any consequential damages in relation with contents displayed in this website. `} /></p>
                <p className="privacyParagraph"><Language jp={`また、当サイトは、当サイトの利用者が当サイトの情報を用いて行う一切の行為について、何らの責任を負うものではありません。`} en={`In no event shall the administrator of this website be liable for any actions made by a users of this website in relation with contents displayed in this website. `} /></p>
                <p className="privacyParagraph"><Language jp={`当サイト上の情報やURLは、予告なしに変更または削除される場合がありますのでご了承ください。`} en={`Please be noted that we may change or delete information or URL in this website, or stop our service without notification`} /></p>
              </div>  
              <div className="privacyH2">
              <h2 className="h2">
                <p><Language jp={`アカウントの停止・削除について`} en={`Account Suspension and Termination`} /></p>
              </h2>
                <p className="privacyParagraph"><Language jp={`登録ユーザーは、いつでも自分のアカウントを削除することができます。アカウントの削除は、登録ユーザーの「マイページ」から行うことができます。`} en={`If you have a user account, you can delete your account at anytime. Specifically, you can delete your account in your "My Page".`} /></p>
                <p className="privacyParagraph"><Language jp={`当サイトの運営者は、登録ユーザーのアカウントを停止または削除することがあります。アカウントの停止・削除する場合は、原則として、当該登録ユーザーに事前にその旨を通知しますが、場合によっては、登録ユーザーに対して予告なくアカウントを停止・削除することがあります。`} en={`We may suspend or delete user's accounts in our sole discretion. In most cases, we will give you a notice before or after suspension or deletion of your account. However, we may proceed to suspend or delete your account without notification.`} /></p>
              </div>
              <div className="privacyH2">
                <h2 className="h2"><Language jp={`お問い合わせ先`} en={`How you may contact us`} /></h2>
                  <p className="leading-relaxed"><Language jp={<>利用規約に関してご不明な点、ご要望がございましたら、<button onClick={() => setShowEmailAddress(true)}><span className="text-blue-500 hover:underline cursor-pointer font-bold">こちらのメールアドレス</span></button>からお問い合わせいただけます 。</>} en={<>If you have inquiries or concerns with regards to this terms of service, please contact us. <button onClick={() => setShowEmailAddress(true)}><span className="text-blue-500 hover:underline cursor-pointer font-bold">Click to show email address. </span></button></>} /></p>
                </div>              
              <div className="privacyH2">
                <h2 className="h2"><Language jp={`利用規約の変更`} en={`Changes to Terms of Service`} /></h2>
                  <p className="privacyParagraph"><Language jp={`当サイトの運営者は、当サイトが提供するサービスを適宜見直し、その改善に努め、必要に応じて利用規約を改訂いたします。`} en={`We may change our Terms of Service from time to time, and in our sole discretion. We encourage you to frequently check this page for any changes to the Terms of Service.`} /></p>
                  <p className="privacyParagraph"><Language jp={`利用規約の改訂が実施された場合、最新の利用規約は、本ページにて開示されます。`} en={`In the case where any changes are applied to the Terms of Service, the latest version of the policy will be displayed in this page.`} /></p>
                  <p className="privacyParagraph"><Language jp={`ユーザーが利用規約の改定後も当サイトの利用を継続する場合、当該改訂に同意したものとみなされます。`} en={`Your continued use of this site after any change in this Terms of Service will constitute your acceptance of such change.`} /></p>
              </div>
              <EffectiveAsOf />
        </div>       
    </main>
  )
}

export default TermsComponent