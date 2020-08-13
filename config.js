const deepmerge = require('deepmerge')

let local = {}
try{
    local = require('./config.local.js') || {}
}catch(err){

}

let CONFIG = {
    videoFile1: '/Users/chensg/Movies/DJI 大僵创新 - 梦想启程.mp4'
}

CONFIG = deepmerge(CONFIG, local)

module.exports = CONFIG