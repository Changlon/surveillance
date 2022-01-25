const Crawler = require('crawler') 
const targets = require('./target')
const schedule = require('node-schedule')
const spider = new Crawler() 



// spider.queue(targets)  


schedule.scheduleJob("30 * * * * *",()=>{
    spider.queue(targets)  
}) 

