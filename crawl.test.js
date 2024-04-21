const { normalizeURL, getURLsFromHTML } = require("./crawl.js")

test("Testing normalization - CASE 1 - http://blog.boot.dev/path", () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test("Testing normalization - CASE 2 - http://blog.boot.dev/path/", () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test("Parse html to links - CASE 1", () => {
    const baseURL = "https://www.google.com"
    const html = "<html><body><a href=\"https://www.google.com/home\">Google</a></body></html>"
    const expected = getURLsFromHTML(html, baseURL) 
    const actual = ['https://www.google.com/home']
    expect(expected).toEqual(actual)
})

test("Parse html to links - CASE 2", () => {
    const baseURL = "https://www.google.com"
    const html = "<html><body><a href=\"https://www.google.com/home\">Google Home</a><a href=\"https://www.facebook.com/home\">Facebook</a></body></html>"
    const expected = getURLsFromHTML(html, baseURL) 
    const actual = ['https://www.google.com/home', 'https://www.facebook.com/home']
    expect(expected).toEqual(actual)
})
