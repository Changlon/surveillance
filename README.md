## 项目分析
```
    1. 爬虫进程 : 每个一段时间爬取网站最新的公告，如果有当前时间的公告则发送一个更新请求

    2. 公众号进程: 如果接受到推送请求则群发模板消息 

    3. 数据库设计: 

        1) 一个 list表存储需要爬取的网站 关键字段 url, is_pushed -> 表示当天这个网站是否推送,过，每天定时重置这个字段
        2) 一个 user表
    4. 面临的问题： 
        每日模板消息调用次数 = 网站数 * 用户总数 
        默认 10w 一天调用上限

            10 * 1w = 10w  当用户数量为1w时，最多每天 爬取 10个网站的最新通知 
            
```








