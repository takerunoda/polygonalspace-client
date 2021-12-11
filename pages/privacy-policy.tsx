import React, { useState } from 'react'
import { HeadProps } from '../Interfaces';
import HeadItem from '../Components/HeadItem';
import Language from '../Components/Language';
import EmailAddressModal from '../Components/EmailAddressModal';
import { headData } from '../utils/headData';
import { ExternalUrls } from '../utils/ExternalUrls';
import EffectiveAsOf from '../Components/EffectiveAsOf';

export default function About({headObject} : HeadProps) {
  const [showEmailAddress, setShowEmailAddress] = useState(false)
  const urlGoogleTOS = ExternalUrls.linkGOOGLE_ANALYTICS_TOS
  const urlGooglePrivacy = ExternalUrls.linkGOOGLE_ANALYTICS_PRIVACY
  return (
    <>
      <HeadItem
          imageUrl={headObject.imageUrl}
          title={headObject.title}
          description={headObject.description}
          noIndex={false}
          defaultURL={false}
      />
      <main>
      <EmailAddressModal 
        showEmailAddress={showEmailAddress} 
        setShowEmailAddress={setShowEmailAddress}/>
        <div className="privacyOuter">
          <h1 className="h1"><Language jp={"プライバシーポリシー"} en={"Privacy Policy"} /></h1>
           <h2 className="privacyH2">
              <p className="privacyParagraph"><Language jp={"本プライバシーポリシーは、Polygonal Space (以降「当サイト」と表記)における、当サイトの利用者 (以降「ユーザー」と表記)に関する個人情報、および、それに準ずるデータを取り扱う際に、当サイトが遵守する方針について示したものです。"} en={`This Privacy Policy describes the policy of Polygonal Space ("Polygonal Space", "this website," "we", "our" or "us") regarding  personally-identifying data and non- personally-identifying data of the users of this website ("the users"). `} /></p>
              <p className="privacyParagraph"><Language jp={"本プライバシーポリシーには、当サイトがどのようなデータを取得し、どのような手段で取得し、そのデータをどのような目的で使用し、またどのように管理するかについて記載されています。"} en={`This Privacy Policy describes what data we collect, how we collect it, why we collect the data, and how the data you provide to us is controlled.`} /></p>
              <div className="privacyH2">
              <h2 className="h2">
                <p><Language jp={"当サイトが取得するデータの種類"} en={`What data is collected`} /></p>
                <p><Language jp={"および使用目的"} en={`Why we collect it`} /></p>
              </h2>
              <p><Language jp={"当サイトが取得するデータは、大きく分けて3種類あります。"} en={`There are three types of data that we collect in this website.`} /></p>
              <ul　className="sm:ml-10 mt-3 font-bold mb-8 sm:mb-12 ">
                <li className="indent"><Language jp={"1. ユーザーから送信されるデータ"} en={`1. Information submitted by users`} /></li>
                <li className="indent"><Language jp={"2. 当サイトが自動的に取得するデータ"} en={`2. Information automatically collected in this website`} /></li>
                <li className="indent"><Language jp={"3. クッキー"} en={`3. Cookies`} /></li>
              </ul>
                <h3 className="text-lg sm:text-2xl font-bold mt-4 sm:mt-8 mb-5 sm:mb-8 text-center indent">
                  <Language jp={<ul><li>1. ユーザーから送信される</li><li>データ</li></ul>} en={`1. Data submitted by user`} />
                </h3>
                <p className="privacyParagraph"><Language jp={"当サイトでは、以下のようなデータを取得することがあります。"} en={`This website may collect data submitted by users as described below.`} /></p>
                <ul className="mb-10 sm:mb-16">
                  <li className="mb-3 indent">◉ <Language jp={"ユーザーアカウント作成の際に登録するメールアドレスなどのデータ"} en={`Data for signup such as email address when a user create a new user account.`} /></li>
                  <li className="mb-3 indent">◉ <Language jp={"サイトコンテンツに対するユーザーの反応についてのデータ (ユーザーがブックマークに追加したアイテムの情報など)"} en={`Information on user’s interaction with this website such as which articles the user bookmarked.`} /></li>
                  <li className="mb-3 indent">◉ <Language jp={"サイトに関するフィードバックやお問い合わせ (名前・メールアドレスを含む)"} en={`Feedbacks and inquiries sent from the users including contact information such as names and email addresses.`} /></li>
                <p className="mt-8">
                  <Language jp={"上記の情報のうち、名前、メールアドレスは個人を識別する情報（以降「個人情報」と表記）として分類される可能性があります。"} en={`Among the data described above, names and email addresses may be categorized as personally identifiable data.`} />
                </p>
                <p className="mt-8">
                  <Language jp={<p className="privacyParagraph">ユーザーが当サイトをどのように利用するかに応じて、ユーザーが送信する情報の種類は異なります。例えば、検索表示された記事を、当サイトの機能を用いてブックマークする場合、ユーザーはアカウントを作成する必要があります。アカウント作成の際に、メールアドレスの情報を登録していただいています。しかし、ユーザーが画像の検索機能だけを利用する場合、ユーザー登録は不要です。</p>} en={<><p className="privacyParagraph">The amount and type of data that this website gathers depends on the nature of the interaction.</p>
                  <p className="privacyParagraph">For example, if a user would like to use the bookmarking feature provided in this website, the user is required to sign up. In a sign-up process, a user is required to provide email address. However, signfup is not mandatory if a user just would like to search for NASA image items in this website.</p></>} />
                </p>
                <p className="mt-8">
                  <Language jp={"また、当サイトではGoogleログイン機能を利用することができます。Googleログインとは、ユーザーのGoogleアカウントを通じて当サイトのアカウントにログインできる機能です。Googleログインを有効にした場合、Googleにユーザーの情報が送信されることがあります。"} en={`Additionally, to improve user experience, we offer single a sign-on solution for account login (Google login). With Google login functionality enabled, you can log in this website by using your Google account. Google may receive data from the service when you elect to use Google login`} />
                </p>
                </ul>
                <h3 className="text-lg sm:text-2xl font-bold mt-4 sm:mt-8 mb-5 sm:mb-8 text-left">
                      2. <Language jp={"当サイトが自動的に取得するデータ"} en={`Information automatically collected in this website`} />
                </h3>
                <p className="privacyParagraph"><Language jp={"「当サイトが自動的に取得するデータ」とは、ユーザーが利用するブラウザーの種類、ブラウザーの言語、ユーザーが当サイトのサーバーにリクエストを送信した日時、ユーザーが利用するデバイスのIPアドレスなど、ユーザーがサーバーにリクエストを送信する際に、サーバーが自動的に取得可能なデータです。一般的には、これらの情報だけを用いて個人が識別されることはありません。"} en={`The data automatically collected by this website" refers to information of the sort that our server collects automatically when a user makes request to the server, such as  the browser type, language preference, referring website, the date and time of each user's request, and IP address.  Generally, a person is not identified solely by the information.`} /></p>
                <p className="privacyParagraph"><Language jp={"当サイトでは、サービス品質の改善のために、これらの情報を利用しています。"} en={`The data described above is used by this website  in order to enhance quality of our service for users .`} /></p>
                <p className="privacyParagraph"><Language jp={"例えば、当サイトでは、ユーザーが初めて当サイトを閲覧する際にブラウザのデフォルト言語の情報を取得し、その言語情報に応じて、表示言語を切り替えるように設定されています。"} en={`For example, this website collects language preference set in a browser when a user visits our website for the first time, and then sets the default language for the user.`} /></p>
                <p className="privacyParagraph"><Language jp={"また当サイトは、当サイトおよびユーザーをサイバーセキュリティー面で保護するため、これらのデータを利用することがあります。"} en={`In addition, this website uses the dat descrived above in order to protect this website and the users from attackers in the internet. `} /></p>
                <p className="privacyParagraph"><Language jp={"例えば、アカウントの新規作成、パスワードの変更など、機密性が比較的高いデータについてデータベースの変更を生じる場合、および、ゲストログインなど、ユーザー登録していないユーザーに当サイトの一部機能の使用を許可する場合については、メールアドレス、IPアドレス、利用日時などのデータを記録することがあります。"} en={`For example, this website may record an email address, an IP address, and the date and time of each request when a user makes requests to update data in our server in regard with relatively confidential data such as updating passwords, and when this website allows a user to use a part of features of this website without signup, such as guest login. `} /></p>
                <h3 className="text-lg sm:text-2xl font-bold mt-4 sm:mt-8 mb-5 sm:mb-8 text-left">
                  3. <Language jp={"クッキー"} en={`Cookies`} />
                </h3>
                  <p className="privacyParagraph"><Language jp={"クッキーとは、ウェブサイトがユーザーのデバイス (PC、スマートフォンなど) に保存するテキストファイルです。クッキーには、ユーザーのログイン情報、言語、などの情報が保存されており、これらの情報をブラウザーとサーバーの間でやり取りすることによって、ユーザーは当サイトの各種機能を利用することができます。"} en={`A cookie is a string of information that a website stores on a device (computer, smartphone, etc.) of a user so that a browser of the user provides the data to a server each time the user returns.  The cookies that our server installs to a vistor's browser includes information on the user such as account information and language preference of the user. `} /></p>
                  <p className="privacyParagraph"><Language jp={"例えば、ユーザーのデバイスに保存されているログイン情報を、ブラウザーがサーバーに送信することによって、サーバーはユーザーを識別し、ユーザーがブックマークした記事の情報など、ユーザーにとって必要な情報をデータベースから取得してユーザーのブラウザーに送信することができます。"} en={`Most of the features in this website function based on cookies. For example, our server retrieves user's data from the database based on the information sent from the user's browser. Specifically, our server recognizes a user based on information stored in cookies of the user so that our server can access data of the user in the database, such as bookmarked items.`} /></p>
                  <p className="privacyParagraph"><Language jp={"ユーザーが、自分のデバイスにクッキーが保存されることを希望しない場合は、クッキーを保存しないようにブラウザーの設定を変更することができます。ただし、当サイトではクッキーに保存されたデータ通じてブラウザーとサーバーの間でデータのやり取りをしているため、クッキーを使用しない場合、当サイトの一部機能が正常に動作しない可能性があります。"} en={`Visitors who do not wish to have cookies placed on their devices should set their browsers to refuse cookies before using this website, with the drawback that certain features of this website may not function properly without the aid of cookies.`} /></p>
              </div>
              <div className="privacyH2">
                <h2 className="h2"><Language jp={"情報の第三者への開示について"} en={`With whom data is shared`} /></h2>
                  <p className="privacyParagraph"><Language jp={"当サイトはご提供いただいた個人情報を適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。"} en={`The data collected by this website will be properly managed, and shall not be disclosed to others except for the following cases: `} /></p>
                  <ul>
                    <li className="mb-3 indent">◉ <Language jp={"ユーザーご本人の同意がある場合"} en={`if the user consents to the transfer of such data`} /></li>
                    <li className="mb-3 indent">◉ <Language jp={"行政機関、司法機関、その他の公的機関から請求があった場合"} en={`in response to a subpoena, court order or other governmental request`} /></li>
                    <li className="mb-3 indent">◉ <Language jp={"法令等に基づき開示することが必要であると認められる場合"} en={`if we believe in good faith that disclosure is reasonably necessary to protect the property or rights of us, third parties or the public at large`} /></li>
                    <li className="mb-3 indent">◉ <Language jp={"Googleログイン機能を有効にしている場合"} en={`if you select to use Google signin`} /></li>
                  </ul>
                </div>
              <div className="privacyH2">
                <h2 className="text-lg sm:text-3xl font-bold my-4 sm:my-8 text-center">
                  <p><Language jp={"ユーザーによる取得情報の管理"} en={`How you can control`} /></p>
                  <p><Language jp={""} en={`the data we collect`} /></p>
                </h2>
                  <p className="privacyParagraph"><Language jp={"当サイトでは、ログイン認証、パスワードリセットなど、ユーザーの利便性を高めるため、および、当サイトとユーザーをセキュリティー面で保護するために、必要な場合に限り、メールアドレスやIPアドレス等の情報を提供いただいております。"} en={`This website collects information (email addresses, IP addresses, etc.) from users only so far as necessary or appropriate to fulfill the purpose of the user's interaction with our website. The purpose includes to enahance the quality of our service, such as to imporove user authentication process, and to protect this website and the users from any cyber attacks. `} /></p>
                  <p className="privacyParagraph"><Language jp={"アカウント登録したユーザーは、いつでも自分のユーザーアカウントを削除することができます。具体的には、ユーザーはログイン後、マイページからアカウントを削除することができます。ユーザーがアカウントを削除すると、当該アカウントに含まれるデータは、当サイトのデータベースから消去されます。"} en={`Those who have signed up for user accounts can delete their accounts at anytime. Specifically, registed users can proceed to delete their accounts in "mypage" section when they are logged in. When they completes the process of deletion, data included in their accounts will be deleted from our database.`} /></p>
              </div>
              <div className="privacyH2">
                <h2 className="h2">
                    <p><Language jp={"Google アナリティクス"} en={`Google Analytics`} /></p>
                </h2>
                  <p className="privacyParagraph"><Language jp={"当サイトはGoogleが提供するサービス「Googleアナリティクス」を利用して、サイトの使用状況についてのデータを収集しています。Googleアナリティクスは、ユーザーの利用頻度、閲覧ページ、サイト訪問前に閲覧したウェブサイトなどの情報を収集します。当サイトでは、サイト品質の改善のため、Googleアナリティクスを通じて取得される情報を参照しています。"} en={`We use a tool called "Google Analytics” to collect data about use of this website. Google Analytics collects data such as how often users visit this website, what pages they visit when they do so, and what other websites they used prior to coming to this website. We use the information we get from Google Analytics only to improve this website. `} /></p>
                  <p className="privacyParagraph"><Language jp={"Googleアナリティクスは、ユーザーがサイトを訪問した際のIPアドレスを収集しますが、名前などの個人を識別するような情報を収集することはありません。また、当サイトでは、Googleアナリティクスによって収集されたデータを個人データと紐付けることはありません。 Googleアナリティクスはユーザーを識別するために、ブラウザにクッキーを保存しますが、Google以外がこのクッキーを利用することはありません。"} en={`Google Analytics collects only the IP address assigned to you on the date you visit this website, rather than your name or other identifying information. We do not combine the information collected through the use of Google Analytics with personally identifiable information. Although Google Analytics installs cookies on your web browser to identify you as a unique user the next time you visit this website, the cookie cannot be used by anyone but Google.`} /></p>
                  <p className="privacyParagraph"><Language jp={<>Googleアナリティクスによるユーザー情報の収集については、<span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlGoogleTOS} target="_blank">Googleアナリティクス利用規約</a></span>及び the <span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlGooglePrivacy} target="_blank">Googleプライバシーポリシー</a></span>に規定に基づいて制限されています。当サイトの利用者は、Googleアナリティクスによるユーザー識別を希望しない場合は、ブラウザのクッキー機能を停止することで、Googleアナリティクスのユーザー識別を機能させないようにすることができます。</>} en={<>Google’s ability to use and share information collected by Google Analytics about your visits to this website is restricted by the <span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlGoogleTOS} target="_blank">Google Analytics Terms of Use</a></span> and the <span className="text-blue-500 cursor-pointer hover:underline font-bold"><a href={urlGooglePrivacy} target="_blank">Google Privacy Policy</a></span>. You can prevent Google Analytics from recognizing you on return visits to this website by disabling cookies on your browser.</>} /></p>
              </div>
              <div className="privacyH2">
                <h2 className="h2">
                    <p><Language jp={"お子様の個人情報保護"} en={`Children and our service`} /></p>
                </h2>
                  <p className="privacyParagraph"><Language jp={"お子様の個人情報を保護する観点から、13歳未満のユーザーが当サイトのアカウントを作成する場合は、その保護者または監督者の同意のもとで行ってください。"} en={<><p>You must be old enough to consent for the processing of your personal data in your country. </p>
                  <p className="privacyParagraph">If you are under the age of 13,  you cannot create an account in this website without a parent or guardian to consent for you on your behalf.</p></>} /></p>
              </div>
              <div className="privacyH2">
                <h2 className="h2"><Language jp={"お問い合わせ先"} en={`How you may contact us`} /></h2>
                  <p className="privacyParagraph">
                    <Language jp={<>プライバシーポリシーに関してご不明な点、ご要望がございましたら、<button onClick={() => setShowEmailAddress(true)}><span className="text-blue-500 hover:underline cursor-pointer font-bold">こちらのメールアドレス</span></button>からお問い合わせいただけます (クリックするとアドレスが表示されます)。</>} en={<>If you have inquiries or concerns with regards to this privacy policy, please contact us. <button onClick={() => setShowEmailAddress(true)}><span className="text-blue-500 hover:underline cursor-pointer font-bold">Click t to show email address</span>.</button></>} />
                    </p>
                  <p className="mt-5 text-center"></p>
                </div>
              <div className="privacyH2">
                <h2 className="h2"><Language jp={"プライバシーポリシーの変更"} en={`Privacy Policy Changes`} /></h2>
                  <p className="privacyParagraph"><Language jp={"当サイトでは、プライバシーポリシーを適宜見直し、その改善に努め、必要に応じて改訂いたします。"} en={`We may change our Privacy Policy from time to time, and in our sole discretion. We encourage users to frequently check this page for any changes to its Privacy Policy. `} /></p>
                  <p className="privacyParagraph"><Language jp={"プライバシーポリシーの改訂が実施された場合、最新のプライバシーポリシーは、本ページにて開示されます。"} en={`In the case that any changes are applied to the Privacy Policy, the latest version of the policy will be displayed in this page. `} /></p>
                  <p className="privacyParagraph"><Language jp={"ユーザーがプライバシーの改定後も当サイトの利用を継続する場合、当該改訂に同意したものとみなされます。"} en={`Your continued use of this website after any change in this Privacy Policy will constitute your acceptance of such change.`} /></p>
                </div>
              <EffectiveAsOf />
            </h2>
        </div>        
     </main>
    </>
  ) 
}

export const getStaticProps = async () => {
    const headObject = headData.find(x => x.page === "privacy")
      return {
            props: {headObject: headObject && headObject}, 
            revalidate: 10
  }
}