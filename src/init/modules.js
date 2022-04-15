const morgan = require("morgan");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

module.exports = function(app) {
  
    app.use(morgan('tiny'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}