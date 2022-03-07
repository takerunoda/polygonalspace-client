import { handleRequest } from './handleRequest';
import { send_category_posts_by_page } from './urls';

interface FunctionProps {
        categoryValue: string
}

export const getInitialMemoCategory = async ({categoryValue} : FunctionProps) => {                
                const inputData = { currentPage: 1, categoryValue: categoryValue}
                const response = await handleRequest({
                        urlName: send_category_posts_by_page,
                        requestType: "POST",
                        inputData,})
                const ok = response && await response.data.ok
                
                if(ok !== true){
                        throw new Error("request failed")
                }
                const items = response && await response.data.items 
                const newItemsSet = [...new Set([...items])]
                const newItems = newItemsSet.sort((a, b) => {
                if(!a.createdAt || !b.createdAt) return 0
                const A = a.createdAt ? new Date(a.createdAt).getTime() : 0
                const B = b.createdAt ? new Date(b.createdAt).getTime() : 0
                return B - A
                })
                const totalPages = response && await response.data.totalPages 
                const itemsLength = response && await response.data.itemsLength 
                const object = {
                        items: newItems, 
                        totalPages: totalPages,
                        itemsLength: itemsLength}
                return object
        };