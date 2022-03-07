export const removeHr = (item : string) => {
    const modified = item.includes("<hr>") ? item.replaceAll("<hr>", "") : item
    return modified
}