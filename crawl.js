import { JSDOM } from 'jsdom'

function normalizeURL(url) {
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

function getURLsFromHTML(htmlBody, htmlRoot) {
  var urls = []
  const dom = new JSDOM(htmlBody)
  const elements = dom.window.document.querySelectorAll('a')
  console.log("elements", elements)

  for (const element of elements) {
    if (element.hasAttribute('href')) {
      var href = element.getAttribute('href')
      try {
        href = new URL(href, htmlRoot).href
        urls.push(href)
      } catch (e) {
        console.log(`${e.message}: ${href}`)
      }
    }
  }

  return urls
}

export { normalizeURL, getURLsFromHTML };