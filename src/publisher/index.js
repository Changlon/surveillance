const Crawler = require('crawler') 
const targets = require('./target')
const schedule = require('node-schedule')
const spider = new Crawler() 


for(let i = 0 ;i<targets.length;++i) {
    targets[i].isPushed = false 
}

schedule.scheduleJob("30 * * * * *",()=>{
    spider.queue(targets)  
}) 

schedule.scheduleJob("* * 23 * * *",()=>{ 
    for(let i = 0 ;i<targets.length;++i) {
        targets[i].isPushed = false
    }
})

 