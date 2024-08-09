// actevate node version "nvm use"
// new project "npm init"
// run program "npm start"  <- setrup in "package.json"
//  npm run start BASE_URL
// run test "npm test"  <- setrup in "package.json"

import { crawlPage } from "./crawl.js"

async function main() {
    if(process.argv.length < 1) {
        return
    }
    console.log("nodepath:", process.argv[0])
    if(process.argv.length < 2) {
        return
    }
    console.log("this file:", process.argv[1])
    if(process.argv.length < 3) {
        console.log("NO URL PROVIDED")
        return
    }
    const baseURL = process.argv[2]
    console.log(`starting processing of: ${baseURL}...`)
  
    const pages =await crawlPage(baseURL)

    console.log("Pages", pages)
}
  
main()
  