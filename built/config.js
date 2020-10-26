"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deepmerge_1 = __importDefault(require("deepmerge"));
var local = {};
try {
    local = require('./config.local').default;
    // console.log(local)
}
catch (err) {
    console.log(err);
}
var CONFIG = {
    videoFile1: '/Users/chensg/Movies/DJI 大僵创新 - 梦想启程.mp4',
    pic: 'https://cs.xinpianchang.com/uploadfile/article/2020/08/13/5f3530c9ea9b6.jpeg',
    upload_web_url: 'https://www-test.xinpianchang.com/upload/index/ts-upload_index?from=tab#',
};
CONFIG = deepmerge_1.default(CONFIG, local);
// console.log(CONFIG)
exports.default = CONFIG;
