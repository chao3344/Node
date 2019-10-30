const positionModel = require('../models/position')
const moment = require('moment')

const findAll = async (req,res,next)=>{
    res.set('Content-Type', 'application/json; charset=utf-8')

    let result = await positionModel.findAll()

    if( result ){
        res.render('succ',{
            data: JSON.stringify({
                list: result
            })
        })
    }else{

        res.render('fail',{
            data: JSON.stringify({
                list: []
            })
        })
    }

}

const findOne = async(req,res,next) =>{
    let id = req.query.id
    let result = await positionModel.findOne(id)
    if (result) {
        res.render('succ', {
          data: JSON.stringify(result)
        })
      } else {
        res.render('fail', {
          data: JSON.stringify(result)
        })
      }
}

// 添加数据
const add = async(req,res,next) =>{
    res.set('Content-Type', 'application/json; charset=utf-8')
    let data = req.body
    data.createTime = '2019-10-28 21:08'
    data.positionImg = req.filename
    let result = await positionModel.save(data)
    if( result ){
        res.render('succ', {
            data: JSON.stringify({
                message: '您已成功添加一条数据.'
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

// 修改数据
const update = async(req,res,next) => {
    let data = req.body
    data.InTime = moment().format('YY-MM-DD HH:mm:ss')
    let result = await positionModel.update(data)

    if (result) {
        res.render('succ', {
          data: JSON.stringify({
            message: '数据修改成功.'
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            message: '数据修改失败.'
          })
        })
      }
}

const remove = async(req,res,next) => {
    let id = req.body.id
    let result = positionModel.remove(id)

    if (result) {
        res.render('succ', {
          data: JSON.stringify({
            message: '数据删除成功.'
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            message: '数据删除失败.'
          })
        })
      }
}

const search = async(req,res,next) =>{
    let { keywords } = req.body
    let result = await positionModel.search(keywords)

    if (result) {
        res.render('succ', {
          data: JSON.stringify({
            list: result
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            list: []
          })
        })
      }
}



module.exports = {
    findAll,
    add,
    update,
    findOne,
    remove,
    search
}