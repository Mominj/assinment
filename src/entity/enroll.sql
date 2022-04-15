CREATE TABLE enroll(
   id SERIAL NOT NULL PRIMARY KEY,
   course_id  INT references courses(course_id)  NOT NULL,
   student_id INT references users(id)   NOT NULL
);