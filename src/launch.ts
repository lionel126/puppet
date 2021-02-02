import puppeteer from 'puppeteer'
import CONFIG from '../config'


async function launch(){
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: CONFIG.chromeExecutablePath,
        args: [
            '--no-first-run',
            '--no-default-browser-check',
            `--user-data-dir=${CONFIG.chromeData}`,
            '--disable-features=site-per-process',
            `--window-size=${CONFIG.chromeWindowSize}`,
            '--remote-debugging-port=9222'
        ]
    })
    console.log(await browser.wsEndpoint())
}

launch()