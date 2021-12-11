import { toLowerCaseAndConcat } from "./toLowerCaseAndConcat"

    export const categoryLowerCase = (x : any[]) => {
        const y = x ? x.map((item : any) => toLowerCaseAndConcat(item)) : []
        const z = y.map(item => encodeURI(item))
        return z
    }
