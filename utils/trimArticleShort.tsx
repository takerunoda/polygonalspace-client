export const trimArticleShort = (article: string) => {
        const length = 70
        let trimmedArticle
        if(article.length >= 70)
        {trimmedArticle = article.substring(0, length) + "..."}
        else {trimmedArticle = article}
        return trimmedArticle
    }

