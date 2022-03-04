const req = require('request') 
const {domain,PORT,notifyPath} = require('../config/server.config')
const {
    date2StrFormat_$01
} = require('../utils/date')

const list = require('../../list.js') 
const f2json = require('f2json')() 
const parseXmlString = require('xml2js').parseStringPromise    
const cheerio = require('cheerio')
const fs = require('fs')

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
                if(err) j(err)  
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
     return async function(err,res,done) {
        
        if(err) {
           throw err
        } 

        const isScript =this.script 

        let info = {} 

        if(isScript) {
            info = await Promise.resolve( (this.scriptHandler && this.scriptHandler(res.scriptBody)) || {})
        }else{
            info = await Promise.resolve(parser(res.$))  
        }

        const {name,content,update,url} = info
        
        if(!fs.existsSync("./cache.json")) {
            f2json.json2file("./cache.json",{})
        }
        let {json,ok} = f2json.file2json("./cache.json")  
        const uri = this.uri
        const todayCacheIndex = date2StrFormat_$01(new Date(),"%Y-%MM-%DD")
        const isPushed = json[todayCacheIndex]  && 
                         json[todayCacheIndex][uri]  

        
          if(process.env.NODE_ENV === "development")   {
            console.log(`name:${name}`)
            console.log(`uri:${uri}`)
            console.log(`update:${update}`)
            console.log(`content:${content}`)
            console.log(`url:${url}`) 
            console.log("===========================================================================")
          } 
  
        if(
            (
                date2StrFormat_$01(new Date(),"%Y年%MM月%DD日")=== update  || 
                date2StrFormat_$01(new Date(2022,1,17),"%Y-%MM-%DD")=== update || 
                date2StrFormat_$01(new Date(),"%Y.%MM.%DD")=== update 
            )
        
        && !isPushed ) { 
            console.log(`notify : ${uri} name : ${name} update:${update} content:${content} `) 
            notify(name,content,update,url)
            if(!json[todayCacheIndex]) json[todayCacheIndex] = {} 
            json[todayCacheIndex][uri] = true   
            ok() 
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
        liSelector,
        updateSelector,
        urlPrefix,
        headers,
        ...other
    }
) {  
    return {
        ...other,
        uri:uri,
        callback:generateCallBack.call(this,async $=>{
            const name = $('title').text().trim()   
            let content,update,url 
            let   ul =  $(ulSelector) 

          
            // 对于xml数据格式的页面处理方法
            if(
                ul.children().first().attr("type") =="text/xml"
              ) { 

                const result =  await parseXmlString(ul.children().first().html()) 
                const $ = cheerio.load( result.datastore.recordset[0].record[0]) 
                content = $("a").text().trim() 
                url = $("a").attr("href").startsWith("http")?  
                        $("a").attr("href")
                     :   urlPrefix + $("a").attr("href")
                update = $(updateSelector).text().trim() 
                return {
                    name,
                    content,
                    update,
                    url
                }
              }

              
             
            //  const href =  ul.find(liSelector || 'li').first().find('a').attr('href') || ""  

            let href = "" 

            ul.find(liSelector || 'li').first().find('a').each((i,ele)=>{
                  href = ele.attribs.href
            })

             url =  href.startsWith("http") ?  
                     href:
                      urlPrefix + href 

             content = ul.find(liSelector || 'li').first().find('a').text().trim() 
             update = updateSelector ?  
             ul.find(liSelector || 'li').first().find(updateSelector).text().replace("[","").replace("]","").trim() :
             ul.find(liSelector || 'li').first().text().replace("[","").replace("]","").trim() 
             
             update = (update.match(/\d{2,4}-\d{1,2}-\d{1,2}/g) && update.match(/\d{2,4}-\d{1,2}-\d{1,2}/g)[0] ) || 
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




 