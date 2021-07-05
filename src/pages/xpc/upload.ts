import Base from '../base'
import { env, data } from 'config'
import logger from 'src/utils/logger'
import { Puppeteer, Touchscreen } from 'puppeteer'
import { random } from 'src/utils/utils'

export class Upload extends Base {

    l = {
        videoInput: 'input#imgFile11',
        coverInput: 'input[class^="publicUploadWidgetInput"]',
        coverConfirm: 'div[class^="tailorFooter"] button:nth-child(2)',
        dialog: 'div[role=dialog]',
        titleInput: 'input#video-title-public',
        cate1: 'input[name="categories"]',
        cate2: 'input[name="categoriesBoth"]',
        
        mainCates:'div.rc-cascader-menus:not(.rc-cascader-menus-hidden) ul.rc-cascader-menu:nth-child(1) li',
        secCates:'div.rc-cascader-menus:not(.rc-cascader-menus-hidden) ul.rc-cascader-menu:nth-child(2) li',
        
        tagsInput: 'input[name="tags"]',
        tags: 'span.react-tagsinput-tag',
        tagsRecomended: 'div[class^="publicUploadRecommend"] > span',
        
        desc: 'textarea[name=description]',

        roleInput: 'input[name="roleIds"]',
        roleCheckboxes: 'div[data-baseweb=popover] span[role="checkbox"]',
        
        authForm: 'div[class^=publicUploadFormContent]:nth-child(11) div[data-baseweb="select"] div', // 11
        auths: 'ul[role="listbox"] li[role="option"]',
        vmovierAllowed: 'div[class^=uploadFormCheckboxDistance] span[role="checkbox"]',

        downloadForm: 'div[class^=publicUploadFormContent]:nth-child(10) div[data-baseweb="select"] div', // 10
        downloadPermissions: 'div[data-baseweb=popover] li',

        danmakuRadios: 'input[type=radio][name=danmaku] + div',

        commentRadios: 'input[type=radio][name=allow_comment]',

        expand: 'div[class^=pickUpMore]',
        more: 'div[class^=publicUploadPickUp] div:nth-child(2)',

        award: 'textarea[name=award]',

        stillInput: 'input[type=file][class^=UploadImageInput]',
        stills: 'div[class^=closeImageIcon]',
        stillComment: 'div[class^=imageListSingle]:not([class*=error]) input[class^=imageListInput]',

        addMember: 'div[class^=addMemberPublic]',
        memberInput: 'input.react-autosuggest__input',
        membersSuggested: 'ul.react-autosuggest__suggestions-list li[id^=react-autowhatever-1--item-]',
        memberRoles: 'div[class^=recommendTagsContentTags] span[class^=tagSingle]',
        rolesConfirm: 'div[class^=recommendTagsFooter] button',
        memberConfirm: 'div[class^=confirmRecommend] button',
        members: 'div.addMemberSingle',
        confirmMembers: 'div[class^=confirmRecommend] > div[class^=sendButton] > button',

        addLink: 'div[class^=addMemberPublic]',
        linkInputs:'div[class^=otherLinkBox] input',

        submit: 'button[type=submit]'
    }
   
    async open(){
        const p = this.page
        p.on('dialog', async dialog => {
            await dialog.accept()
        })
        await this.page.goto(env.xpc_base_url + '/u/upload/video/public')
    }

    async publish(){
        const p = this.page, l=this.l

        await (await p.$(this.l.videoInput))?.uploadFile(data.videoFile1)
        await (await p.$(this.l.coverInput))?.uploadFile(data.picFile)
        await (await p.waitForSelector(l.coverConfirm))?.click()
        await p.waitForSelector(this.l.dialog,{visible: false})
        await p.waitForTimeout(5000)
        await (await p.$(this.l.titleInput))?.type('')
        await this.chooseCate()
        if (Math.random() < 0.5) await this.chooseCate(undefined,undefined,false)

        await this.chooseTags(5)
        
        await (await p.$(this.l.roleInput))?.click()  
        await this.chooseRoles(5)  
        await (await p.$(this.l.roleInput))?.click()

        await this.chooseAuth()

        await this.chooseDownloadPermission()
        await this.enableDanmaku(Math.random() < 0.5)

        // await this.toggleMore(Math.random() < 0.5)
        await this.toggleMore(true)
        await (await this.page.$(this.l.award))?.click()
        await this.page.$eval(this.l.award, e => (e as HTMLInputElement).value = '')
        await this.inputAward('金貘奖\n金球奖')

        await this.uploadStill()
        // await this.deleteStill()

        await this.addMember('梅东')

        await this.addLink('https://v.youku.com/v_show/id_XNTExMjkyMTMxMg==.html?spm=a2h0c.8166622.PhoneSokuUgc_3.dtitle')
        
        // return 填写的数据
        const tags = await this.getTags()
        const title = await this.getTitle()

        await (await p.$(this.l.submit))?.click()
        
        return {tags, title}
    }
    async getTitle(){
        return await this.page.$eval(this.l.titleInput, e => {return (e as HTMLInputElement).value})
    }
    async getTags():Promise<string[]>{
        const r = []
        const tags = await this.page.$$(this.l.tags)
        for (let tag of tags) r.push(await tag.evaluate(e=>e.innerText))
        return r
    }
    async chooseRoles(n:number=1){
        const roles = await this.page.$$(this.l.roleCheckboxes)
        // for (let i=0;i<n;i++){
        //     const idx = Math.floor(Math.random() * roles.length)
        //     await roles[idx].click()
        //     await this.page.waitForTimeout(500)
        // }
        for(let i of random(roles.length, n)){
            // logger.debug(i)
            await roles[i].click()
        }

    }
    async chooseTags(n:number=1){
        const tags = await this.page.$$(this.l.tagsRecomended)
        // for (let i=0;i<n;i++){
        //     const idx = Math.floor(Math.random() * tags.length)
        //     await tags[idx].click()
        // }
        for (let i of random(tags.length, n, false)){
            await tags[i].click()
        }
    }
    async chooseCate(main:number|undefined=undefined, sec:number|undefined=undefined, primary:boolean=true){
        const p = this.page
        // 是否分类一/分类二
        primary? await (await p.$(this.l.cate1))?.click(): await(await p.$(this.l.cate2))?.click()
        await p.waitForTimeout(500)
        // 主分类
        const mainCates = await p.$$(this.l.mainCates)
        main? await mainCates[main].hover():await mainCates[Math.floor(Math.random() * mainCates.length)].hover()
        await p.waitForTimeout(500)
        // 次级分类
        const secCates = await p.$$(this.l.secCates)
        sec? await secCates[sec].click() : await secCates[Math.floor(Math.random() * secCates.length)].click()
    }


