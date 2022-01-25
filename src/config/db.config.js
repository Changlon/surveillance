
//测试库
const _DEV_ = { 
    host:'129.226.173.2',
	user:'surveillance',
	password:'8inNRMicMi2nJGAy',
	database:'surveillance',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}

//生产库
const _PRO_ = { 
    host:'129.226.173.2',
	user:'surveillance',
	password:'8inNRMicMi2nJGAy',
	database:'surveillance',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}

module.exports = {
    _DEV_,
    _PRO_
}

