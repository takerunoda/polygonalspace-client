import React, { createContext, useContext, useMemo } from 'react'
import { NasaSearchContextType, SearchPageProps } from '../Interfaces';
import { useModalContext } from '../context/ModalContext';
import { useSearchContext } from '../context/SearchContext';
import HeadItem from '../Components/HeadItem';
import NasaSearchComponent from '../Components/NasaSearchComponent';
import { useSetQueryNull } from '../utils/useSetQueryNull';
import { useBodyOverflowHidden } from '../utils/useBodyOverflowHidden';
import { defaultPicture, headData } from '../utils/headData';
import { category, categoryParents, categoryParentsValues, glossary } from '../utils/glossary';

const NasaSearchContext = createContext<NasaSearchContextType | undefined>(undefined)

const NASAImages = ({
                glossaryData, 
                categoryData, 
                categoryParentsData,
                categoryParentsValuesData,
                headObject,
                siteUrl,
                baseName,
                twitterID,
                MyName,
            } : SearchPageProps) => {
    const { showSearchSettings} = useSearchContext()
    const { showDetailsModal } = useModalContext()
    useSetQueryNull()
    useBodyOverflowHidden({showModal: showDetailsModal})    
    useBodyOverflowHidden({showModal: showSearchSettings})

    const value = useMemo(() => ({
                glossaryData, 
                categoryData, 
                categoryParentsData,
                categoryParentsValuesData,
                headObject,
                siteUrl,
                baseName,
                twitterID,
                MyName,                
        }), [
                siteUrl,
                headObject,
                baseName,
                twitterID,
                MyName,        
                glossaryData, 
                categoryData, 
                categoryParentsData,
                categoryParentsValuesData,])

    return (<NasaSearchContext.Provider value={value}>
        {headObject && siteUrl && baseName && twitterID && MyName &&<HeadItem
            headObject= {headObject}
            siteUrl= {siteUrl}
            slug= {`nasa-search`}
            baseName= {baseName}
            twitterID= {twitterID}
            MyName= {MyName}            
        />}
        <NasaSearchComponent />
    </NasaSearchContext.Provider>)}

export default NASAImages


export function useNasaSearchContext(){
    const context = useContext(NasaSearchContext)
        if(context === undefined){
            throw new Error("useContext(useNasaSearchContext) is undefined")
        }
        return context
    }


export const getStaticProps = async () => {
    const glossaryData = glossary
    const categoryData = category
    const categoryParentsData = categoryParents
    const categoryParentsValuesData = categoryParentsValues
    const headObject = headData.find(x => x.page === "nasa_images")
    const siteUrl = process.env.SITE_URL
    const baseName = process.env.BASE_SITE_NAME
    const twitterID = process.env.TWITTER_ID
    const MyName = process.env.MYNAME
    const defaultPictureUrl = `${process.env.SITE_URL}/${defaultPicture}`
    const updatedHeadObject = headObject && {...headObject, imageUrl: defaultPictureUrl}

      return {
            props: {glossaryData: glossaryData,
                    categoryData: categoryData,
                    categoryParentsData,
                    categoryParentsValuesData,
                    headObject: updatedHeadObject && updatedHeadObject,
                    siteUrl: siteUrl,
                    baseName: baseName,
                    twitterID: twitterID,
                    MyName: MyName,
                }, 
            revalidate: 10
  }
}