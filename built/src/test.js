"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_core_1 = __importDefault(require("puppeteer-core"));
var config_1 = __importDefault(require("../config"));
function getBrowser() {
    return __awaiter(this, void 0, void 0, function () {
        var browser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_core_1.default.connect({
                        // browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/75696ec0-1180-4482-851d-1d61c717b4dd',
                        browserURL: 'http://127.0.0.1:9222',
                        defaultViewport: { width: 1920, height: 1000 },
                    })];
                case 1:
                    browser = _a.sent();
                    return [2 /*return*/, browser];
            }
        });
    });
}
function nextPage() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, more, i, elem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBrowser()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    page = (_a.sent())[0];
                    more = '//div[text()="加载更多"]';
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < 2000)) return [3 /*break*/, 9];
                    console.log(">>>>" + i);
                    return [4 /*yield*/, page.$x(more)];
                case 4:
                    elem = (_a.sent())[0];
                    return [4 /*yield*/, elem.click()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(200)];
                case 6:
                    _a.sent();
                    // await page.waitForXPath(more, {visible: false, hidden: false});
                    return [4 /*yield*/, page.waitForXPath(more)];
                case 7:
                    // await page.waitForXPath(more, {visible: false, hidden: false});
                    _a.sent();
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/];
            }
        });
    });
}
;
function followers() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBrowser()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    page = (_a.sent())[0];
                    i = 10000065;
                    _a.label = 3;
                case 3:
                    if (!(i < 10001000)) return [3 /*break*/, 7];
                    return [4 /*yield*/, page.goto("https://www.xinpianchang.com/u/" + i + "/followers", { waitUntil: 'networkidle0' })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(1000)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/];
            }
        });
    });
}
;
function upload() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, idType, idCard, idf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBrowser()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    page = (_a.sent())[0];
                    return [4 /*yield*/, page.reload()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.$('#idType')];
                case 4:
                    idType = _a.sent();
                    if (!(idType !== null)) return [3 /*break*/, 6];
                    return [4 /*yield*/, idType.click()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, page.$('div.ant-select-dropdown:not(.ant-select-dropdown-hidden) li ')];
                case 7:
                    idCard = _a.sent();
                    if (!(idCard !== null)) return [3 /*break*/, 9];
                    return [4 /*yield*/, idCard.click()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, page.$('#idCardFrontSide')];
                case 10:
                    idf = _a.sent();
                    if (!(idf !== null)) return [3 /*break*/, 12];
                    return [4 /*yield*/, idf.uploadFile('/Users/chensg/workspace/xpctest/output/individual_verification.failed.png')];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
}
function register() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, _a, _b, _c, fs, tframe, _d, _e, _f, _g, _h, children, mainFrame, url, children2;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, getBrowser()];
                case 1:
                    browser = _j.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    page = (_j.sent())[0];
                    _b = (_a = console).log;
                    _c = "url: ";
                    return [4 /*yield*/, page.url()];
                case 3:
                    _b.apply(_a, [_c + (_j.sent())]);
                    fs = page.frames();
                    console.log("frames: " + fs + ", length: " + fs.length);
                    tframe = fs.find(function (f) {
                        console.log("1rs layer frame name: " + f.name() + ", url: " + f.url());
                        return true;
                    });
                    if (!(tframe !== undefined)) return [3 /*break*/, 6];
                    _e = (_d = console).log;
                    _f = "tframe: " + tframe + ", url: ";
                    return [4 /*yield*/, tframe.content()];
                case 4:
                    _e.apply(_d, [_f + (_j.sent()).match('iframe')]);
                    _h = (_g = console).log;
                    return [4 /*yield*/, tframe.content()];
                case 5:
                    _h.apply(_g, [(_j.sent()).matchAll(/iframe/g)]);
                    children = tframe.childFrames();
                    console.log("children: " + children);
                    _j.label = 6;
                case 6:
                    mainFrame = page.mainFrame();
                    console.log("main frame: " + mainFrame + ", " + mainFrame.url());
                    return [4 /*yield*/, mainFrame.url()];
                case 7:
                    url = _j.sent();
                    console.log("url: " + url);
                    children2 = mainFrame.childFrames();
                    console.log("" + children2.length);
                    return [2 /*return*/];
            }
        });
    });
}
function publish() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, file, uploadFrame, j, status, response, t;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBrowser()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(config_1.default.upload_web_url, { waitUntil: 'networkidle2' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.$('input[type="file"]')];
                case 4:
                    file = _a.sent();
                    if (!(file !== null)) return [3 /*break*/, 6];
                    return [4 /*yield*/, file.uploadFile(config_1.default.videoFile1)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: 
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
                return [4 /*yield*/, page.click('div.upload-cover-title')];
                case 7:
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
                    _a.sent();
                    uploadFrame = page.frames().find(function (f) { return f.name() == 'upload_frame'; });
                    if (!(uploadFrame !== undefined)) return [3 /*break*/, 13];
                    return [4 /*yield*/, uploadFrame.click('#xma_tab_2')];
                case 8:
                    _a.sent();
                    // await uploadFrame.waitFor(1000);
                    return [4 /*yield*/, uploadFrame.type('#xma_ww_url', config_1.default.pic)];
                case 9:
                    // await uploadFrame.waitFor(1000);
                    _a.sent();
                    return [4 /*yield*/, uploadFrame.click('#xma_ww_up')];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, uploadFrame.waitFor(1000)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, uploadFrame.click('#xma_ww_ok')];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [4 /*yield*/, page.waitFor(1000)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, page.click('#id-first')];
                case 15:
                    _a.sent();
                    // await page.waitFor(1000);
                    return [4 /*yield*/, page.click('.content-1 li[value="1"]')];
                case 16:
                    // await page.waitFor(1000);
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(1000)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, page.click('.content-two li[value="3"]')];
                case 18:
                    _a.sent();
                    // await page.waitFor(10000);
                    return [4 /*yield*/, page.click('div.recommend-tags-wrapper div.J_recommendTagWrapper span')];
                case 19:
                    // await page.waitFor(10000);
                    _a.sent();
                    return [4 /*yield*/, page.click('div.job-select')];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, page.click('div.job-list li')];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, page.click('p.publish-title')];
                case 22:
                    _a.sent();
                    // await page.waitFor(1000);
                    return [4 /*yield*/, page.click('div.type-select.authority-select')];
                case 23:
                    // await page.waitFor(1000);
                    _a.sent();
                    return [4 /*yield*/, page.click('div.type-select.authority-select li')];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, page.click('.extend-btn')];
                case 25:
                    _a.sent();
                    j = 1;
                    _a.label = 26;
                case 26:
                    if (!(j <= 3)) return [3 /*break*/, 37];
                    return [4 /*yield*/, page.type('.extent-member input', "" + j)];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, page.click('.extent-member .main-text')];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, page.click('.extent-member input')];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(1000)];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, page.click('.member-list li')];
                case 31:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(1000)];
                case 32:
                    _a.sent();
                    return [4 /*yield*/, page.click('.role-list li')];
                case 33:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(1000)];
                case 34:
                    _a.sent();
                    return [4 /*yield*/, page.click('div.roles-btn')];
                case 35:
                    _a.sent();
                    _a.label = 36;
                case 36:
                    j++;
                    return [3 /*break*/, 26];
                case 37: return [4 /*yield*/, page.waitFor(1000)];
                case 38:
                    _a.sent();
                    return [4 /*yield*/, page.click('p.publish-title')];
                case 39:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor('.upload-ok', { visible: true })];
                case 40:
                    _a.sent();
                    return [4 /*yield*/, page.waitFor(1000)];
                case 41:
                    _a.sent();
                    return [4 /*yield*/, page.click('div.submit-btn')];
                case 42:
                    _a.sent();
                    status = 'not been uploading';
                    return [4 /*yield*/, page.waitForResponse(function (res) {
                            // console.log(`url: ${res.url()}`);
                            if (res.url().indexOf('.xinpianchang.com/index.php?app=upload&ac=index&ts=do') > 10) {
                                response = res;
                                status = 'been uploaded, status not known';
                                return true;
                            }
                            return false;
                        })];
                case 43:
                    _a.sent();
                    if (!(response !== undefined)) return [3 /*break*/, 45];
                    return [4 /*yield*/, response.text()];
                case 44:
                    t = _a.sent();
                    console.log("res.text: " + t + ", status: " + status);
                    if (JSON.parse(t).status != 1) {
                        // let tmp = await ding(text=`###${status}  \n${t}`, isAtAll=true);
                        // console.log(`ding: ${await tmp.text()}`);
                    }
                    _a.label = 45;
                case 45: return [2 /*return*/];
            }
        });
    });
}
publish().then(function (r) { return console.log(r); }).catch(function (e) { return console.log("error: " + e); });
// (async () => {
//     for (let i=0;i<1;i++){
//         try{
//             await publish();
//         }catch(err){
//             await ding(title='error', text=err.stack, isAtAll=true)
//         }
//     }
// })()
