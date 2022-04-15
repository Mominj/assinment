var bcrypt = require('bcrypt')
const LoginService = require("../services/login.service")
const isPassValid = require('../validator/passValidator');
const  isEmailValid  = require('../validator/emailValidator');
const createToken = require('../jobs/generateToken');
const match = require('nodemon/lib/monitor/match');

module.exports.login = async (req, res) => {
   
    const {email, password} = req.body;
    const isvalidEmail = isEmailValid(email) 
    console.log(isEmailValid, email)
    if (isvalidEmail) {
       
        const loginService = new LoginService(req);

            const user = await loginService.checkUser(email);
            console.log(user)
            if(user) {
                console.log("user", user.password)
               let match = await bcrypt.compare(password, user.password);
                  
                console.log("ma", password,user.password, match)
                if(match) {
                    const token = createToken(email, user.role_id);
                    res.status(200).json({"token": token});
                } else {
                    res.status(401).json({ message: "password do not match"});
                }

            } else {
                res.status(401).json({message: "user not found"});
            } 
            
    } else {
        res.status(401).send({message:"Email validation error"}) 
    }
  
};