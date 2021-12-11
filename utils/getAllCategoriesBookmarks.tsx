import { handleRequest } from "./handleRequest"
import { toLowerCaseAndConcat } from "./toLowerCaseAndConcat"
import { send_all_category_bookmarks } from "./urls"

export const getAllCategoriesBookmarks = async () => {
    try {
            const response = await handleRequest({
                    urlData: send_all_category_bookmarks,
                    requestType: "POST",
                    inputData: null,
            })

        const y : any[] = await response.data.bookmarkCategory
        .filter((item: any) => item !== "")
        .filter((item: any) => item.length < 20)
        const z : any[] =  y.map((item : any) => toLowerCaseAndConcat(item))
        const yz : any[] = y.map((item : any) => ({ category: item, categoryValue: toLowerCaseAndConcat(item)}))
        const object = { category: y, categoryValue: z, categoryAndValue: yz }
  
        return object
    } catch (err: any) {
            console.log(err)
        return 
    }
}