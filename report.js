function sortPages(pages) {
    const pagesArr = Object.entries(pages) // convert to array of key-value pairs?
    pagesArr.sort((a, b) => {
        if (a[1] === b[1]) { // counts are the same
            return a[0].localeCompare(b[0]) // compare strings respecting locale
        }
        return b[1] - a[1]
    }) 
    return pagesArr
}

function printReport(pages) {
    console.log('Report')
    console.log('---------------------------------------------')
    const sorted = sortPages(pages)
    for (const page of sorted) {
        const url = page[0]
        const count = page[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
}

export { printReport, sortPages }