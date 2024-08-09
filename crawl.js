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

async function crawlPage(currentURL) {
  console.log(`crawlPage ${currentURL}`)

  let reply
  try {
    reply = await fetch(currentURL)
  } catch(error) {
    throw new Error(`cant fetch ${error.message}`)
  }

  if (reply.status >= 400) {
    console.log(`HTTP error: ${reply.status} ${reply.statusText}`)
    return
  }

  const contentType = reply.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    console.log(`response not html ${contentType}`)
    return
  }
  console.log(await reply.text())
}

export { normalizeURL, getURLsFromHTML, crawlPage};