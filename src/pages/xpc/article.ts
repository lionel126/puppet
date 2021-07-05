import { Base } from "src/pages/base";
import { logger } from 'src/utils/logger'

class Article extends Base{
    l = {
        title: 'div.title-wrap > h3',
        cates: 'span.cate',
        tags: 'div.tag-wrapper > a'
    }

    async getTitle(){
        const text = await this.page.$eval(this.l.title, e=>(e as HTMLElement).innerText)
        return text
    }
    async getCates(){        
        const cates = await this.page.$$eval(this.l.cates, es=>{
            return (es as HTMLElement[]).map(e => e.innerText);
        })
        // logger.debug(cates)
        return cates
    }
    async getTags(){
        const tags = await this.page.$$eval(this.l.tags, es => {
            return (es as HTMLElement[]).map(e => e.innerText)
        })
        // logger.debug(tags)
        return tags
    }
}

export {Article}