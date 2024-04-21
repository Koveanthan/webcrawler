function printReport(pages) {
    let pagesCount = Object.keys(pages).sort((a, b) => {
        return pages[b] - pages[a]
    });

    pagesCount.forEach((a) => {
        console.log(`${a} - ${pages[a]}`)
    })
}

module.exports = {
    printReport
}
