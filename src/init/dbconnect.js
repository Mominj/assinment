const { Pool, Client } = require("pg");


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "practise",
  password: "momin1234",
  port: 5432,
});


pool.on("connect", () => {
    console.log("database connection succesfully")
});

pool.on("end", () => {
    console.log("database terminate succesfully")
});

module.exports = pool;




