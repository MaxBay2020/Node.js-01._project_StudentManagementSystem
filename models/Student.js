const mongoose = require('mongoose')
const {Schema} = mongoose

let studentSchema = new Schema({
    sId: String,
    sName:String,
    sGender: String,
    sAge : Number
})

//add student
studentSchema.statics.addStudent = function(json,callback){
    //check whether sId exist
    Student.checkSId(json.sId, (torf) => {
        if(torf){
            //sId exists
            callback('0') //0: sId exists
        }else{
            //sId not exist
            let student = new Student(json)

            student.save().then( () => {
                callback('1') //1: sId not exists
            })
        }
    })

}

//check whether student number exist
studentSchema.statics.checkSId = function(sId, callback){
    this.find({sId:sId}, (err, students) => {
        if(err){
            return callback('-1')
        }

        //if sId exists, return true
        //if sId not exist, return false
        return callback(students.length!==0)
    })
}


let Student = mongoose.model('Student', studentSchema)

module.exports = Student

