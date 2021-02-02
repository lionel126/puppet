import puppeteer from 'puppeteer'



async function launch(){
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: [
            '--no-first-run',
            '--no-default-browser-check',
            '--user-data-dir=/Users/csg/chrome_remote_user_data',
            '--disable-features=site-per-process',
            '--window-size=1920,980',
            '--remote-debugging-port=9222'
        ]
    })
    console.log(await browser.wsEndpoint())
}

launch()