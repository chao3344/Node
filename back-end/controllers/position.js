const positionModel = require('../models/position')

const findAll = (req,res,next)=>{
    res.set('Content-Type', 'application/json; charset=utf-8')
    res.render('succ',{
        data: JSON.stringify({
            list: []
        })
    })
}

// 添加数据
const add = async(req,res,next) =>{
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data = req.body
    data.createTime = '2019-10-28 21:08'
    let result = await positionModel.save(data)
    if( result ){
        res.render('succ', {
            data: JSON.stringify({
                message: '数据添加成功.'
            })
        })
    }else{
        res.render('fail', {
            data: JSON.stringify({
                message: '数据添加失败'
            })
        })
    }

}

module.exports = {
    findAll,
    add
}