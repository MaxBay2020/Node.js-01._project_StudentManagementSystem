const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const mainCtrl = require('./controllers/mainCtrl')
//连接数据库，nodejs进程实时和数据库保持连接
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/sms')

app.set('view engine', 'ejs')
app.set('layout', './layouts/layout')

app.use('/public', express.static(__dirname + '/public'))
app.use(expressLayout)

//RESTful style
app.get     ('/', mainCtrl.showIndex) //show home page
app.get     ('/student/add', mainCtrl.showAdd) //show add page
app.post    ('/student', mainCtrl.doAddStudent) //add student
app.checkout('/student/:sId', mainCtrl.checkSId) //check sId exists
app.get    ('/student/:sId', mainCtrl.showUpdate) //show update page
app.post    ('/student/:sId', mainCtrl.updateStudent) //update stustudent info
app.delete  ('/student/:sId', mainCtrl.deleteStudent) //delete student
app.get     ('/student', mainCtrl.getAllStudents)

app.listen(3000, () => {
    console.log('server runnning...')
})