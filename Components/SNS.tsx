import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaFacebook, FaLine } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io5';
import { RiMailAddLine } from 'react-icons/ri'
import { TiSocialFacebook } from 'react-icons/ti';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

interface FunctionProps {
    title: string,
    href: string
}

const SNS = ({title, href} : FunctionProps) => {
    return (
                <div className="p-3 sm:p-7">
                    <ul className="flex justify-between w-72 mx-auto">
                        <li className="hover:opacity-60" key={"twitter"}>
                            <TwitterShareButton title={title} url={href}>
                                {/* <TwitterIcon round={true} /> */}
                                <span className="SNSItem">
                                    <AiFillTwitterCircle />
                                </span>
                            </TwitterShareButton>
                        </li>
                        <li className="hover:opacity-60" key={"facebook"}>
                            <FacebookShareButton title={title} url={href}>
                                <span className="SNSItem">
                                    <IoLogoFacebook />
                                </span>
                            </FacebookShareButton>
                        </li>
                        <li className="hover:opacity-60" key={"line"}>
                            <LineShareButton title={title} url={href}>
                                <span className="SNSItem">
                                    <FaLine />
                                </span>
                            </LineShareButton>
                        </li>
                        <li className="text-red-400 text-6xl hover:opacity-60 cursor-pointer" key={"email"}>
                            <EmailShareButton subject={title} body={`${title}: `} url={href}>
                                <span className="SNSItem">
                                    <RiMailAddLine />
                                </span>
                            </EmailShareButton>
                        </li>
                    </ul>
                </div>
    )
}

export default SNS
