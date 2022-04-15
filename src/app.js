const express = require("express");
const app = express();

require('./init/cors')(app);
require('./init/modules')(app); 
const pool = require('./init/dbconnect');
require('dotenv').config()

app.use(express.static(__dirname + 'public'))



require('./init/routes')(app);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Run succesfully at ${port}`);
})
