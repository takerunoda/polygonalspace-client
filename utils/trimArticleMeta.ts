const { convert } = require('html-to-text');

export const trimArticleMeta = (article: any) => {
        const length = 150
        let trimmedArticle
        const convertedArticle = convert(article)
        if(convertedArticle.length >= length)
        {trimmedArticle = convertedArticle.substring(0, length)  + "..."
     }
        else {trimmedArticle = convertedArticle}
        return trimmedArticle
    }

