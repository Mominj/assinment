CREATE TABLE courses(
   course_id  SERIAL NOT NULL PRIMARY KEY,
   course_title VARCHAR(50) UNIQUE NOT NULL,
   course_description VARCHAR(255) NOT NULL,
   creator_id INT NOT NULL,
   filename TEXT NOT NULL,
   filepath TEXT NOT NULL,
   mimetype TEXT NOT NULL,
   size BIGINT NOT NULL,
   price TEXT NOT NULL,
   CONSTRAINT fk_users  
      FOREIGN KEY(creator_id)   
         REFERENCES users(id)  
);