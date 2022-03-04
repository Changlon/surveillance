const request = require("request") 
const targets = require('./target')
const cheerio = require("cheerio")
const schedule = require('node-schedule')
const iconvLite = require("iconv-lite") 



function crawler(targets) {
    for(let target of targets) { 
        request(target.uri,{
            timeout:5000,
            headers:{
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
            },
            encoding:null
        },(err,res,body)=>{
            if(err){
                console.error(`出现错误: ${JSON.stringify (err)} uri: ${target.uri}`) 
                target.errNum = target.errNum === undefined ?  0 : (target.errNum + 1) 
                if(target.errNum < 3) {
                     crawler([target])
                }

                return 
            }  
            if(res.statusCode === 404) {
                 return console.error(`${target.uri}   status: 404`)  
            } 

            console.log(`${target.uri}   status: ${res.statusCode}`)   
           
            if(!target.script) { 
                const coding = body && body.indexOf && body.indexOf("gb2312") > -1 ? 
                "gb2312" : "utf-8"
                const html = iconvLite.decode(Buffer.from(body),coding) 
                // console.log(JSON.parse(html).find((item=> item.channelId === 103398 ? item:null)))
                res.$ = cheerio.load(html)  
                res.isScript = false 
            }else{
                res.isScript = true 
                res.scriptBody = JSON.parse(body) 
            }
            
            target.callback(err,res,()=>{}) 
        })    
    }
}


crawler(targets)

schedule.scheduleJob("30 * * * * *",()=>{
    try {
        crawler(targets)
     }catch(e) {
         console.error(`crawler 出现错误: ${e}`)
         
     }
}) 