    async chooseAuth(auth:Upload.AUTH | undefined = undefined){
        const p = this.page
        await (await p.$(this.l.authForm))?.click()
        const authes = await p.$$(this.l.auths)
        auth? await authes[auth].click(): await authes[Math.floor(Math.random() * authes.length)].click()
    }

    async disallowVmovier(disallow=true){

    }
    async chooseDownloadPermission(permission:Upload.DOWNLOAD|undefined=undefined){
        const p = this.page
        await (await p.$(this.l.downloadForm))?.click()
        const permissions = await p.$$(this.l.downloadPermissions)
        permission? await permissions[permission].click(): await permissions[Math.floor(Math.random() * permissions.length)].click()
    }

    async enableDanmaku(enable=true){
        const idx = enable?1:0
        // logger.debug(`${await (await this.page.$$(this.l.danmakuRadios)).length}`)
        await (await this.page.$$(this.l.danmakuRadios))[idx].click()
    }

    async disableComment(disable=true){
        // vip permission
    }

    async inputTag(tag:string){

    }
    async inputDesc(desc:string){

    }
    async toggleMore(expanded:boolean|undefined=undefined){
        // logger.debug(`current ${await this.isExpanded()}, result: ${expanded}`)
        if(expanded === undefined || await this.isExpanded() !== expanded){
            // logger.debug('to click')
            await (await this.page.$(this.l.expand))?.click()
        }
    }
    async isExpanded(){
        // logger.debug(await (await this.page.$(this.l.more))?.boundingBox())
        return await (await this.page.$(this.l.more))?.boundingBox() !== null
    }
    async inputAward(award:string){
        await this.page.type(this.l.award, award)
    }

    async uploadStill(){
        await (await this.page.$(this.l.stillInput))?.uploadFile(data.picFile)
    }
    async deleteStill(idx:number=0){
        const stills = await this.page.$$(this.l.stills)
        await stills[idx].click()
    }
    async addMember(name:string){
        await (await this.page.$(this.l.addMember))?.click()
        await this.page.waitForSelector(this.l.memberInput, {visible: true})
        await (await this.page.$(this.l.memberInput))?.click()
        await this.page.$eval(this.l.memberInput, e => (e as HTMLInputElement).value = '')
        await (await this.page.$(this.l.memberInput))?.type(name)

        await this.page.waitForSelector(this.l.membersSuggested, {visible:true})
        const memberSuggested = await this.page.$$(this.l.membersSuggested)
        await memberSuggested[Math.floor(memberSuggested.length * Math.random())].click()

        const loops = Math.ceil(Math.random() * 5)
        
        const roles = await this.page.$$(this.l.memberRoles)
        // logger.debug(`loops: ${loops}, total: ${roles.length}`)
        for(let idx of random(roles.length, loops, false)){ 
            // logger.debug(`index: ${idx}`)
            await roles[idx].click() 
        }
        await (await this.page.$(this.l.rolesConfirm))?.click()
        await (await this.page.$(this.l.confirmMembers))?.click()
    }

    async addLink(link:string){
        const btns = await this.page.$$(this.l.addLink)
        const addLinkBtn = btns[btns.length - 1]
        await addLinkBtn.click()
        await this.page.waitForTimeout(1000)
        const inputs = await this.page.$$(this.l.linkInputs)
        await inputs[inputs.length - 1].type(link)
    }
}

// export default Upload
export namespace Upload {
    export enum AUTH {
        NA,
        BYNCND,
        BYNCSA,
        BYNC,
        BYND,
        BYSA,
        BY
    }

    export enum DOWNLOAD {
        PRIVATE,
        TEAM,
        PUBLIC
    }
    
}