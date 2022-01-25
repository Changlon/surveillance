const req = require('request') 
const {domain,PORT,notifyPath} = require('../config/server.config')
const {
    date2StrFormat_$01
} = require('../utils/date')
const file = require('../utils/file')

const fileHelper = require('../utils/file')
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
   
        if(date2StrFormat_$01(new Date(),"%Y年%MM月%DD日")=== update && !isPushed ) { 
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



module.exports = [
    {
        uri: "https://www.ganseea.cn/html/tzgg/",
        // callback:commonParseHandler.bind(this,$=>{
        //     const name = $('title').text().trim()  
        //     const ul =  $('.partR > .ch-list > ul') 
        //     const url =  "https://www.ganseea.cn" + ul.find('li').first().find('a').attr('href')
        //     const content = ul.find('li').first().find('a').text().trim() 
        //     const update = ul.find('li').first().find('.ennum').text() 
        //     return {
        //         name,
        //         content,
        //         update,
        //         url
        //     }
        // })()
        callback:generateCallBack.call(this,$=>{
            const name = $('title').text().trim()  
            const ul =  $('.partR > .ch-list > ul') 
            const url =  "https://www.ganseea.cn" + ul.find('li').first().find('a').attr('href')
            const content = ul.find('li').first().find('a').text().trim() 
            const update = ul.find('li').first().find('.ennum').text() 
            return {
                name,
                content,
                update,
                url
            }
        })
    }
]



 