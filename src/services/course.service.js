const pool = require('../init/dbconnect')
const path = require('path');

module.exports = class CourseService {

	/**
	 * Constructor for User service

	 * @param {object} req the request object 
	 */
	constructor(req) {
        this.filename = req.file.filename;
        this.mimetype = req.file.mimetype;
        this.size = req.file.size;
        this.filepath =req.file.path;
        this.course_title = req.body.course_title;
        this.course_description = req.body.course_description;
        this.price = req.body.price;
        this.email = req.email;
    }

    async createCourse() {
       
        try {
            let q = "SELECT * FROM users where email= $1";
            let user = await pool.query(q,[this.email]);
            if(user.rowCount == 1) {
                let quer =
                "INSERT INTO courses(course_title, course_description,creator_id,filename, filepath,mimetype, size,price) VALUES ('" +
                this.course_title + "', '" + this.course_description + "', '" + user.rows[0].id + "','" + this.filename
                 + "','" + this.filepath + "','" + this.mimetype + "','" + this.size + "','" + this.price + "')";
                let isCreate =  await pool.query(quer);
                if(isCreate){
                    return true;
                }else {
                    return false;
                }
               
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }
    
     async CoursesEnroll() {
      
         try {
             let email = req.email;
             let q = "SELECT * FROM users where email= $1";
             let result = await pool.query(q,[email]);
         } catch (error) {
            console.log(error) 
         }
     }

	
}
