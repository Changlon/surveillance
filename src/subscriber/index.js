
const koa = require('koa')
const koaRouter = require('koa-router')
const koaXmlBody = require('koa-xml-body')
const koaBodyParser = require('koa-body-parser')
const koaWechat = require('koa-wechat-public') 

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
    acc.send.sendTxtMsg(acc.content) 
})  


router.all("/wechat_debug",weapp.start())  

router.all(notifyPath,async (ctx,next)=>{ 
    console.log(`notify`)
    const body = ctx.request.body
    //通知公众号推送消息 
    const name =   body.name  
    const content =  body.content
    const url =  body.url
    const update = body.update
    // const res = await weapp.pushTxtCustomerMsg("oOskj6NqnCG1C1eBSh0cz6H7GEZE",`${name} 更新通知 : <a href = '${url}' > ${content} </a> \n 更新时间:${update}`) 
    const res = await weapp.pushTemplateMsg("oOskj6NqnCG1C1eBSh0cz6H7GEZE","_MAWPY1TfORuS0SZDLJFOXLUR33k42-IjD_E21U9qO0",{
        name:{
            value:name,
            color:"#173177"
        },
        content:{
            value:content,
            color:"#173177"
        },
        update:{
            value:update,
            color:"#173177"
        }
    },url)
    console.log(res)
    ctx.body = res
})

app.use(koaBodyParser())
app.use(koaXmlBody())
app.use(router.routes())
app.listen(PORT,()=>{
    console.log(`success! application is running on port : ${PORT}`)
}) 
