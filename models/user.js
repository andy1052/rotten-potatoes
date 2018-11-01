/*
*
*
*	User model for mongoose
*
*
*/


//	Dependencies:
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

	//	Encrypt password:
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			user.password = hash;
			next();
		});
	});
});


//	Need to use function to enable this.password to work:
User.methods.comparePassword = function(password, done) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		done(err, isMatch);
	});
};

//	Export module:
module.exports = mongoose.model("User", User);