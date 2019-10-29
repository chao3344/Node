const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Node-project', { useUnifiedTopology: true, useNewUrlParser: true })

// 数据库名如果不写为复数，会自动帮你转换为复数
const Users = mongoose.model('users',{
    username : String,
    password: String
})

// 新建一个数据表，用来存储positions中的房间记录
const Positions = mongoose.model('position',{
    positionName : String,
    positionIDcard: String,
    positionTime: String,
    positionHouse: String,
    positionDay: String,
    positionMoney: String
})

module.exports = {
    Users,
    Positions
}

