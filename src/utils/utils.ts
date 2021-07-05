import logger from "src/utils/logger"

function typeOf(obj:any) {
    logger.debug(({}).toString.call(obj))
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)![1].toLowerCase()
    
}

function random(n:number, count:number=1, dupAllowed:boolean=true):Array<number>{
    const r:Array<number> = []
    for (let i=0;i<count;i++){
        let x
        do{
            x = Math.floor(Math.random() * n)
            // logger.debug(x)
        }while(!dupAllowed && r.includes(x))
        r.push(x)
    }
    // logger.debug(`${JSON.stringify(arguments)}: ${r}`)
    return r
}

export {typeOf, random}