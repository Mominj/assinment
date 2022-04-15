CREATE TABLE mcq(
  exam_id SERIAL NOT NULL PRIMARY KEY,
  exam_class VARCHAR(255) NOT NULL,
  exam_year VARCHAR(255) NOT NULL,
  subject_name VARCHAR(255) NOT NULL,
  question VARCHAR(255) NOT NULL,
  question_options varchar[4] NOT NULL,
  question_asnwer  VARCHAR(255) NOT NULL,
  teacher_id INT NOT NULL,
  CONSTRAINT fk_users  
      FOREIGN KEY(teacher_id)   
         REFERENCES users(id)
);