import navView from '../view/nav.art'
import store from 'store'
import httpModel from '../models/http'


class User{
    constructor(){
        
        this.render()
        
        
        this.id = ''
        this.isSignin = false
        this.username = ''
        
    }
    async render(){
        
        await this.state()
        
        
        let html = navView({
            isLogin : this.isSignin,
            username: this.username
        })
        $('#nav').html(html) 

        this.LoginRegist() 
        
        // 利用事件委托，解决第一次登录后无法退出的问题
        $('#wrapper').on('click','.login-quit',async function(){
            
            // store.remove('token')
            // location.reload()
            
            let result = await httpModel.get({
                url: '/api/users/signout'
            })
            
            if( result.ret ){
                location.reload()
            }
        })
        
    }


    LoginRegist(){
        let that = this
        // 把id传入看用户究竟点击的是哪个按钮
        $('#btn-register').on('click',function(){
            that.id = $(this).attr('id')
            
            that.handleSubmit()
        })
        $('#btn-login').on('click',function(){
            that.id = $(this).attr('id')
            
            that.handleSubmit()
        })

       
    }

    async handleSubmit(url){
        
        let data = $('#login-from').serialize()
        
        let result = await httpModel.get({
            // this.id表示用户点击登录或注册
            url :this.id === 'btn-login'?'/api/users/signin':'/api/users/signup',
            data,
            type: 'POST'
        })
        this.handleSubmitSucc(result)
    }
    handleSubmitSucc(result){
        let that = this
        $('#login-from')[0].reset()

        
        if( result.data.type ){
            
            let html = navView({
                isLogin : true,
                username : result.data.username
            })
            
            $('#nav').html(html)
            $('#login-li').removeClass('open')
            
            
            
        }
        
        $('.login-box-title').html(result.data.message)
        
        // $('.user-name').text(result.data.name)
        
        $('#login-li').addClass('open')
        
        
    }

    // 检测用户现在的状态是登录还是未登录
    async state(){
        
        let result = await httpModel.get({
            url: '/api/users/isSignin'
        })
        
        let username = result.data.username
        
        this.isSignin = username ? true : false 
        this.username = username
        
        
        
    }


}

export default new User()