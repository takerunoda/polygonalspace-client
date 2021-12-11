import { useRouter } from 'next/router';
import LoaderPage from '../Components/LoaderPage';
import { usePageContext } from '../context/PageContext';
import { useUserContext } from '../context/UserContext';
import { useModalContext } from '../context/ModalContext';
import { useAccessConfirmation } from '../utils/useAccessConfirmation';

const Confirmation = () => {
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id')
const confirmationToken = urlParams.get('token')

    const userContext = useUserContext()
        if ( !userContext ) {
            return null
        }
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null
        }
    const { setUserEmail, 
            setIsLoggedin, 
            setAccessToken, 
            setUserId, 
            setUserStatus, 
            setLoginType, 
        } = userContext
    const { showMessageModal, 
            setShowMessageModal, 
            setMessage,
        } = modalContext
    const {timeoutId, setTimeoutId} = pageContext
    const router = useRouter()

    userId && confirmationToken && useAccessConfirmation({userId, confirmationToken, setAccessToken, setUserId, setUserEmail, setUserStatus, setLoginType, setIsLoggedin, router, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId
    })
return <LoaderPage />

}
export default Confirmation