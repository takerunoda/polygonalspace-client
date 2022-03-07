export const trimTitleDetails = (title: string) => {
        const length = 120
        let trimmedArticle
        if(title.length >= length)
        {trimmedArticle = title.substring(0, length) + "..."}
        else {trimmedArticle = title}
        return trimmedArticle
    }

