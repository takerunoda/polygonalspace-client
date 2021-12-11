import { handleRequest } from "./handleRequest"
import { toLowerCaseAndConcat } from "./toLowerCaseAndConcat"
import { send_all_category_posts } from "./urls"

export const getAllCategoriesPosts = async () => {
    try {
        const x = await handleRequest({
                urlData: send_all_category_posts,
                requestType: "POST",
                inputData: null,
        })
        const y : any[] = await x.data.postCategory.filter((item: any) => item !== "")
        const z : any[] =  y.map((item : any) => toLowerCaseAndConcat(item))
        const yz : any[] = y.map((item : any) => ({ category: item, categoryValue: toLowerCaseAndConcat(item)}))
        const object = { category: y, categoryValue: z, categoryAndValue: yz }
  
        return object
    } catch (err: any) {
            console.log(err)
        return
    }
}