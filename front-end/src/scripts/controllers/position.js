import positionView from '../view/position.art'
import http from '../models/http'

export const list = async (req,res,next)=>{
    let result = await http.get({
        url: '/api/position/findAll'
    })
    if(result.ret){
        
        res.render(positionView())
    }else{
        // 返回首页，无登录状态下
        res.go('/home')
    }
}