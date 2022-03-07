import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";
import { AxiosResponse } from "axios";

export interface ChildrenProps {
        children: ReactNode
}

export interface PostInterface {
        _id?:                   string,
        slug?:                  string,
        imageId:                string,
        authorId?:              string,
        imageTitle?:            string,
        imageUrl:               string,
        sharedUrl?:             string,
        imageDescription?:      string,
        like:                   number,
        public?:                boolean,
        confirm?:               boolean,
        mediaType?:             string,
        category?:              string[],
        categoryValue?:         string[],
        platform:               string,
        article?:               string | JSX.Element | HTMLTextAreaElement,
        articleTitle?:          string | JSX.Element | HTMLInputElement,
        user?:                  string,
        likeStatus?:            boolean,
        originallyCreatedAt?:   Date | string,
        createdAt?:             Date,
        updatedAt?:             Date
}

export interface BlogLikeInterface {
        _id?:                   string,
        imageId:                string,
        like:                   number,
        likeStatus?:            boolean,
        createdAt?:             Date,
        updatedAt?:             Date
}


export interface BookmarkItemInterface {
        _id?:                   string,
        imageId:                string,
        imageTitle?:             string,
        imageUrl:               string,
        imageDescription?:       string,
        comment?:               string,
        like:                  number,
        public?:                boolean,
        confirm?:               boolean,
        mediaType?:             string,
        category?:              string[],
        categoryValue?:         string[],
        platform:               string,
        likeStatus?:            boolean,
        originallyCreatedAt?:   Date | string,
        createdAt?:             Date,
        updatedAt?:             Date,
        dateAdded?:             Date,
}

export interface ImageInterface {
        _id?:                   string,
        imageId:                string,
        imageTitle:             string,
        imageUrl:               string,
        imageDescription:       string,
        comment?:               string,
        like:                  number,  
        confirm?:               boolean,
        mediaType?:             string,
        category?:              string[],
        categoryValue?:         string[],
        originallyCreatedAt?:   Date | string,
        platform:               string,
        createdAt?:             Date,
        updatedAt?:             Date
}

export interface BlogInterface extends BlogDataInterface {
        like: number
}

export interface BlogDataInterface  {
        id: string,
        uuid: string,
        title: string,
        slug: string,
        html: string,
        comment_id: string,
        feature_image: string, 
        featured: boolean,
        visibility: string,
        email_recipient_filter: string,
        created_at: string | Date,
        updated_at: string | Date,
        published_at: string,
        custom_excerpt?: string,
        codeinjection_head?: string,
        codeinjection_foot?: string,
        custom_template?: string,
        canonical_url?: string,
        url: string,
        excerpt: string,
        reading_time?: number,
        access: boolean,
        send_email_when_published: boolean,
        og_image?: string,
        og_title?: string,
        og_description?: string,
        twitter_image?: string,
        twitter_title?: string,
        twitter_description?: string,
        meta_title?: string,
        meta_description?: string,
        email_subject?: string,
        frontmatter?: string,
        like?: number
}


export interface UserInterface {
        _id?:                   string,
        userName?:              string,
        userEmail:              string,
        googleId?:              string,
        password?:               string,
        verified:               boolean,
        address?:               string,
        userStatus:             string,
        passwordLogin:          boolean,
        googleLogin:            boolean,
        loginType:              string,
        createdAt?:             Date,
        updatedAt?:             Date,
}

export interface GoogleUserInterface {
        _id?:                   string,
        userName?:              string,
        userEmail:              string,
        googleId:               string,
        address?:               string,
        userStatus:             string,
        loginType:              string,
        createdAt?:             Date,
        updatedAt?:             Date
}

 export interface GuestInterface{
        _id?:                   string,
        userName?:              string,
        userEmail:              string,
        address?:               string,
        userStatus:             string,
        loginType:              string,
        passwordLogin:          boolean,
        googleLogin:            boolean,
        createdAt?:             Date,
        updatedAt?:             Date,
}

export interface UserBookmarkInterface {
        bookmarkId:             string
        createdAt?:             Date,
        // updatedAt?:             Date
}

export interface MyBookmarkInterface {
        _id?:                   string,
        userId:                 string,
        bookmark:               UserBookmarkInterface[]
}


export interface DraftInterface {
        id:                      string,
        title:                   string,
        url:                     string,
        sharedUrl?:              string,        
        description:             string,
        platform:                string,
        category?:               string[],
        categoryValue?:          string[],
        originallyCreatedAt?:   Date | string,
}

export interface ArticleDraftInterface {
        _id?:                    string | undefined,
        imageId:                 string,
        title:                   string,
        url:                     string,
        sharedUrl:               string,        
        description:             string,
        platform:                string,
        category?:               string[],
        categoryValue?:          string[],
        originallyCreatedAt?:    Date | string,
}

export interface nasaOriginalDataOne {
    nasa_id:                    string,
    date_created:               Date | string,
    title:                      string,
    description:                string,
    keywords:                   string[],
    media_type:                 string,
}

export interface nasaOriginalDataTwo { 
    data:                       nasaOriginalDataOne[],
    href:                       string
}


export interface nasaDataInterface { 
    key:                         string,
    dateCreated:                 Date | string,
    title:                       string,
    description:                 string,
    keywords:                    string[],
    mediaType:                   string
}

export interface nasaStateDataInterface extends nasaDataInterface{ 
    href:                        any,
}

export interface ExtendedResponse extends AxiosResponse<any>{
  success:                      boolean
}


