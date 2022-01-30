
const parseXmlString = require('xml2js').parseStringPromise    
const cheerio = require('cheerio')

const xmlStr = `
<datastore>
        <nextgroup><![CDATA[<a href="/module/web/jpage/dataproxy.jsp?page=1&appid=1&appid=1&webid=110&path=/&columnid=12377&unitid=38486&webname=%25E5%25AE%259A%25E8%25A5%25BF%25E5%25B8%2582%25E6%2594%25BF%25E5%25BA%259C%25E4%25BF%25A1%25E6%2581%25AF%25E5%2585%25AC%25E5%25BC%2580%25E5%25B9%25B3%25E5%258F%25B0&permissiontype=0"></a>]]></nextgroup>
        <recordset>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/20/art_12377_1486865.html" title="定西市“春节”文明祭祀倡议书">定西市“春节”文明祭祀倡议书</a>    <b>2022-01-20</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/19/art_12377_1486583.html" title="定西市工信局关于对省级第二轮环保督察反馈第四项第十三项问题整改完成情况的公示">定西市工信局关于对省级第二轮环保督察反馈第四项第十三项问题整改完成情...</a>    <b>2022-01-19</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/14/art_12377_1485512.html" title="2021年度政府网站年度工作报表">2021年度政府网站年度工作报表</a>    <b>2022-01-14</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/14/art_12377_1485138.html" title="定西市新冠肺炎疫情联防联控领导小组办公室通告">定西市新冠肺炎疫情联防联控领导小组办公室通告</a>    <b>2022-01-14</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/7/art_12377_1485549.html" title="定西市人民政府办公室关于2021年第四季度全市政府网站和政务新媒体检查情况的通报">定西市人民政府办公室关于2021年第四季度全市政府网站和政务新媒体检...</a>    <b>2022-01-07</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/6/art_12377_1484337.html" title="关于在城区内禁止随意焚烧冥纸冥币有关事项的通告">关于在城区内禁止随意焚烧冥纸冥币有关事项的通告</a>    <b>2022-01-06</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/5/art_12377_1482706.html" title="定西市省级第二轮生态环境保护督察反馈问题第16项整改任务完成情况公示">定西市省级第二轮生态环境保护督察反馈问题第16项整改任务完成情况公示</a>    <b>2022-01-05</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2022/1/4/art_12377_1482071.html" title="定西市新冠肺炎疫情联防联控领导小组办公室通告">定西市新冠肺炎疫情联防联控领导小组办公室通告</a>    <b>2022-01-04</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/30/art_12377_1481173.html" title="S42漳县至三岔高速公路工程环境影响评价第二次公示">S42漳县至三岔高速公路工程环境影响评价第二次公示</a>    <b>2021-12-30</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/27/art_12377_1479540.html" title="定西市农业农村局落实甘肃省第二轮生态环境保护督察反馈问题第4项整改任务完成情况公示">定西市农业农村局落实甘肃省第二轮生态环境保护督察反馈问题第4项整改任...</a>    <b>2021-12-27</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/22/art_12377_1478096.html" title="关于征求《定西市“十四五”推进农业农村现代化发展规划（征求意见稿）》和《定西市“十四五”马铃薯产业发展规划（征求意见稿）》意见的公告">关于征求《定西市“十四五”推进农业农村现代化发展规划（征求意见稿）》...</a>    <b>2021-12-22</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/15/art_12377_1475526.html" title="关于在定西市渭源县开展省级自然资源所有权首次登记的通告">关于在定西市渭源县开展省级自然资源所有权首次登记的通告</a>    <b>2021-12-15</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/15/art_12377_1475523.html" title="关于在定西市岷县开展省级自然资源所有权首次登记的通告">关于在定西市岷县开展省级自然资源所有权首次登记的通告</a>    <b>2021-12-15</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/15/art_12377_1475520.html" title="关于在定西市陇西县开展省级自然资源所有权首次登记的通告">关于在定西市陇西县开展省级自然资源所有权首次登记的通告</a>    <b>2021-12-15</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/15/art_12377_1475517.html" title="关于在定西市临洮县开展省级自然资源所有权首次登记的通告">关于在定西市临洮县开展省级自然资源所有权首次登记的通告</a>    <b>2021-12-15</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/15/art_12377_1475513.html" title="关于在定西市安定区开展省级自然资源所有权首次登记的通告">关于在定西市安定区开展省级自然资源所有权首次登记的通告</a>    <b>2021-12-15</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/15/art_12377_1475510.html" title="关于在定西市漳县开展省级自然资源所有权首次登记的通告">关于在定西市漳县开展省级自然资源所有权首次登记的通告</a>    <b>2021-12-15</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/12/1/art_12377_1470795.html" title="中共定西市委机要和保密局2021年度引进急需紧缺人才公告">中共定西市委机要和保密局2021年度引进急需紧缺人才公告</a>    <b>2021-12-01</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/26/art_12377_1469142.html" title="“国家乡村振兴局：23类项目可以申请补贴，数额超千亿”？官方正式辟谣">“国家乡村振兴局：23类项目可以申请补贴，数额超千亿”？官方正式辟谣</a>    <b>2021-11-26</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/24/art_12377_1468467.html" title="定西市加强草原保护修复的实施意见（征求意见稿）">定西市加强草原保护修复的实施意见（征求意见稿）</a>    <b>2021-11-24</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/24/art_12377_1468250.html" title="定西市关于严肃换届纪律加强换届风气监督的公告">定西市关于严肃换届纪律加强换届风气监督的公告</a>    <b>2021-11-24</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/23/art_12377_1467886.html" title="关于定西市“十四五”成品油和车用天然气分销体系发展规划布局站点的公示">关于定西市“十四五”成品油和车用天然气分销体系发展规划布局站点的公示</a>    <b>2021-11-23</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/11/art_12377_1464304.html" title="定西市新冠肺炎疫情联防联控领导小组办公室通告">定西市新冠肺炎疫情联防联控领导小组办公室通告</a>    <b>2021-11-11</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/9/art_12377_1463266.html" title="定西市人民政府办公室关于2021年第三季度全市政府网站和政务新媒体检查情况的通报">定西市人民政府办公室关于2021年第三季度全市政府网站和政务新媒体检...</a>    <b>2021-11-09</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/5/art_12377_1462473.html" title="中国人民银行定西市中心支行关于第24届冬季奥林匹克运动会普通纪念币预约兑换的公告">中国人民银行定西市中心支行关于第24届冬季奥林匹克运动会普通纪念币预...</a>    <b>2021-11-05</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/5/art_12377_1462342.html" title="关于征求《定西市“十四五”大健康产业发展规划（征求意见稿）》意见的公告">关于征求《定西市“十四五”大健康产业发展规划（征求意见稿）》意见的公...</a>    <b>2021-11-05</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/4/art_12377_1461955.html" title="定西市科学技术局关于向社会公众征求意见建议的公告">定西市科学技术局关于向社会公众征求意见建议的公告</a>    <b>2021-11-04</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="http://zwgk.dingxi.gov.cn/art/2021/11/4/art_12480_1461862.html" title="甘肃省人民政府教育督导委员会办公室关于开展2021年市（州）人民政府履行教育职责情况满意度调查的通知">甘肃省人民政府教育督导委员会办公室关于开展2021年市（州）人民政府...</a>    <b>2021-11-04</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/3/art_12377_1461607.html" title="关于引洮供水一期总干渠1#-5#隧洞工程病害处理延期施工的通知">关于引洮供水一期总干渠1#-5#隧洞工程病害处理延期施工的通知</a>    <b>2021-11-03</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/11/1/art_12377_1462225.html" title="甘肃省人民政府教育督导委员会办公室关于开展2021年市（州）人民政府履行教育职责情况满意度调查的通知">甘肃省人民政府教育督导委员会办公室关于开展2021年市（州）人民政府...</a>    <b>2021-11-01</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/29/art_12377_1460423.html" title="关于关停全市个体诊所的公告">关于关停全市个体诊所的公告</a>    <b>2021-10-29</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/28/art_12377_1459475.html" title="关于引洮供水一期总干渠病害处理期间停水和小流量供水情况的公告">关于引洮供水一期总干渠病害处理期间停水和小流量供水情况的公告</a>    <b>2021-10-28</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/28/art_12377_1459343.html" title="关于疫情期间红事缓办、白事简办倡议书">关于疫情期间红事缓办、白事简办倡议书</a>    <b>2021-10-28</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/26/art_12377_1458465.html" title="定西市住房和城乡建设局关于积极缴纳供热费的倡议书">定西市住房和城乡建设局关于积极缴纳供热费的倡议书</a>    <b>2021-10-26</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/24/art_12377_1457747.html" title="定西市新冠肺炎疫情联防联控领导小组办公室通告（第5号）">定西市新冠肺炎疫情联防联控领导小组办公室通告（第5号）</a>    <b>2021-10-24</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/24/art_12377_1457746.html" title="定西市公安局交通警察支队关于实施临时交通管制的通告">定西市公安局交通警察支队关于实施临时交通管制的通告</a>    <b>2021-10-24</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/19/art_12377_1456412.html" title="定西市教育局关于对全面加强和改进新时代学校体育和美育工作的实施方案的征求意见的公告">定西市教育局关于对全面加强和改进新时代学校体育和美育工作的实施方案的...</a>    <b>2021-10-19</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/15/art_12377_1455486.html" title="定西市市级总河湖长河湖长河湖警长河湖检察长名单及市县河湖问题监督举报电话公示">定西市市级总河湖长河湖长河湖警长河湖检察长名单及市县河湖问题监督举报...</a>    <b>2021-10-15</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/14/art_12377_1455094.html" title="定西市人民政府办公室关于2021年度履行教育职责自查自评的报告">定西市人民政府办公室关于2021年度履行教育职责自查自评的报告</a>    <b>2021-10-14</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/10/8/art_12377_1453344.html" title="市委涉粮问题专项巡察公告">市委涉粮问题专项巡察公告</a>    <b>2021-10-08</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/9/30/art_12377_1452945.html" title="关于对市幼儿园2021年度第二批补充拟引进急需紧缺人才的公示">关于对市幼儿园2021年度第二批补充拟引进急需紧缺人才的公示</a>    <b>2021-09-30</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/9/30/art_12377_1452766.html" title="关于征集2022年为民办实事项目建议的公告">关于征集2022年为民办实事项目建议的公告</a>    <b>2021-09-30</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/9/30/art_12377_1452557.html" title="关于征求《定西市“十四五”通道物流产业发展规划（征求意见稿）》意见的公告">关于征求《定西市“十四五”通道物流产业发展规划（征求意见稿）》意见的...</a>    <b>2021-09-30</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/9/30/art_12377_1452521.html" title="定西市人民代表大会常务委员会公告（第10号）">定西市人民代表大会常务委员会公告（第10号）</a>    <b>2021-09-30</b></li>]]></record>
        <record><![CDATA[
        <li class="clearfix">    <a target="_blank" href="/art/2021/9/30/art_12377_1452512.html" title="定西市人民代表大会常务委员会公告（第9号）">定西市人民代表大会常务委员会公告（第9号）</a>    <b>2021-09-30</b></li>]]></record>
        </recordset>
        </datastore>
`


parseXmlString(xmlStr,(err,result)=>{
    if(err) throw err 
     const $ = cheerio.load( result.datastore.recordset[0].record[0]) 
     
})

