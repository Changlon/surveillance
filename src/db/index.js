const {_DEV_,_PRO_} = require('../config/db.config') 
const mysql = require('mysql2')  


let pool  = null 

pool = mysql.createPool(_PRO_)

if(process.env.NODE_ENV !== "production") {  
    pool = mysql.createPool(_DEV_)
}else{
    pool = mysql.createPool(_PRO_)
}  


if(!pool) throw new Error(`数据库连接失败`) 

/**
 * 执行sql语句
 * @param {*} sql 
 * @param {*} params 
 * @returns 
 */
const executeSql =async (sql,params) =>{  
    
    return await new Promise((r,j)=>{
       
      pool.getConnection((err,connection)=>{
          
          if(err){
            throw err 
          } 
        
          connection.query({
              sql,
              timeout:10000,
              values:params
          },(error,results)=>{ 
              if(error) throw error 
              r(results) 
          })

          pool.releaseConnection(connection)

      })
  })
} 



/**
 * 插入
 * @param {*} tName 表名
 * @param {*} pojo  pojo
 * @returns 
 */
const insert = async (
    tName,
    pojo
)=>{  

    let insertSql = `insert into \`${tName}\`(`
    let lastInsertSql = `values(` 
    let params = []
    Object.keys(pojo).forEach(key=>{
        const mysqlItemName = strCamelToMysql(key) 
        if( typeof pojo[key] != 'undefined' ) {
            insertSql = insertSql + "`"+ mysqlItemName +"`" + ','
            lastInsertSql = lastInsertSql + '?' + ',' 
            params.push(pojo[key]) 
        }
    }) 
    insertSql = insertSql.substring(0,insertSql.length-1) 
    insertSql = insertSql + ')'  
    lastInsertSql = lastInsertSql.substring(0,lastInsertSql.length-1) 
    lastInsertSql = lastInsertSql + ')' 
    insertSql = insertSql + " " + lastInsertSql 

    if(process.env.NODE_ENV !== "production") {
        console.debug(insertSql,params)
    }
    
    const {insertId} = (await executeSql(insertSql,params))   
    pojo['setId'] ? pojo['setId'].call(pojo,insertId) :
    (pojo.id = insertId) 

    return  pojo
}



/**
 * 批量插入
 * @param {*} tName 
 * @param {*} listPojo 
 */
const insertBatch = async (
    tName,
    listPojo
) =>{

    let insertSql = `insert into \`${tName}\`(`
    let lastInsertSql = `values(` 
    let params = []
    let isFirstPojo = true 
    for(let pojo of listPojo) {
        Object.keys(pojo).forEach(key=>{
            const mysqlItemName = strCamelToMysql(key) 
            if( typeof pojo[key] != 'undefined' ) {
                if(isFirstPojo) insertSql = insertSql + "`"+ mysqlItemName +"`" + ',' ;
                lastInsertSql = lastInsertSql + '?' + ',' 
                params.push(pojo[key]) 
            }
        }) 
        
        if(isFirstPojo){
            insertSql = insertSql.substring(0,insertSql.length-1) 
            insertSql = insertSql + ')'  
        } 

        lastInsertSql = lastInsertSql.substring(0,lastInsertSql.length-1) 
        lastInsertSql = lastInsertSql + '),' 
        insertSql = insertSql + " " + lastInsertSql 
        isFirstPojo = false
        lastInsertSql = '('

    }
   insertSql = insertSql.substring(0,insertSql.length-1) 
    
    if(process.env.NODE_ENV !== "production") {
        console.debug(insertSql,params)
    }

    let {affectedRows,insertId} = (await executeSql(insertSql,params))    
    
    for(let i = 0 ;i< affectedRows ;i++) { 
        let pojo = listPojo[i] 
        pojo['setId'] ? pojo['setId'].call(pojo,insertId++) :
        (pojo.id = insertId++) 
    }
    
    return listPojo 
    
}



/**
 * 查询
 * @param {*} tName 
 * @param {*} pojo 
 * @returns 
 */
