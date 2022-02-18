const request = require("request") 
const targets = require('./target')
const cheerio = require("cheerio")
const schedule = require('node-schedule')

function crawler() {
    for(let target of targets) { 
        request(target.uri,{
            timeout:3000,
            headers:{
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
            }
        },(err,res,body)=>{
            if(err){
                console.error(`出现错误: ${JSON.stringify (err)} uri: ${target.uri}`) 
                return crawler()
            }  
            if(res.statusCode === 404) {
                 return console.error(`${target.uri}   status: 404`)  
            } 

            console.log(`${target.uri}   status: ${res.statusCode}`)  
            res.$ = cheerio.load(body)  
            target.callback(err,res,()=>{}) 
        })    
    }
}


crawler()

schedule.scheduleJob("30 * * * * *",()=>{
    try {
        crawler()
     }catch(e) {
         console.error(`crawler 出现错误: ${e}`)
         
     }
}) 





