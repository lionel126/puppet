const deepmerge = require('deepmerge')

let local = {}
try{
    local = require('./config.local.js') || {}
}catch(err){

}

let CONFIG = {
    videoFile1: '/Users/chensg/Movies/DJI 大僵创新 - 梦想启程.mp4',
    pic: 'https://cs.xinpianchang.com/uploadfile/article/2020/08/13/5f3530c9ea9b6.jpeg',
    upload_web_url: 'https://www-test.xinpianchang.com/upload/index/ts-upload_index?from=tab#',
    // upload_api: 'https://www-test.xinpianchang.com/index.php?app=upload&ac=index&ts=do',

}

CONFIG = deepmerge(CONFIG, local)

module.exports = CONFIG