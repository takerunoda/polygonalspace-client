import React from 'react'
import GoogleLogin from 'react-google-login'
import Language from './Language';
import { useModalContext } from '../context/ModalContext';
import { googleError } from '../utils/googleError';
import { FcGoogle } from 'react-icons/fc';

interface ComponentProps {
    onSubmit: (res: any) => void
    jp: string
    en: string
    small: boolean
}

const GoogleButton = ({onSubmit, jp, en, small} : ComponentProps) => {
    const { handleMessageModal} = useModalContext()

    return (
            <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID ?? ""}
                render={(renderProps) => (
                    <h3 className="w-11/12 mx-auto">
                        <div className="mt-10">
                            <button 
                            className="flex googleButtonColor border-2 rounded focus:outline-none cursor-pointer mx-auto mt-2 w-full text-center hover:opacity-80"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled} >
                            <div className={`text-3xl bg-white py-2 px-2 text-center`}>
                                <FcGoogle />
                            </div>
                            <p className={`mt-1 mx-auto font-bold text-white py-2 text-center ${small ? "text-sm" : "text-base"}`}>
                                <Language jp={jp} en={en} />
                            </p>
                            </button>
                        </div>
                    </h3>)}
                    onSuccess={onSubmit}
                    onFailure={(err) => googleError(err, {handleMessageModal})}
                    cookiePolicy="single_host_origin"
                    />)}

export default GoogleButton
