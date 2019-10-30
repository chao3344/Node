import SMERouter from 'sme-router'

import { home } from '../controllers/home'
import * as position from '../controllers/position'

import titleView from '../view/title.art'

const router = new SMERouter('page-wrapper')

router.use((req) => {
    let url = req.url.slice(1).split('?')[0].split('_')[0]

    // 高亮的处理
    $(`.sidebar-collapse ul li[data-url=${url}]`).addClass('active-menu').siblings().removeClass('active-menu')


// 利用路由的改变实现对标题的切换
// 面包屑
let TitleMap ={
    'home':{
        title: '首页',
        subtitle: '欢迎您'
    },
    'position':{
        title: '房间管理',
        subtitle: '这是您的房间管理部分'
    }
}

/* let Info = {
    Title:{
        title: TitleMap[url].title,
        subtitle: TitleMap[url].subtitle
    }
} */

/* let html = titleView({
    title: Info.Title
}) */
// $('#page-title').html(html)

})



window.route = router

router.route('/home',home)

router.route('/position',position.list)
router.route('/position_add',position.add)
router.route('/position-update',position.update)

router.route('*', (req, res, next) => {
    res.redirect('/home')
})

export default router 