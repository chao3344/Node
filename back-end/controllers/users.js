const userModel = require('../models/users')
const tools = require('../utils/tools')

// 用户注册，向数据库中加数据
const signup = async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    
    let { username , password } = req.body

    // 判断，用户注册时用户名或者密码不能为空
    if( username == ''|| password == '' ){
        
        res.render('fail',{
            data: JSON.stringify({
                message: '用户名或密码不可以为空~!'
            })
        })
    }else{
         // 用户密码加密后再次赋值
        let hash = await tools.hash(password)

        let result = await userModel.save({
            username,
            password : hash
        })
        

        // 对用户名与密码做一个判断
        if( result && result.username !=''){
            res.render('succ',{
                data: JSON.stringify({
                    message: '恭喜您,注册成功~!'
                })
            })
        }else{
            res.render('fail',{
                data: JSON.stringify({
                    message: '抱歉,用户注册失败~!'
                })
            })
        }

    }
   

    
}

// 判断用户名是否存在，使用中间键next()

const hasUsername = async function(req,res,next){
    
    res.set('Content-Type', 'application/json; charset=utf-8')
    let { username } = req.body
    
    let result = await userModel.findOne({username})
    
    if( result){
        res.render('fail',{
            data: JSON.stringify({
                message: '抱歉,用户名已经存在~!'
            })
        })
    }else{
        next()
    }
    
}

// 登录判断用户名域密码是否正确
const signin = async function(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8')
    let { username,password } = req.body

    let result =  await userModel.findOne({username})
    
    if( result ){
        let CompareResult =  await tools.compare(password,result.password)
        if(CompareResult){
            res.render('succ',{
                data: JSON.stringify({
                    type:'true',
                    message: '恭喜您,登录成功~!',
                    name : username
                })
            })
        }else{
            res.render('fail',{
                data: JSON.stringify({
                    message: '用户名或密码输入错误!'
                })
            })
        }
    }else{
        res.render('fail',{
            data: JSON.stringify({
                message: '用户名或密码输入错误!'
            })
        })
    }

}

module.exports = {
    signup,
    hasUsername,
    signin
}