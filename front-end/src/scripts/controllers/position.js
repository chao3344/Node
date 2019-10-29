import positionView from '../view/position.art'
import positionAddView from '../view/position_add.art'
import http from '../models/http'

function _handleAddClick(res){
    $('.position-btn-add').on('click',()=>{
        console.log(1)
        res.go('/position_add')
    })
}

export const list = async (req,res,next)=>{
    let result = await http.get({
        url: '/api/position/findAll'
    })
    if(result.ret){
        
        res.render(positionView())

        _handleAddClick(res)
    }else{
        // 返回首页，无登录状态下
        res.go('/home')
    }
}

export const add = async(req,res,next) => {
    res.render(positionAddView())
}