export const trimArticle = (article: string) => {
        const length = 100
        let trimmedArticle
        if(article.length >= length)
        {trimmedArticle = article.substring(0, length) + "..."}
        else {trimmedArticle = article}
        return trimmedArticle
    }

