CREATE TABLE users(
   users_id  INT PRIMARY KEY NOT NULL,
   name unique VARCHAR(50) NOT NULL,
   email unique VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   verification bool BOOLEAN NOT NULL,
   role_id INT NOT NULL,
   CONSTRAINT fk_role
      FOREIGN KEY(role_id) 
	  REFERENCES role(id)
);