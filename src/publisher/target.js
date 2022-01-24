
const {domain,PORT,notifyPath} = require('../config/server.config')
const req = require('request') 
const {
    date2StrFormat_$01
} = require('../utils/date')

module.exports = [
    {
        uri: "https://www.ganseea.cn/html/tzgg/",
        callback(err,res,done) {
            if(err) return console.log(err)
            const $ = res.$ 
            const name = $('title').text().trim()  
            const ul =  $('.partR > .ch-list > ul') 
            const url =  "https://www.ganseea.cn" + ul.find('li').first().find('a').attr('href')
            const content = ul.find('li').first().find('a').text().trim() 
            const update = ul.find('li').first().find('.ennum').text() 
            if(date2StrFormat_$01(new Date(2022,0,23))===update && !this.isPushed) { 
                notify(name,content,update,url)
                this.isPushed = true 
            }
        }
    }
]


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





 