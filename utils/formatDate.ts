export const formatDate = (itemDate: any) => {
        if(typeof itemDate === 'string') {
            const slice = itemDate.slice(0, 10)
            const formatted = slice.replace(/:/g, '-');
            return formatted
        } else if (itemDate && itemDate.includes("-")){
            const date = new Date(itemDate)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const formatted = `${year}-${month}-${day} `
            return formatted
        } else {
            const date = new Date(Number(itemDate))
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const formatted = `${year}-${month}-${day} `
            return formatted

        }
    }