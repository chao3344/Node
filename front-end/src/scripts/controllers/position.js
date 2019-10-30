import positionView from '../view/position.art'
import positionAddView from '../view/position_add.art'
import positionUpdateView from '../view/position-update.art'
import http from '../models/http'

function _handleAddClick(res){
    $('.position-btn-add').on('click',()=>{
        
        res.go('/position_add')
    })
}

function _handleUpdateClick(res,obj){
    
    let id = $(obj).attr('data-id')
    res.go('/position-update',{id})
    
    
}

// 设置删除为异步
async function _handleDeleteClick(res,obj){
    
    let id = $(obj).attr('data-id')
    let result = await http.update({
        url: '/api/position',
        type: 'delete',
        data: {id}
    })

    // 利用路由后添加一个时间戳使页面不刷新实现页面数据的刷新
    if (result.ret) {
        res.go('/position?r=' + (new Date().getTime()))
    }
}

// 关键字查询
async function _handleSearch(res,keywords){
    let result = await http.update({
        url: '/api/position/search',
        data: {
            keywords
        }
    })

    if (result.ret) {
        res.render(positionView({
          list: result.data.list
        }))
      } else {
        res.go('/position')
      }
}


export const list = async (req,res,next)=>{
    let result = await http.get({
        url: '/api/position'
    })
    if(result.ret){
        
        res.render(positionView({
            list: result.data.list
        }))

        _handleAddClick(res)
    }else{
        // 返回首页，无登录状态下
        res.go('/home')
    }

    $('.btn-position-update').on('click',function(){
        
        _handleUpdateClick(res,this)
        
    })
    $('.btn-position-delete').on('click',function(){
        _handleDeleteClick(res,this)
    })

    $('body').on('keyup','.position-search',(e)=>{
        if( e.keyCode === 13 ){
            _handleSearch(res,e.target.value)
            
        }
    })
    
}

export const add = async(req,res,next) => {
    res.render(positionAddView())

    /* $('.btn-add-sure').on('click',async(req,res,next)=>{
        let $form = $('#position-add-form')
        let data = $form.serialize()
        let result = await http.update({
            url: '/api/position',
            data
        })
        if( result.ret){
            $form[0].reset()
            alert(result.data.message)
        }else{
            alert(result.data.message)
        }
        
    }) */

    $('#position-add-form').ajaxForm(() => {
        console.log(1)
        
        $('#position-add-form')[0].reset()

        res.go('/position')
    })

    $('.btn-add-quit').on('click',()=>{
        res.go('/position')
    })
}

export const update = async (req,res,next)=> {
    

    let id = req.body.id
    let result = await http.get({
        url: 'api/position/findOne',
        data: {
            id
        }
    })
    res.render(positionUpdateView({
        item: result.data
    }))

    $('.btn-update-sure').on('click', async() => {
        let $form = $('#position-update-form')
        let data = $form.serialize()
        let result = await http.update({
            url: '/api/position',
            data : data + '&id=' + id,
            type: 'patch'
        })
        if (result.ret) {
            res.go('/position')
          } else {
            alert(result.data.message)
        }
    })
    $('.btn-update-back').on('click', () => {
        res.go('/position')
    })
    
}





