var bcrypt = require('bcrypt')
const pool = require('../init/dbconnect')


module.exports.mcqCreate = async (req, res) => {
   
   try {
       const role = req.role;
       if(role == 3) {
            const {exam_class,exam_year,subject_name,question, question_asnwer,teacher_id} = req.body;
            let q = 'INSERT INTO mcq (exam_class, exam_year,subject_name,question, question_options,question_asnwer,teacher_id) VALUES ($1, $2, $3,$4,$5, $6,$7) RETURNING *';
            let isCreate = await pool.query(q, [exam_class,exam_year, subject_name, question, req.body.question_options, question_asnwer, teacher_id]);
            if(isCreate) {
                res.status(200).json({message: "mcq create successfully"});
            }else {
                res.status(504).json({message: "mcq do not create"}); 
            }
       } else {
          res.status(504).json({message: "you do not create mcq"});
       }
        
   } catch (error) {
    res.status(504).json({message: error.message}); 
   }
};


module.exports.examCreate = async (req, res) => {
   
    try {
        const role = req.role;
        const{exam_class,exam_year,subject_name,setNumber} = req.body;
        if(role == 3) {
            let quer = `SELECT * FROM mcq where exam_class=$1 AND exam_year=$2 AND subject_name=$3 LIMIT ${10} OFFSET ${(setNumber*10)-10}`;
            let allQuestion = await pool.query(quer, [exam_class,exam_year,subject_name]);
            res.status(200).json({qestion: allQuestion.rows});
        } else {
           res.status(504).json({message: "you do not create exam"});
        }
         
    } catch (error) {s
        res.status(504).json({message: error.message}); 
    }
 };