const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const hash = (password) =>{
    return new Promise( (resolve,reject)=>{
        
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,function(err,hash){
                resolve(hash)
            })
        })
    })
}

// 比较输入密码是否与数据库中保存的数据一致
const compare = (password,hash)=>{
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function(err, res) {
          resolve(res)
        })
      })
}



const generateToken = (username)=>{
    return new Promise((resolve,reject) =>{
        // 改为同步事件，等读取完文件后在执行以下操作
        let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_private_key.pem'))
        jwt.sign(
            {
                username
            },
            cert,
            {
                algorithm: 'RS256'
            },
            (err,token) =>{
                resolve(token)
            })
    })
}

const verifyToken = (token) => {
    return new Promise((resolve,reject) =>{
        let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_public_key.pem'))
        jwt.verify(token,cert,(err,decoded) =>{
            resolve(decoded)
        })
    })
}

module.exports = {
    hash,
    compare,
    generateToken,
    verifyToken
}