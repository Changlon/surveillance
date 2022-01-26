const fs = require('fs')  
const path = require('path')
module.exports = {  
    readAsJson(path_ = "") {   
        if(!path_) throw new Error("path 不能为空!")
        if(path_.startsWith(".") ) { 
            path_ =  path.join(__dirname,path_) 
        }
        const content = fs.readFileSync(path_,{
            encoding:"utf-8"
        })  

        const json = JSON.parse(content)
       return {
          json ,
          ok:() => {  
            this.writeAsJson(json,path_) 
          }
       }
    },

    writeAsJson(json,path_) {  
        if(!json || !path_)  return  
        if(path_.startsWith(".") ) { 
            path_ =  path.join(__dirname,path_) 
        }
        const str = JSON.stringify(json) 
        fs.writeFileSync(path_,str) 
    }
}




