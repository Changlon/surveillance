const Crawler = require('crawler') 
const targets = require('./target')
const schedule = require('node-schedule')
const spider = new Crawler({
    jQuery: {
        name: 'cheerio',
        options: {
            normalizeWhitespace: true,
            xmlMode: true
        }
    },
    maxConnections: 1,
    rateLimit:1000
}) 

// spider.queue(targets)  

schedule.scheduleJob("30 * * * * *",()=>{
    spider.queue(targets)  
}) 

