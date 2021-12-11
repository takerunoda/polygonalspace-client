export const trimTitle = (title: string) => {
        const length = 40
        let trimmedArticle
        if(title.length >= length)
        {trimmedArticle = title.substring(0, length) + "..."}
        else {trimmedArticle = title}
        return trimmedArticle
    }

