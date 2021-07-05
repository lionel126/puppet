import deepmerge from 'deepmerge';

let localData = {}, localEnv = {};
try{
    localData = require('./config.local').localData;
    // console.log(local)
}catch(err){
    console.log(err);
}

try{
    localEnv = require('./config.local').localEnv;
    // console.log(local)
}catch(err){
    console.log(err);
}

let data = {
    chrome_user_data_dir: '/Users/csg/chrome_remote_user_data',
    videoFile1: '/Users/csg/Movies/Central Intelligence.mp4',
    videoFile2: '/Users/csg/Movies/shenteng.mp4',
    picFile: '/Users/csg/Pictures/welcome_to_xinpianchang.jpg',
    pic: 'https://cs.xinpianchang.com/uploadfile/article/2020/08/13/5f3530c9ea9b6.jpeg',
    upload_web_url: 'https://www-test.xinpianchang.com/upload/index/ts-upload_index?from=tab#',
    // upload_api: 'https://www-test.xinpianchang.com/index.php?app=upload&ac=index&ts=do',
    chromeExecutablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    chromeData: '/Users/csg/chrome_remote_user_data',
    chromeProxy: undefined,
    chromeWsEndPoint: '',
    chromeWindowSize: '1920,980',

}
data = deepmerge(data, localData);

let env = {
    xpc_base_url: 'https://www-test.xinpianchang.com',
    passport_base_url: 'https://passport-test.xinpianchang.com'
}
env = deepmerge(env, localEnv)
// console.log(CONFIG)

// deprecated 
export default data; 

export {data, env}