const select = async (
    tName,
    pojo,
    Class,
) =>{

    let selectSql = `select * from \`${tName}\` where `
    let params = []
    Object.keys(pojo).forEach(key=>{
        const mysqlItemName = strCamelToMysql(key) 
        if( typeof pojo[key]!='undefined') {
            selectSql = selectSql + "`" +  `${mysqlItemName}\`=? and `
            params.push(pojo[key]) 
        }
    }) 
    
    if(params.length>0) {
        selectSql = selectSql.substring(0,selectSql.length-1-4)
    }else{
        selectSql = selectSql.substring(0,selectSql.length-1-6)
    }

    if(process.env.NODE_ENV !== "production") {
        console.debug(selectSql,params)
    }

    const rows = (await executeSql(selectSql,params)),ret = []  
    for(let i = 0;i<rows.length;++i) {
        const row = rows[i]   
        const __pojo__ =  Class ? new Class({}) : {}
        Object.keys(row).forEach(key=>{  
            const selectedValue = row[key]
            const pojoKey =   strMysqlToCamel(key)   
            const setPojoKey = pojoKey[0].toUpperCase() + pojoKey.substring(1) 
            __pojo__[`set${setPojoKey}`]?  __pojo__[`set${setPojoKey}`].call(__pojo__,selectedValue) :
            __pojo__[pojoKey] = selectedValue
        }) 

        ret.push(__pojo__)
    }
    return ret
}



/**
 * 更新
 * @param {*} tName 
 * @param {*} pojo 
 */
const update = async (
    tName,
    pojo,
    accordingCloum = "id" 
) =>{

    
    let updateSql = `update \`${tName}\` `
    let setSql = ` set `
    let whereSql = ` where \`${strCamelToMysql(accordingCloum)}\` = ${pojo[accordingCloum]}`    
    let setParams = [] 
        
    Object.keys(pojo).forEach(key=>{
        const mysqlItemName = strCamelToMysql(key) 
        if( mysqlItemName !== accordingCloum && pojo[key]!==undefined ) { 
            setSql = setSql+ "`" +  `${mysqlItemName}\` =? ,` 
            setParams.push(pojo[key]) 
        }
    }) 

    
    if(setParams.length>0) {
        setSql = setSql.substring(0,setSql.length-1) 
    }else{
        return 
    }
    
    updateSql = updateSql + setSql + whereSql  

    if(process.env.NODE_ENV !== "production") {
        console.debug(updateSql,setParams)
    }
    
    return (await executeSql(updateSql,[...setParams])) 

}




/**
 * 删除符合pojo条件的数据
 * @param {*} tName 
 * @param {*} pojo 
 */
const delete_ = async (
    tName,
    pojo
) =>{  
    

    let deleteSql = `delete from \`${tName}\` where `
    let params = []
    Object.keys(pojo).forEach(key=>{
        const mysqlItemName = strCamelToMysql(key) 
        if( typeof pojo[key]!='undefined') {
            deleteSql = deleteSql + "`" +  `${mysqlItemName}\`=? and `
            params.push(pojo[key]) 
        }
    }) 
    
    if(params.length>0) {
        deleteSql = deleteSql.substring(0,deleteSql.length-1-4)
    }else{
        deleteSql = deleteSql.substring(0,deleteSql.length-1-6)
    }


    if(process.env.NODE_ENV !== "production") {
        console.debug(deleteSql,params)
    }

    return (await executeSql(deleteSql,params))
}



module.exports = {
    executeSql,
    insert,
    insertBatch,
    update,
    delete_,
    select
}



/**
 * 驼峰转Mysql
 * @param {*} str 
 * @returns 
 */
const  strCamelToMysql = str=>{   
	const checkReg = /^[A-Z]+$/ ; let mysqlStr = ""  
    mysqlStr = mysqlStr + str[0] 
	for(let i = 1;i<str.length;++i) {
		if(checkReg.test(str[i])) {
			mysqlStr = mysqlStr + "_" + str[i].toLowerCase() 
		}else{
			mysqlStr = mysqlStr + str[i]
		}
	}
	return mysqlStr
}


/**
 *  mysql 转驼峰
 * @param {*} str 
 */
const strMysqlToCamel = str =>{ 
    let camelStr = ""  
    camelStr = camelStr + str[0]
    for(let i = 1;i<str.length;++i) {
		if(str[i] === "_") { 
            i++ 
			camelStr = camelStr +  str[i].toUpperCase()
		}else{
			camelStr = camelStr + str[i]
		}
	}

    return camelStr
}