export interface HeadProps {
        headObject: {        
                page: string
                slug: string                        
                title: string
                imageUrl: string
                description: string
                datePublished: Date | string
                dateModified: Date | string
        }
}

export interface ConfirmationInterface {
        _id?:                   string,
        userId:                 string,
        confirmationToken:      string,
        updatedAt?:             Date,
        dateAdded?:             Date,
}

export interface PasswordResetInterface {
        _id?:                   string,
        userId:                 string,
        userEmail:              string,
        passwordResetToken:     string,
        updatedAt?:             Date,
        dateAdded?:             Date,
}

export interface PasswordResetInterface {
        _id?:                   string,
        userId:                 string,
        userEmail:              string,
        PasswordResetToken:     string,
        updatedAt?:             Date,
        dateAdded?:             Date,
}
export interface UserReducerType {
    userEmail: string;
    userId: string;
    accessToken: string;
    isLoggedin: boolean;
    userStatus: string;
    loginType: string;  
}
export interface UserReducerTypeII {
          passwordLogin: boolean, 
          googleLogin: boolean, 
          createdAt: Date | undefined
        }


export interface PageProps extends HeadProps {
    siteUrl: string
    baseName: string
    twitterID: string
    MyName: string
}

export interface SearchPageProps extends PageProps{
    glossaryData: {
                    id: number | string;
                    jp: string;
                    en: string;
                    category: string;
                    url?: string;
                }[],
    categoryData: {
                    catName: string;
                    value: string;
                    en: string;
                    parent_value: string;
                    parent_jp: string;
                    parent_en: string;
                }[],
    categoryParentsData: {
                    parent_value: string;
                    parent_jp: string;
                    parent_en: any ;
                }[]
    categoryParentsValuesData: string[]
}

export interface BookmarkPageProps extends PageProps{
    initialData: BookmarkItemInterface[] 
    totalPages: number
    itemsLength: number
}
export interface PostPageProps extends PageProps{
    initialData: any[]
    totalPages: number
    itemsLength: number
}
export interface CategoryPostPageProps extends PostPageProps{
    category: string
    categoryValue: string
}

export interface UserPostPageProps extends PostPageProps{
    userId: string
    userIdShort: string
    categoryValue: string
}

export interface PostDetailsPageProps extends PageProps {
    postData: PostInterface | null
    slug: string
}

export interface BlogDetailsPageProps extends PageProps {
    postData: any | null
    slug: string
}

export interface BookmarkDetailsPageProps extends PageProps {
    postData: BookmarkItemInterface | null
    post_id: string
}

export interface IndexProps extends PageProps {
    twitterAddress: string
}

export interface SearchKeywordType {
    id: number | string
    jp: string
    en: string
    category: any
    url?: string
    url_en?: string
}

export interface MyBookmarkContextType {
    elementRef: MutableRefObject<any> 
    currentPageGeneral: number 
    hasMoreGeneral: boolean 
    isVisibleGeneral: boolean 
    isVisibleGeneralInitial: boolean
    loadingGeneral: boolean
}

export interface SharedContextType {
    loadingGeneral: boolean
    initialData: BookmarkItemInterface[] 
    elementRef: MutableRefObject<any> 
    elementInitialRef: MutableRefObject<any> 
    currentPage: number 
    hasMoreGeneral: boolean 
    isVisibleGeneral: boolean 
    isVisibleGeneralInitial: boolean
}

export interface CategorySharedContextType extends SharedContextType{
    category: string 
    categoryValue: string 
}

export interface MemoContextType {
    loadingGeneral: boolean
    initialData: PostInterface[]
    elementRef: MutableRefObject<any> 
    elementInitialRef: MutableRefObject<any> 
    currentPage: number 
    hasMoreGeneral: boolean 
    isVisibleGeneral: boolean 
    isVisibleGeneralInitial: boolean
}
export interface CategoryMemoContextType extends MemoContextType{
    category: string
    categoryValue: string
}

export interface UserMemoContextType extends MemoContextType{
    userId: string
}

export interface BlogsContextType {
    loadingGeneral: boolean
    initialData: any[]
    elementRef: MutableRefObject<any> 
    elementInitialRef: MutableRefObject<any> 
    currentPage: number 
    hasMoreGeneral: boolean 
    isVisibleGeneral: boolean 
    isVisibleGeneralInitial: boolean
}

export interface BlogDetailsContextType {
    postData: any
    post: BlogInterface | null
    setPost: Dispatch<SetStateAction<BlogInterface | null>>
}
export interface SharedDetailsContextType {
    postData: any
    bookmarkPost: BookmarkItemInterface | null
    setBookmarkPost: Dispatch<SetStateAction<BookmarkItemInterface | null>>
}
export interface MemoDetailsContextType {
    postData: any
    post: PostInterface | null
    setPost: Dispatch<SetStateAction<PostInterface | null>>
}

export interface ChangePageContextType {
    // inputData: {
    //     userEmail: string;
    //     currentPassword: string;
    //     newPassword: string;
    //     newPasswordConfirmation: string;
    // }  
    // setInputData: Dispatch<SetStateAction<{
    //     userEmail: string;
    //     currentPassword: string;
    //     newPassword: string;
    //     newPasswordConfirmation: string;
    // }>>      
}

export interface GeneralContextType extends HeadProps{
    siteUrl: string
    baseName: string 
    twitterID: string
    MyName: string 
}
export interface IndexContextType extends GeneralContextType{
    twitterAddress: string
}
export interface NasaSearchContextType extends SearchPageProps{}

