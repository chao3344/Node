const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Node-project', { useUnifiedTopology: true, useNewUrlParser: true })

// 数据库名如果不写为复数，会自动帮你转换为复数
const Users = mongoose.model('users',{
    username : String,
    password: String
})

module.exports = {
    Users
}

