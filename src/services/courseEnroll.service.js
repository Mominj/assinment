const pool = require('../init/dbconnect')
const path = require('path');
const res = require('express/lib/response');

module.exports = class CourseEntrollService {

	/**
	 * Constructor for User service

	 * @param {object} req the request object 
	 */
	constructor(req) {
        this.course_id = req.body.course_id;
        this.email = req.email
    }

  
     async CoursesEnroll() {
      
         try {
       
             let q = "SELECT * FROM users where email= $1";
             let result = await pool.query(q,[this.email]);
             if(result.rowCount == 1) {

                let quer = "SELECT * FROM enroll where student_id=$1";
                let allcourses =  await pool.query(quer, [result.rows[0].id])
              
                let isContain = false ;
               allcourses.rows.map( (item) => {
                   if(item.course_id == this.course_id) isContain = true;
                })
    
                if(isContain == false) {
                    let qe = "INSERT INTO enroll(course_id,student_id) VALUES ($1, $2) RETURNING *"; 
                    let ress = await pool.query(qe, [this.course_id, result.rows[0].id]);
                  
                    if(ress) {
                        return true;
                    } 
                } else {
                    console.log("already have")
                    return false;
                }
            }
         } catch (error) {
            console.log(error) 
            return false;
         }
     }

	
}
