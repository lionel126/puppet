import Base from 'src/pages/base'
import { env, data } from 'config'
import logger from 'src/utils/logger'
import puppeteer from 'puppeteer'

class UploadOld extends Base {
    l = {}
    async open(){
        await this.page.goto(env.xpc_base_url + '/upload/index/ts-upload_index', {waitUntil: 'networkidle0'})
        // this.page.waitForNavigation()
    }
    async upload(){
        // const browser = await getBrowser();
        // const page = (await browser.pages())[0];
        
        const page = this.page
        const file = await page.$('input[type="file"]');
        if(file !== null) await file.uploadFile(data.videoFile1);
        // (await page.$('#id-publish-img'))
        // await page.$eval(
        //     '#id-publish-img',
        //     (e, src) => e.setAttribute('src', src),
        //     'https://cs.xinpianchang.com/uploadfile/tmp/article/2020/08/13/5f34a2da011ca_cut.jpeg?id=0.20494534991726732'
        // )
    
        // await page.$eval(
        //     '#xm_v_upload',
        //     e => e.setAttribute('style', "position: relative; left: 0px; top: 0px; z-index: 10001; display: none;")
        // )
        await page.click('div.upload-cover-title');
        // await page.waitForTimeout(1000);
        const uploadFrame = page.frames().find(
            f => f.name() == 'upload_frame'
        );
        if (uploadFrame !== undefined){
            await uploadFrame.click('#xma_tab_2');
            // await uploadFrame.waitFor(1000);
            await uploadFrame.type('#xma_ww_url', data.pic);
            await uploadFrame.click('#xma_ww_up');
            await uploadFrame.waitForTimeout(1000);
            await uploadFrame.click('#xma_ww_ok');
        }
        await page.waitForTimeout(1000);
        await page.click('#id-first');
        // await page.waitForTimeout(1000);
        await page.click('.content-1 li[value="1"]');
        await page.waitForTimeout(1000);
        await page.click('.content-two li[value="3"]');
        
        // await page.waitForTimeout(10000);
        await page.click('div.recommend-tags-wrapper div.J_recommendTagWrapper span');
    
        await page.click('div.job-select');
        await page.click('div.job-list li');
        await page.click('p.publish-title');
        // await page.waitForTimeout(1000);
        await page.click('div.type-select.authority-select');
        await page.click('div.type-select.authority-select li');
    // /* 
        // 片中成员
        await page.click('.extend-btn');
        // 选中成员重复会出错
        for(let j=1;j<=3;j++){
            await page.type('.extent-member input', `${j}`);
            await page.click('.extent-member .main-text');
            await page.click('.extent-member input');
            // await page.waitForTimeout(1000);
            await page.waitForSelector('.member-list li', {visible: true});
            await page.click('.member-list li');
            await page.waitForTimeout(1000);
            await page.click('.role-list li');
            await page.waitForTimeout(1000);
            await page.click('div.roles-btn');
        }
        await page.waitForTimeout(1000);
    // */
    
        await page.click('p.publish-title');
        await page.waitForSelector('.upload-ok',{visible: true});
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            const t = document.getElementById('j-title-input') as HTMLInputElement;
            t.value = '';
        });
        await page.type('#j-title-input', `${new Date()}`.substr(0, 40));
        
        await page.click('div.submit-btn');
    
    
        // let status = 'not been uploading';
        let response: puppeteer.HTTPResponse | undefined ;
        await page.waitForResponse((res:puppeteer.HTTPResponse) => {
            // console.log(`url: ${res.url()}`);
            if(res.url().indexOf('.xinpianchang.com/index.php?app=upload&ac=index&ts=do') > 10){
                response = res;
                // status = 'been uploaded, status not known'
                return true;
            }
            return false;
        });
        if (response !== undefined){
            const t = await response.text()
            // console.log(`res.text: ${t}, status: ${status}`);
            // console.log(`res.text: ${t}`);
            if(JSON.parse(t).status != 1){
                // let tmp = await ding(text=`###${status}  \n${t}`, isAtAll=true);
                // console.log(`ding: ${await tmp.text()}`);
            }
        }
        return response;
        
    }

}

export default UploadOld