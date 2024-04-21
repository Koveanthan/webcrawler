const { normalizeURL, crawlPage } = require("./crawl.js")
const { printReport } = require("./report.js")

async function main() {
    const { argv } = require("node:process")
    if (argv.length != 3) {
        console.error(`In correct no of input ${argv.length - 2}. Just enter the base url as a single string.`)
        return
    }

    const baseURL = normalizeURL(argv[2])
    let pages = {}
    
    console.log(`Starting crawling with base url ${baseURL}`)
    await crawlPage(baseURL, baseURL, pages)

    console.log(`\n===================`)
    console.log(`Result of crawling `)
    console.log(`===================`)
    console.log(`Link - Count(No of internal link)`)
    console.log(`===================\n`)
    
    printReport(pages)

}

main()
