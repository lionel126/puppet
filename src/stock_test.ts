// import assert from 'assert';
import { assert, expect } from 'chai';
import puppeteer from 'puppeteer-core';
// import puppeteer from 'puppeteer';
import logger from './logger';
import CONFIG from '../config';

describe('stock-test', function() {
    let browser: puppeteer.Browser, page: puppeteer.Page;
    before(async function(){
        // puppeteer 有bug: https://github.com/puppeteer/puppeteer/pull/6528
        // browser = await puppeteer.connect({
        //     // browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/75696ec0-1180-4482-851d-1d61c717b4dd',
        //     browserURL: 'http://127.0.0.1:9222',
        //     defaultViewport: {width: 1920, height: 978},
        //     // defaultViewport: {width: 1440, height: 800},
        // });
        browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            args: [
                // '--no-first-run', 
                // '--no-default-browser-check',
                // '--remote-debugging-port=9222',
                `--user-data-dir=${CONFIG.chrome_user_data_dir}`,
                // '--profile-directory=Default',
                '--site-per-process'
            ],
            defaultViewport: {width: 1920, height: 975},
        });
        page = (await browser.pages())[0];
    });
    after(async function(){
        // if((await page.$$('div.el-dialog__wrapper:not([style*="none;"])')).length > 0){
        //     (await page.$('div.el-dialog__wrapper:not([style*="none;"]) i.el-dialog__close'))?.click();
        // }
        // console.log('over');
        // browser.disconnect();
        // await page.waitFor(30000);
        await browser.close()
    });

    
    
    describe('stock management', function() {
        it('ahah', () => {});
        it('submit video ', async () => {
            await page.goto('https://stock-test.xinpianchang.com/manage/upload/videoupload');

            // await (await page.$('button.video-upload-item-submit:not([disabled=disabled])'))?.click();
            // const dialog = await page.waitForSelector('div.el-dialog__wrapper:not([style*="none;"])',{visible: true});

            const [, dialog] = await Promise.all([
                (await page.$('button.video-upload-item-submit:not([disabled=disabled])'))?.click(),
                page.waitForSelector('div.el-dialog__wrapper:not([style*="none;"])',{visible: true})
            ]);
            logger.debug('after dialog visible..');
            // assert.strictEqual((await page.$$('div.el-dialog__wrapper:not([style*="none;"])')).length, 1, '可见的dialog数量不是1');
            
            // assert.strictEqual((await dialog.$$('i.el-dialog__close')).length, 2, 'dialog 的 关闭按钮x 不是2');
            // (await dialog.$$('i.el-dialog__close'))[0]?.click();
            // await page.waitFor(1000);
            // assert.strictEqual((await page.$$('div.el-dialog__wrapper:not([style*="none;"]) i.el-dialog__close')).length, 0, 'x 不是0');
            // assert.strictEqual((await page.$$('div.el-dialog__wrapper:not([style*="none;"])')).length, 0, '不是0');
            const tagAmount = (await dialog.$$('div.vue-input-tag-wrapper span.input-tag')).length;
            
            const tag = await dialog.$('div.vue-input-tag-wrapper input.new-tag');
            await tag?.click();
            logger.debug('clicked..');
            // await page.waitFor(5000);
            for(let x=0;x<tagAmount;x++){
                logger.debug(`x: ${x}`);              
                await page.keyboard.press('Backspace');
            }
            for(let j=0;j<5;j++){
                
                await tag?.type(`${j}`);
                await page.waitFor(200);
                await tag?.type(`,`);
                await page.waitFor(100);
            }
            await page.evaluate(()=>(<HTMLInputElement>document.querySelector('div.price-item input.el-input__inner')).value = '');
            // console.log('clear price');
            await (await dialog.$('div.price-item input.el-input__inner'))?.type('199');
            await (await dialog.$('div.el-select input'))?.click();
            // console.debug('"select" clicked');
            const select = await page.waitForSelector('div.el-select-dropdown:not([style*="none;"])',{visible: true});
            await page.waitFor(500);
            logger.debug('"select" visible');
            await (await select.$(`li.el-select-dropdown__item:nth-child(${Math.ceil(Math.random() * 20)})`))?.click();
            logger.debug('cate clicked');
            await page.waitFor(500);
            await (await dialog.$('button.el-button--primary'))?.click();
            await page.waitForSelector('div.el-dialog__wrapper:not([style*="none;"])', {hidden: true});
            await page.waitFor(1500);
            
        });
        it('del uploaded video', async () => {
            await page.goto('https://stock-test.xinpianchang.com/manage/upload/videoupload');
            const btn = await page.$('.icon-del');
            await btn?.click();
            await page.waitFor(500);
            (await page.$('div.el-message-box button.el-button--primary'))?.click()
            await page.waitFor(500);
        
        });
        it('upload video', async () => {
            await page.goto('https://stock-test.xinpianchang.com/manage/upload/videoupload');
            await page.click('span.copyright:nth-child(1)');
            const before = (await page.$$('div.video-upload-item')).length;
            await (await page.$('input[type="file"]'))?.uploadFile(CONFIG.videoFile1);
            await page.waitForSelector('div.progress-bar');
            await page.waitForSelector('div.progress-bar', {hidden: true, timeout: 50000});
            expect((await page.$$('div.video-upload-item')).length).to.equal(before + 1, 'not 1 uploaded');
            
            await page.waitForResponse( res => {
                // logger.debug(res.url());
                return res.url().indexOf('https://stock-test.xinpianchang.com/nuxt-api/stock/intranet/v1/stock/upload/finish/') === 0 
            });
            logger.debug(`1 more uploaded`);


        });
        
    });
});