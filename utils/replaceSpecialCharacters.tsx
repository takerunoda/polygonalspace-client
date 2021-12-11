export const replaceSpecialCharacters = (description : string) => {
    const converted = description
                        .replaceAll(`&nbsp;`,` `)
                        .replaceAll(`&lt;`,`<`)
                        .replaceAll(`&gt;`,`>`)
                        .replaceAll(`&amp;`,`&`)
                        .replaceAll(`&quot;`,`"`)
                        .replaceAll(`&apos;`,`'`)
                        .replaceAll(`&cent;`,`¢`)
                        .replaceAll(`&pound;`,`£`)
                        .replaceAll(`&yen;`,`¥`)
                        .replaceAll(`&euro;`,`€`)
                        .replaceAll(`&copy;`,`©`)
                        .replaceAll(`&reg;`,`®`)
    return converted
}