const Student = require('../models/Student')
const formidable = require('formidable')

exports.showIndex = (req,res) => {
    Student.find({}, (err, students) => {
        if(err){
            return res.send('-2')
        }
        return res.render('index', {
            data: students

        })
    })
}

exports.showAdd = (req,res) => {
    res.render('add')
}

exports.doAddStudent = (req,res, callback) => {

    const form = formidable({ multiples: true })

    form.parse(req, (err, fields) => {
        if(err){
            return res.send('-2')//-2: server error
        }
        Student.addStudent(fields, (result) => {
            if(result==='1'){
                return res.send('1')//1: sId not exists
            }else if(result === '0'){
                return res.send('0')//0: sId exists
            }
        })

    });
}

exports.checkSId = (req,res) => {
    Student.checkSId(req.params.sId, (data => {
        return res.send(data)
    }))
}

//get all students
exports.getAllStudents = (req,res) => {
    Student.find({}, (err, students) => {
        if(err){
            return res.send('-2')
        }
        return res.render('index', {
            data: students

        })
    })
}

exports.showUpdate = (req,res) => {
    Student.find({sId:req.params.sId}, (err, student) => {
        if(err){
            return res.send('-2')
        }
        if(student.length===0){
            return res.send('no such student')
        }

        res.render('update', {
            student:student[0]
        })
    })
}

//update student info
exports.updateStudent = (req,res) => {
    Student.find({sId: req.params.sId}, (err, student) => {
        if(err){
            return res.send('-2')//-2: server error
        }else if(student.length===0){
            return res.send('-1')//-1: no such student
        }

        const form = formidable({ multiples: true })

        form.parse(req, (err, fields) => {
            if(err){
                return res.send('-2')//-2: server error
            }

            //update info
            student[0].sName = fields.sName
            student[0].sAge = fields.sAge
            student[0].sGender = fields.sGender

            student[0].save().then(()=> {
                return res.send('1')
            })

        });
    })
}

//delete student based on sId
exports.deleteStudent = (req,res) => {
    Student.find({sId: req.params.sId}, (err, student) => {
        if(err){
            return res.send('-2')//-2: server error
        }else if(student.length===0){
            return res.send('-1')//-1: no such student
        }

        student[0].remove().then(() => {
            return res.send('1')
        })
    })
}
