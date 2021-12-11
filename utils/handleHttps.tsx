export const handleHttps = ( url: string) => {
    let newUrl
    newUrl = url.includes("http:") ? url.replace("http:", "https:") : url
    return newUrl
}