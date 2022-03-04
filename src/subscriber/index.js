
const koa = require('koa')
const koaRouter = require('koa-router')
const koaXmlBody = require('koa-xml-body')
const koaBodyParser = require('koa-bodyparser')
const koaWechat = require('koa-wechat-public') 
const f2json = require('f2json')()
const wechatConfig = require('../config/wechat.config') 
const { PORT,notifyPath} = require('../config/server.config')

const app = new koa()
const router = new koaRouter()  
const weapp = new koaWechat({
    appId:wechatConfig.appId,
    appSecret:wechatConfig.appSecret,
    token:wechatConfig.token
})


weapp
.text(/.+/,async acc =>{
    console.log(`接受消息:${acc.fromUser}`)
    acc.send.sendTxtMsg(acc.content) 
})  
.subscribe(async acc =>{ 
    console.log(`接受关注:${acc.fromUser}`)
})

router.all("/wechat_debug",weapp.start())  



const openids = [
    "o6Y5S5jK3R2lCU0Y2jO8NcHPO4es",
    "o6Y5S5kmgo7VwP7-kwVogreOIKEQ"
]

router.all(notifyPath, async (ctx,next)=>{ 
    console.log(`notify`)
    const body = ctx.request.body
    //通知公众号推送消息 
    const name =   body.name  
    const content =  body.content
    const url =  body.url
    const update = body.update

    console.log(ctx.request.body)


    // TODO 获取vip的Openid批量发送

    const  resData = [] 

    for(let openid of openids) {
        
        const res = await weapp.pushTemplateMsg(openid,"Lawyo1mAdPxHSzpBfSS8GcFDq4s8gEuAzkZkUvfzYYU",{
        
            first:{
                value:"更新提醒"
            },
            keyword1:{
                value:name
            },
            keyword2:{
                value:"济大助手服务号"
            },
    
            keyword3:{
                value:update
            },
            keyword4:{
                value:content
            },
            remark:{
                value:""
            }
            
        },url)

        resData.push(res)
    }
    
    
    ctx.body = resData

    
})

app.use(koaXmlBody())
app.use(koaBodyParser())
app.use(router.routes())
app.listen(PORT,()=>{
    console.log(`success! application is running on port : ${PORT}`)
}) 
