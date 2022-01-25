

/**
 * 日期转指定的字符格式
 * @param {*} date 
 * @param {*} formate 
 * @returns  
 *  %Y->表示满年占位符 2022  %y表示小年占位符 22 
 *  %M ->表示单数月 1    %MM -> 表示双数月01 
 *  %D ->单数日 %DD-> 双数日 
 */

function date2StrFormat_$01(date,format) {     
    if(!date instanceof Date) return 
    const year =  date.getFullYear() 
    const month = ( date.getMonth() + 1 ) < 10 ?  "0" + ( date.getMonth() + 1 ) :( date.getMonth() + 1 )
    const day   = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()  
    format = format ? format : "%Y-%M-%D"   
    format = format.replace("%MM",month) 
    format = format.replace("%DD",day) 
    format =  format.replace("%Y",year) 
    format = format.replace("%M",date.getMonth()+1)
    format = format.replace("%D",date.getDate()) 
    return format
}


module.exports = {
    date2StrFormat_$01
}












