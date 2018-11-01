/*
*
*
*	User model for mongoose
*
*
*/


//	Dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//	Model:
const User = new Schema({
	createdAt: {type: Date},
	updatedAt: {type: Date},
	password: {type: String, select: false},
	username: {type:String, required: true}
});


//	Defined the callback with a regular function to avoid problems
User.pre("save", function(next) {
	//	Set createdAt and updatedAt:
	const now = new Date();
	this.updatedAt = now;
	if (!this.createdAt) {
		this.createdAt = now;
	}
	next();
});


//	Export module:
module.exports = mongoose.model("User", User);