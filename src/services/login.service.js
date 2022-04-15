'use strict';
const pool = require('../init/dbconnect')


module.exports = class LoginService {

	/**
	 * Constructor for User service

	 * @param {object} req the request object 
	 */
	constructor(req) {
	   this.email = req.body.email
	   this.password = req.body.password
	}
	

	async checkUser(email) {
		try {
			let q  = `SELECT * FROM users where email=$1`;
			let re = await pool.query(q, [email]);
			if(re.rows[0]){
				return re.rows[0];
			} else {
				return false;
			}
		  } catch (err) {
			console.log(err)
            return false;
			
		}
    }	
}
