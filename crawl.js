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

// preveous part of crawlPage
async function fetchHtml(url) {
  let reply
  try {
    reply = await fetch(url)
  } catch(error) {
    throw new Error(`cant fetch ${error.message}`)
  }

  if (reply.status >= 400) {
    throw new Error(`HTTP error: ${reply.status} ${reply.statusText}`)
  }

  const contentType = reply.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    throw new Error(`response not html ${contentType}`)
  }

  return await reply.text()
}

async function crawlPage(baseUrl, currentURL = baseUrl, pages = {}) {
  // check if on.base
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseUrl)
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages
  }

  // same url format everywhere
  const normalizedUrl = normalizeURL(currentURL)

  // check how often we visited the page
  // and only visit once
  if (pages[normalizedUrl] > 0) {
    pages[normalizedUrl]++
    return pages
  }

  // first visit
  pages[normalizedUrl] = 1

  // fetch data
  console.log(`crawlPage ${currentURL}`)

  let html = ''
  try {
    html = await fetchHtml(currentURL)
  } catch (error) {
    console.log(`${error.message}`)
    return pages
  }

  // get content
  const containedUrls = getURLsFromHTML(html, baseUrl)
  for (const url of containedUrls) {
    pages = await crawlPage(baseUrl, url, pages)
  }

  return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage};