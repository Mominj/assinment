const UserService = require("../services/users.service");
const jwt = require('jsonwebtoken');
const config = require('../config/config')



module.exports.userCreate = async (req, res) => {
   
      try{
        const {name, email} = req.body;
        const userService = new UserService(req);
        const isContain = await userService.checkUser(email,name);

        if(!isContain){
            const isCreate = await userService.saveUsers();
            if(isCreate) {
                res.status(200).json({ message: 'user create succesfully'});
            } else {
                res.status(504).json({ message: 'failed to create user'});
            }  
        } else {
            res.status(504).json({ message: 'user already have'});
        }
      }catch(e) {
          console.log(e)
          res.status(504).json({ message: 'failed to create user'});
      }
    
};

module.exports.listAllStudentTeacher = async(req, res) => {
    try {
        
        const userService = new UserService(req);
        let role = req.role;
        console.log("rol", role)
        if(role == 1) {
            let allUsers = await userService.listOfUsers();
            if(allUsers){
                allUsers.map( item => {
                    let pass = item.password;
                })
                res.status(200).json({ users: allUsers});
            } else {
                res.status(204).json({ users: 'No user found'});
            }
        } else {
            res.status(403).json({ message: 'You can not see users'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}

module.exports.deleteUsersById = async(req, res) => {
    try {
        
        const userService = new UserService(req);
        const id = parseInt(req.params.id)
        console.log("id", id)
        let role = req.role;
        console.log("rol", role)
        if(role == 1) {
            let isDelete = await userService.deleteOfUser(id);
            if(isDelete == 1) {
                res.status(200).json({message : "delete successfully"})
            }  else if(isDelete == 0){
                res.status(200).json({message : "user not found"})
            }
             else{
                res.status(504).json({message : "do not delete"})
            }
           
        } else {
            res.status(403).json({ message: 'You can not see users'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}

module.exports.ViewById = async(req, res) => {
    try {
        
        const userService = new UserService(req);
        const id = parseInt(req.params.id)
        console.log("id", id)
        let role = req.role;
        console.log("rol", role)
        if(role == 2 || role == 3) {
            let user = await userService.viewOfUser(id);
            res.status(200).json({user : user})
           
        } else {
            res.status(403).json({ message: 'You can not see users'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}


module.exports.UpdateById = async(req, res) => {
    try {
        
        const userService = new UserService(req);
        const id = parseInt(req.params.id)
        console.log("id", id)
        let role = req.role;
        console.log("rol", role)
        if(role==1 || role == 2 || role == 3) {
            let user = await userService.updateOfUser(id);
            if(user){
                res.status(200).json({message : "update successfully"})
            } else {
                res.status(200).json({message : "don't update"})
            }
           
           
        } else {
            res.status(403).json({ message: 'You can not update'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}

module.exports.changeUserPassword = async(req, res) => {
    try {
        const userService = new UserService(req);
       
        let role = req.role;
        console.log("rol", role)
        if(role==1 || role == 2 || role == 3) {
            let user = await userService.changePassword(req.body.email);
            if(user){
                res.status(200).json({message : "update successfully"})
            } else {
                res.status(200).json({message : "don't update"})
            }
           
           
        } else {
            res.status(403).json({ message: 'You can not update'});
        }
       
        
    } catch (error) {
        console.log(error)
        res.status(204).json({ users: error.message});
    }
}