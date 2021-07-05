import puppeteer, { Target } from 'puppeteer'
import { Browser, Page } from 'puppeteer'
import { Article } from 'src/pages/xpc/article'
import { Upload } from 'src/pages/xpc/upload'
import logger from 'src/utils/logger'
import { assert } from 'chai'
import CONFIG from '../config'
import { Login } from 'src/pages/passport/login'


let browser: Browser, page: Page
async function getBrowser() {
    // browser = await puppeteer.connect({
    //     // browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/75696ec0-1180-4482-851d-1d61c717b4dd',
    //     browserURL: 'http://127.0.0.1:9222',
    //     // browserURL: 'http://192.168.102.54:9222',
    //     defaultViewport: { width: 1920, height: 978 },
    // });
    
    const args = [
        '--no-first-run',
        '--no-default-browser-check',
        // `--user-data-dir=${CONFIG.chromeData}`,
        '--disable-features=site-per-process',
        `--window-size=${CONFIG.chromeWindowSize}`,
        '--remote-debugging-port=9222',
        
    ]
    if(CONFIG.chromeProxy) args.push(`--proxy-server=${CONFIG.chromeProxy}`)
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: CONFIG.chromeExecutablePath,
        args,
    })
    return browser
}



describe('sns', function () {
    // let browser;
    before(async () => {
        browser = await getBrowser()
        const pages = await browser.pages()
        for (let p of pages){
            if(! await p.evaluate(()=>document.hidden)){
                page = p
                break
            }   
        }
        const l = new Login(page) 
        await l.open()
        
        await Promise.all([
            l.login(),
            page.waitForNavigation()
        ])
        // logger.debug(`current url: ${page.url()}`)
    })
    after(async () => {
        await page.waitForTimeout(3000)
        browser.close()
    });

    it('publish article', async function () {
        const u = new Upload(page)
        await u.open()
        const [{tags, title}] = await Promise.all([
            u.publish(),
            page.waitForNavigation()
        ]) 

        const a = new Article(page)
        // await a.getTitle()
        const articleTags = await a.getTags()
        const articleTitle = await a.getTitle()
        // assert.equal(tagsArticle.length, tags.length)
        // assert.equal(new Set(tagsArticle), new Set(tags))
        logger.debug(`${tags}, ${articleTags}, ${title}`)
        assert.includeMembers(articleTags, tags)
        assert.includeMembers(tags, articleTags)
        assert.equal(articleTitle, title)
    })
})