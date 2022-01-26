const req = require('request') 
const {domain,PORT,notifyPath} = require('../config/server.config')
const {
    date2StrFormat_$01
} = require('../utils/date')
const fileHelper = require('../utils/file') 
const list = require('../../list.json') 
const cheerio = require('cheerio')

/**
 * 通知公众号更新
 * @param {*} name 
 * @param {*} content 
 * @param {*} update 
 * @param {*} url 
 * @returns 
 */
function notify(name,content,update,url) {  
    return new Promise((r,j)=>{
        req.post({
            url:`${domain}:${PORT}${notifyPath}`,
            form:{
                name,
                content,
                update,    
                url
            },
            callback(err,res,body){ 
                console.log(err)
                if(err) j(err)  
                console.log(body)
                r(body)
                res
            }
        })
    })
}



/**
 * 通用处理函数
 * @param {*} err 
 * @param {*} res 
 * @param {*} done 
 * @param {*} parser 
 * @returns 
 */
 function commonParseHandler (parser) {    
     return function(err,res,done) {
        if(err) return console.debug(err) 
        const {name,content,update,url} = parser(res.$)   
        const cache = fileHelper.readAsJson("../../cache.json")
        const cacheData = cache.json 
        const uri = this.uri
        const todayCacheIndex = date2StrFormat_$01(new Date(),"%Y-%MM-%DD")
        const isPushed = cacheData[todayCacheIndex]  && 
                         cacheData[todayCacheIndex][uri]  
        console.log(name,uri,update) 
                         
        if(
            (
                date2StrFormat_$01(new Date(),"%Y年%MM月%DD日")=== update  || 
                date2StrFormat_$01(new Date(),"%Y-%MM-%DD")=== update || 
                date2StrFormat_$01(new Date(),"%Y.%MM.%DD")=== update 
            )
        
        && !isPushed ) { 
            console.log(`notify : ${uri} name : ${name} update:${update} content:${content} `) 
            notify(name,content,update,url) 
            if(!cacheData[todayCacheIndex]) cacheData[todayCacheIndex] = {} 
            cacheData[todayCacheIndex][uri] = true   
            cache.ok()
        }
        done()  
     }   
}



/**
 * 生成callback
 * @param {*} parser 
 */
function generateCallBack(parser) { 
   return commonParseHandler.bind(this,parser)() 
}


/**
 * 生成任务对象
 * @param {*} param0 
 */
function generate(
    {
        uri,
        ulSelector,
        updateSelector,
        urlPrefix,
        headers
    }
) {  
    return {
        uri:uri,
        callback:generateCallBack.call(this,$=>{
            const name = $('title').text().trim()   
            // console.log(name)
            const ul =  $(ulSelector) 
            const url =  urlPrefix + ul.find('li').first().find('a').attr('href')
            const content = ul.find('li').first().find('a').text().trim() 
            let update = ul.find('li').first().find(updateSelector).text().replace("[","").replace("]","").trim() 
            update = (update.match(/\d{4}-\d{1,2}-\d{1,2}/g) && update.match(/\d{4}-\d{1,2}-\d{1,2}/g)[0] ) || 
                     update 
            return {
                name,
                content,
                update,
                url
            }
        }),
        headers
    }
}



module.exports = list.map(itor=> { 
    return generate(itor) 
})


// req("http://gxt.gansu.gov.cn/gxt/c107573/infolist.shtml",(err,res,body)=>{
//     if(err) return  console.log(err) 
//     console.log(res.headers)
// })


 