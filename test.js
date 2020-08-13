const puppeteer = require('puppeteer-core');
const { ding } = require('./ding');
async function getBrowser(){
    const browser = await puppeteer.connect({
        // browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/75696ec0-1180-4482-851d-1d61c717b4dd',
        browserURL: 'http://127.0.0.1:9222',
        defaultViewport: {width: 1920, height: 1000},
    });
    return browser
    
}

async function nextPage () {
    
    const browser = await getBrowser();
    // const page = await browser.newPage();
    // await page.goto('https://www-test.xinpianchang.com/v2/fans?id=10002513', {waitUntil: 'networkidle0'});
    

    const page = (await browser.pages())[0];
    const more = '//div[text()="加载更多"]';
    
    for (let i=0;i<2000;i++){
        console.log(`>>>>${i}`);
        let elem = (await page.$x(more))[0];
        await elem.click();
        await page.waitFor(200);
        // await page.waitForXPath(more, {visible: false, hidden: false});
        await page.waitForXPath(more);
        // console.log('<<<<<');
    }
    
};


async function followers(){
    const browser = await getBrowser();
    const page = (await browser.pages())[0];
    for (let i=10000065; i<10001000; i++){
        await page.goto(`https://www.xinpianchang.com/u/${i}/followers`, {waitUntil: 'networkidle0'});
        await page.waitFor(1000)
    }
    
};



async function upload(){
    const browser = await getBrowser();
    const page = (await browser.pages())[0];
    await page.reload();
    const idType = await page.$('#idType');
    await idType.click();
    const idCard = await page.$('div.ant-select-dropdown:not(.ant-select-dropdown-hidden) li ');
    await idCard.click();
    const idf = await page.$('#idCardFrontSide');
    // await page.setRequestInterception(true);
    // page.on('request', request => {
    // // Override headers
    // const headers = Object.assign({}, request.headers(), {
    //     foo: 'bar', // set "foo" header
    //     origin: undefined, // remove "origin" header
    // });
    // let postData = request.postData();
    // const j = JSON.parse(postData);
    // // j.mime_type = 'image/png';
    // j.size = 2000;
    // postData = JSON.stringify(j);
    // request.continue({postData});
    // });
    await idf.uploadFile('/Users/chensg/workspace/xpctest/output/individual_verification.failed.png');
    
}

async function register(){
    const browser = await getBrowser();
    const page = (await browser.pages())[0];
    console.log(`url: ${await page.url()}`);
    let fs = page.frames();
    console.log(`frames: ${fs}, length: ${fs.length}`);
    // fs = fs[0].childFrames();
    let tframe = fs.find(f => {
        console.log(`1rs layer frame name: ${f.name()}, url: ${f.url()}`);
        return true;
    });
    console.log(`tframe: ${tframe}, url: ${(await tframe.content()).match('iframe')}`);
    console.log((await tframe.content()).matchAll(/iframe/g));

    const children = tframe.childFrames();
    console.log(`children: ${children}`);

    const mainFrame = page.mainFrame();
    console.log(`main frame: ${mainFrame}, ${mainFrame.url()}`)
    const url = await page.evaluate(el => el.src, mainFrame);
    console.log(`url: ${url}`)
    const children2 = mainFrame.childFrames();
    console.log(`${children2.length}`);
    
    /*
    fr = tframe.childFrames().find(f => { 
        console.log(`2nd layer frame name: ${f.name()}`); 
        return f.name() == 'tcaptcha_iframe'; 
    });
    // fr = page.mainFrame()
    console.log(`fr: ${fr}`);

    const ifr = await page.$('#tcaptcha_iframe');
    console.log(`ifr: ${ifr}`);
    // const html = await page.evaluate( el => el.outerHTML, ifr);
    // console.log(`html: ${html}`);
    const html2 = await page.$eval('#tcaptcha_iframe', el => el.outerHTML);
    console.log(`html2: ${html2}`);
    const bg_ifr = await ifr.$('#slideBg');
    console.log(`bg_ifr: ${bg_ifr}`);

    const bg = await page.$('#slideBg')
    console.log(`bg: ${bg}`);
    
    console.log(`frames[0].name: ${fs[0].name()}`);
    
    let fr = fs.find(f => { 
        console.log(`name: ${f.name()}`); 
        return f.name() == 'tcaptcha_iframe'; 
    });
    // fr = page.mainFrame()
    console.log(`fr: ${fr}`);
    

    const bg = await page.$('#slideBg')
    console.log(`bg: ${bg}`);

    const bg_tframe = await tframe.$('#slideBg');
    console.log(`bg_tframe: ${bg_tframe}`);

    const bg_ifr = await ifr.$('#slideBg');
    console.log(`bg_ifr: ${bg_ifr}`);

    // const bg_eval = await ifr.$eval('#slideBg', el => el);
    // console.log(`${bg_eval}`);
    
    **/



}

async function publish(){
    const browser = await getBrowser();
    const page = (await browser.pages())[0];
    
    // const page = await browser.newPage();
    await page.goto('https://www-test.xinpianchang.com/upload/index/ts-upload_index?from=tab#',{waitUntil: 'networkidle2'});
    await page.reload();
    const file = await page.$('input[type="file"]');
    await file.uploadFile('/Users/chensg/Movies/DJI 大僵创新 - 梦想启程.mp4');
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
    // await page.waitFor(1000);
    const uploadFrame = page.frames().find(
        f => f.name() == 'upload_frame'
    );
    await uploadFrame.click('#xma_tab_2');
    // await uploadFrame.waitFor(1000);
    await uploadFrame.type('#xma_ww_url', 'https://cn.bing.com/th?id=OHR.PRNLCavern_ZH-CN6078882650_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp');
    await uploadFrame.click('#xma_ww_up');
    await uploadFrame.waitFor(1000);
    await uploadFrame.click('#xma_ww_ok');
    
    await page.waitFor(1000);
    await page.click('#id-first');
    // await page.waitFor(1000);
    await page.click('.content-1 li[value="1"]');
    await page.waitFor(1000);
    await page.click('.content-two li[value="3"]');
    
    // await page.waitFor(10000);
    await page.click('div.recommend-tags-wrapper div.J_recommendTagWrapper span');

    await page.click('div.job-select');
    await page.click('div.job-list li');
    await page.click('p.publish-title');
    // await page.waitFor(1000);
    await page.click('div.type-select.authority-select');
    await page.click('div.type-select.authority-select li');


    await page.click('div.submit-btn');

    let r ;
    await page.waitForResponse(async res => {
        // console.log(`url: ${res.url()}`);
        if(res.url() == 'https://www-test.xinpianchang.com/index.php?app=upload&ac=index&ts=do'){
            r = await res.text();
            return true;
        }
    });
    console.log(`text: ${r}`);
    if(r){
        r = await ding(isAtAll=true);
        console.log(`ding: ${await r.text()}`);
    }
    
}

(async () => {
    for (let i=0;i<10;i++){
        await publish();
    }
    
})()

