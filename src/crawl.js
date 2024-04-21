const https = 'https://'

function normalizeURL(url) {
    const myURL = new URL(url)
    const normalizedURL = myURL.host + myURL.pathname
    if (normalizedURL.endsWith("/")) {
        return normalizedURL.slice(0, -1)
    }
    return normalizedURL
}

function getDomain(url) {
    const myURL = new URL(https+url)
    return myURL.host
}

function getURLsFromHTML(html, baseURL) {
    let ahrefs = []
    const { JSDOM } = require('jsdom')
    const jsdom = new JSDOM(html)
    const domLinks = jsdom.window.document.querySelectorAll('a')

    for (let ahref of domLinks) {
        const href = ahref.getAttribute('href'); 

        if (href && href.slice(0, 1) === "/") { 
            ahrefs.push(normalizeURL(`${https}${baseURL}${href}`))
        } else {
            ahrefs.push(normalizeURL(href))
        }
    }

    return ahrefs
}

async function fetchHTML(url) {
    try {
        const response = await fetch(https+url, {
            method: 'GET',
            headers: { 
            'Content-Type': 'text/html'
            }
        })

        if (response.status <= 399) {
            if (response.headers.get('content-type', "").toLowerCase().includes('text/html'))
            {
                return await response.text()
            }
        }

        console.error(`some issue with ${url} : STATUS: ${response.status} CONTENT-TYPE: ${response.headers.get('content-type',"")}`)

    } catch(err) {
        console.log(`Error : ${err.message}`)
    }
    return null
}

async function crawlPage(baseURL, currentURL, pages) {
    if (getDomain(baseURL) !== getDomain(currentURL)) {
        return
    }

    if (pages[currentURL] > 1) {
        return
    }

    console.log(`crawling ${currentURL}....`)

    const html = await fetchHTML(currentURL)
    const urls = getURLsFromHTML(html, baseURL)
    if (urls) {
        for (let url of urls) {
            count = pages[url]
            if (!count) {
                pages[url] = 1
            } else {
                pages[url] += 1
            }
            await crawlPage(baseURL, url, pages)
        }
    } else {
        console.log(`No links in current URL: ${currentURL}`)
    }

    return pages
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    fetchHTML,
    crawlPage,
}
