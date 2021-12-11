import cookie from "cookie"
//This function checks if req exists (we are on server), otherwise reads cookie values from browser-side with document.cookie
export function parseCookies( req: any) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}