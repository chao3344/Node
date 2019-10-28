import SMERouter from 'sme-router'

import { home } from '../controllers/home'
import * as position from '../controllers/position'

const router = new SMERouter('page-wrapper')

router.use((req) => {
    let url = req.url.slice(1)
    $(`.sidebar-collapse ul li[data-url=${url}]`).addClass('active-menu').siblings().removeClass('active-menu')
})

router.route('/home',home)

router.route('/position',position.list)

router.route('*', (req, res, next) => {
    res.redirect('/home')
})

export default router 