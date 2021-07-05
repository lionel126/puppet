import puppeteer, { Target } from 'puppeteer'
import { Browser, Page } from 'puppeteer'
import Upload from 'src/pages/xpc/upload_old'
import logger from 'src/utils/logger'


let browser: Browser, page: Page
async function getBrowser() {
    browser = await puppeteer.connect({
        // browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/75696ec0-1180-4482-851d-1d61c717b4dd',
        browserURL: 'http://127.0.0.1:9222',
        // browserURL: 'http://192.168.102.54:9222',
        defaultViewport: { width: 1920, height: 978 },
    });
    return browser

}

describe('sns old', function () {
    // let browser;
    before(async () => {
        browser = await getBrowser()
        // page = await browser.newPage()
        
        // const targets = await browser.targets()
        // for (let target of targets){
        //         logger.debug(`${await target.type()}, ${(await target.page())?.url()}, ${await (await target.page())?.evaluate(() => document.hidden)}`)
                
        //     }
        // const tmp = await targets[targets.length - 1].page()    
        const pages = await browser.pages()
        // page = pages.forEach(async p => {
        //     return await p.evaluate(
        //         () => { document.hidden }
        //     )
        // })
        for (let p of pages){
            if(! await p.evaluate(()=>document.hidden)){
                page = p
                break
            }   
        }
        // page = target instanceof Page? await target.page(): await browser.newPage()
        logger.debug(`current url: ${page.url()}`)
    })
    after(async () => {
        await page.waitForTimeout(3000)
        browser.disconnect()
    });

    it('publish article', async function () {
        const u = new Upload(page)
        await u.open()
        await u.upload()
    })
})