export const trimArticleVeryShort = (article: string) => {
        const length = 30
        let trimmedArticle
        if(article && article.length >= 30)
        {trimmedArticle = article.substring(0, length) + "..."}
        else {trimmedArticle = article}
        return trimmedArticle
    }

