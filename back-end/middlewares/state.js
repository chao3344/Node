const tools = require('../utils/tools')

// 判断用户是否处于登录状态
const isSignin = async function(req,res,next){   
    res.set('Content-Type', 'application/json; charset=utf-8')
    
    // let token = req.get('X-Access-Token')
    let { token , username } = req.cookies
    
    if( token ){
        // let username = await tools.verifyToken(token)
            if( req.path === '/isSignin' ){
    
                res.render('succ',{
                    data : JSON.stringify({
                        username,
                    })
                })
            }
            else{
                let decoded = await tools.verifyToken(token)
                if( decoded ){
                    next()
                }else{
                    res.render('fail',{
                        data: JSON.stringify({
                            message: '抱歉,你尚未登录!'
                        })
                    })
                }
            }
        
    }else{
        res.render('fail',{
            data: JSON.stringify({
                message: '抱歉,你尚未登录!'
            })
        })
    }

    
}

module.exports = isSignin