import React, { useRef } from 'react'
import Category from './Category';
import DataSource from './DataSource';
import CloseModalNasa from './CloseModalNasa';
import BookmarkAndBack from './BookmarkAndBack';
import OriginallyCreated from './OriginallyCreated';
import ConfirmAddBookmarkModal from './ConfirmAddBookmarkModal';
import { useUserContext } from '../context/UserContext';
import { usePageContext } from '../context/PageContext';
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import { useBookmarkContext } from '../context/BookmarkContext';
import { handleHttps } from '../utils/handleHttps';
import { clickOutsideModal } from '../utils/clickOutsideModal';
import { useUserBookmarkIds } from '../utils/useUserBookmarkIds';
import { replaceSpecialCharacters } from '../utils/replaceSpecialCharacters';
import { handleConfirmBookmarkTwo } from '../utils/handleConfirmBookmarkTwo';

const NASA_HubbleModal = () => {

    const userContext = useUserContext()
        if ( !userContext ) {
            return null;
        }    
    const pageContext = usePageContext()
        if ( !pageContext ) {
            return null;
        }
    const bookmarkContext = useBookmarkContext()
        if ( !bookmarkContext ) {
            return null;
        }
    const modalContext = useModalContext()
        if ( !modalContext ) {
            return null;
        }
    const searchContext = useSearchContext()
    if ( !searchContext ) {
            return null;
        }
    const {isLoggedin, userBookmarkIds, setUserBookmarkIds, userId } = userContext
    const {image, timeoutId, setTimeoutId, loadingClickBookmark} = pageContext
    const {myBookmarkAddItem, setMyBookmarkAddItem,} = bookmarkContext
    const {showMessageModal, setShowMessageModal, message, setMessage, showDetailsModal, setShowDetailsModal, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, } = modalContext
    const modalRef = useRef<HTMLDivElement>(null)
    //when the button is clicked, clicked image will be added to the bookmark array
    useUserBookmarkIds({userId, setUserBookmarkIds, isLoggedin})   

    const handleConfirm = async ({image} : {image: any}) => {
        if(loadingClickBookmark) {
            console.log("clicked while loading");
            return
        }
        handleConfirmBookmarkTwo({ item: image, isLoggedin, showMessageModal, setShowMessageModal, setMessage, timeoutId, setTimeoutId, addBookmarkModalToggleConfirm, setAddBookmarkModalToggleConfirm, setMyBookmarkAddItem, userBookmarkIds})
    }

    return image ? (
    <>
    <ConfirmAddBookmarkModal />
    <div 
        className={`fixed z-40 pt-0 left-0 top-0 w-full h-full overflow-y-scroll sm:mx-auto leading-loose tracking-widest text-base sm:text-xl bg-opacity-0 bg-gray `} 
                onClick={(e) => clickOutsideModal(e, {modalRef, setShowModal: setShowDetailsModal})}>
    <CloseModalNasa toggleModal={setShowDetailsModal} />

        <div className="bg-gray-500 bg-opacity-70 m-auto overflow-y-scroll z-40" 
                ref={modalRef} id="modalRef">
            <div className="w-full bg-white">
                <h1 className="text-2xl sm:text-4xl font-bold pb-8 sm:pb-16 pt-16 sm:pt-24 text-center leading-normal relative">
                        {image.imageTitle}
                </h1>
                    {/* NASA */}
                    {image.mediaType === "image" &&
                    <img src={handleHttps(image.imageUrl)} alt={image.imageTitle} className="w-full" /> }

                    {image.mediaType === "video" && image.imageUrl.endsWith("jpg") &&
                    <img src={handleHttps(image.imageUrl)} alt={image.imageTitle} className="w-full" /> }

                    {image.mediaType === "video" && image.imageUrl.endsWith("mp4") &&
                    <video className="w-full"  controls muted>
                        <source src={handleHttps(image.imageUrl)} type="video/mp4" />
                    </video> }

                    {image.mediaType === "video" && image.imageUrl.endsWith("mov") &&
                    <video className="w-full"  controls muted>
                        <source src={handleHttps(image.imageUrl)} type="video/mp4" />
                    </video> }

                    {image.mediaType === "audio" && 
                    <audio className="w-full"  controls muted>
                        <source src={handleHttps(image.imageUrl)} type="audio/mpeg" />
                    </audio> }
                    {/* Hubble */}
                    {image.platform === "Hubble" &&
                    <img src={handleHttps(image.imageUrl)} alt={image.imageTitle} className="w-full" /> }
            </div>
            <div className="bg-white w-full pb-10">
                <div className="w-11/12 sm:w-8/12 mx-auto pt-1 bg-white">                    
                    <div className="sm:mt-5">
                        <BookmarkAndBack 
                            handleConfirm={() => handleConfirm({image})} 
                        />
                    </div>
                        <Category 
                            category={image.category} 
                            title={image.imageTitle} 
                            description={image.imageDescription} 
                        />
                    <div className="mt-5">
                        <OriginallyCreated originallyCreated={image.originallyCreatedAt} />
                    </div>
                    <div className="my-5 leading-10">
                        {image.imageDescription === '' || image.imageDescription === undefined ? "no description" : replaceSpecialCharacters(image.imageDescription)}
                        <DataSource  platform={image.platform} imageOnly={false} />
                    </div>
                </div>
            </div>
        </div>
        <CloseModalNasa 
            toggleModal={setShowDetailsModal} 
            />
    </div>
    </>
    ) : null
}

export default NASA_HubbleModal
