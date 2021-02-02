import deepmerge from 'deepmerge';

let local = {};
try{
    local = require('./config.local').default;
    // console.log(local)
}catch(err){
    console.log(err);
}

let CONFIG = {
    chrome_user_data_dir: '/Users/csg/chrome_remote_user_data',
    videoFile1: '/Users/csg/Movies/Central Intelligence.mp4',
    videoFile2: '/Users/csg/Movies/shenteng.mp4',
    pic: 'https://cs.xinpianchang.com/uploadfile/article/2020/08/13/5f3530c9ea9b6.jpeg',
    upload_web_url: 'https://www-test.xinpianchang.com/upload/index/ts-upload_index?from=tab#',
    // upload_api: 'https://www-test.xinpianchang.com/index.php?app=upload&ac=index&ts=do',
    chromeExecutablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    chromeData: '/Users/csg/chrome_remote_user_data',
    chromeWsEndPoint: '',

}
CONFIG = deepmerge(CONFIG, local);
// console.log(CONFIG)
export default CONFIG;
