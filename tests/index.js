var g = 1

let funcStr = `
function a() {
    console.log("test function a") 
    console.log(g)
}

a()
`

 var f1 = new Function("a",'console.log(a)') 

 console.log(f1("123")) 
