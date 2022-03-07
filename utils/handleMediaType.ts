
import { nasaStateDataInterface } from '../Interfaces'
import { handleHttps } from './handleHttps'

export const handleMediaType = (item : nasaStateDataInterface) => {
        let url
        let newHref = item.href.filter((x: string) => !x.endsWith("vtt"))

        if (item.mediaType === "image"){
          url = handleHttps(newHref[1])
        } else if (item.mediaType === "video" && newHref[1].endsWith("jpg")) {
            url = handleHttps(newHref[1])
        } else if (item.mediaType === "video" && newHref[0].endsWith("mp4")) {
            url = handleHttps(newHref[0])
        } else if (item.mediaType === "video" && newHref[0].endsWith("mov")) {
            url = handleHttps(newHref[0])
        } else if (item.mediaType === "audio") {
            url = handleHttps(newHref[0])
        } else {
            url = handleHttps(newHref[1])
        }
        return url
    }        
