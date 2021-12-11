import Cookies from 'js-cookie'

export const handleCurrentPage = (text: string) => {
        const x = Cookies.get(text)
        const y = x && typeof x === "string" ? JSON.parse(x) :1
        return y
    }