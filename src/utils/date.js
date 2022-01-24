
/**
 * 日期 转 2022年01月23日这种格式
 * @param {*} date 
 */
function date2StrFormat_$01(date) { 
    if(!date instanceof Date) return 
    const year =  date.getFullYear() 
    const month = ( date.getMonth() + 1 ) < 10 ?  "0" + ( date.getMonth() + 1 ) :( date.getMonth() + 1 )
    const day   = date.getDate() < 10 ? "0" + date.getDate() : date.getDate() 
    return `${year}年${month}月${day}日` 
}




 console.log(
  date2StrFormat_$01(new Date(2022,0,23))

 )

module.exports = {
    date2StrFormat_$01
}












