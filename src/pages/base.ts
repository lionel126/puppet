import { Page } from 'puppeteer'

class Base{
    page: Page
    constructor(page:Page){
        this.page = page
    }

    // 清空input框内容
    async clear(selector:string){
        await (await this.page.$(selector))?.click()
        // await this.page.keyboard.down('Control')
        // await this.page.keyboard.press('KeyA')
        // await this.page.keyboard.up('Control')
        
        // deprecated by mozilla
        // this.page.evaluate(() => document.execCommand('selectAll'))
        
        // this.page.evaluate((s) => {
        //     const elem = document.querySelector<HTMLInputElement>(s)
        //     if (elem) elem.value=''
        // }, selector)
        this.page.$eval(selector, e => (e as HTMLInputElement).value = '')
    }
}

export default Base
export {Base}