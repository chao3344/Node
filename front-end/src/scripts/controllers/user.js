import navView from '../view/nav.art'

import httpModel from '../models/http'
class User{
    constructor(){
        this.render()
        this.LoginRegist()
        this.id = ''
        
    }
    render(){
        
        let html = navView({
            isLogin : false
        })
        $('#nav').html(html)  
       
    }

    LoginRegist(){
        let that = this
        // 把id传入看用户究竟点击的是哪个按钮
        $('#btn-register').on('click',function(){
            that.id = $(this).attr('id')
        })
        $('#btn-login').on('click',function(){
            that.id = $(this).attr('id')
        })

        // 提交数据
        $('#btn-login').on('click',this.handleSubmit.bind(this))
        $('#btn-register').on('click',this.handleSubmit.bind(this))
    }

    async handleSubmit(url){
        
        let data = $('#login-from').serialize()
        
        let result = await httpModel.get({
            // this.id表示用户点击登录或注册
            url :this.id === 'btn-login'?'/api/users/signin':'/api/users/signup',
            data
        })
        this.handleSubmitSucc(result)
    }
    handleSubmitSucc(result){
        let that = this
        $('#login-from')[0].reset()

        
        if( result.data.type ){
            let html = navView({
                isLogin : true
            })
            $('#nav').html(html)
            $('#login-li').removeClass('open')
            $('.user-name').text()
        }
        
        $('.login-box-title').html(result.data.message)
        $('.user-name').text(result.data.name)
        
        $('#login-li').addClass('open')
        $('.login-quit').on('click',function(){
            that.render()
            that.LoginRegist()
            
        })
    }
}

export default new User()