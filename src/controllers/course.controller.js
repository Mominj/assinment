var bcrypt = require('bcrypt')
const path = require('path');
const pool = require('../init/dbconnect')

const CourseService = require("../services/course.service")
const CoursesEnrollService = require("../services/courseEnroll.service")
module.exports.courseCreate = async (req, res) => {
   
    try {
        const courseService = new CourseService(req);
        let role = req.role;
        if(role == 3){
           let isCreat = await courseService.createCourse();
           console.log("create", isCreat) 
           if(isCreat){
               res.status(200).json({message: "course create succesfully"})
           } else{
            res.status(500).json({message: "don't create course"})
           }
        } else {
            res.status(500).json({message: "you are not permitted"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

module.exports.imagePath = async (req, res) => {
   
    try {
        const { filename } = req.params;
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, 'public/images/' + filename);
        console.log(fullfilepath)
        return res.sendFile(fullfilepath);

    } catch (error) {
        console.log(error)
    }
};

module.exports.allCourseShow = async (req, res) => {
   
    try {
        let role = req.role;
        if(role == 2 || role == 3){
            let q = "SELECT * FROM courses";
            let result = await pool.query(q);
           if(result.rowCount > 0){
               res.status(200).json({courses:result.rows })
           } else{
            res.status(200).json({message: "not data found" })
           }
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({message: error.message })
    }
};




module.exports.courseEnroll = async (req, res) => {
   
    try {
        const coursesEnrollService = new CoursesEnrollService(req);
        let role = req.role;
        if(role == 2) {
           let isEnroll = await coursesEnrollService.CoursesEnroll();
           console.log("isEnroll", isEnroll)
           if(isEnroll){
             res.status(200).json({message: "enroll successfully"});
           } else{
            res.status(504).json({message: "don't enroll"}); 
           }
        } else {
            res.status(504).json({message: "you can't enroll"}); 
        }
    } catch (error) {
        console.log(error)
        res.status(504).json({message: error.message}); 
    }
};