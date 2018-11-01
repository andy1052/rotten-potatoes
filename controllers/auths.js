/*
*
*
*	Authentication routes
*
*
*/

//	Dependencies:
const User = require('../models/user');
const jwt = require('jsonwebtoken');



//	Routes:
module.exports = function(app) {

//	Sign-up route:
app.get('/sign-up', (req, res) => {
	res.render('sign-up');
});


//	Sign-up Post Route:
app.post('/sign-up', (req, res) => {
	console.log(`from user post: `, req.body);
	//	Create User:
	const user = new User(req.body);

	user.save().then(user => {
		//	Generate token:
		let token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"});
		res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
		res.redirect("/");
	}).catch(err => {
		console.log(err.message);
		return res.status(400).send({err: err});
	});
});

//	Logout Route:
app.get('/logout', (req, res) => {
	res.clearCookie('nToken');
	res.redirect('/');
});


//	Login:
app.get('/login', (req, res) => {
	res.render('login');
});

//	Login POST Form:
app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	//	Find this username in the database:
	User.findOne({username}, "username password").then(user => {
		if (!user) {
			//	User not found:
			return res.status(401).send({message: "Wrong username or password"});
		}
		//	Otherwise, Check the password:
		user.comparePassword(password, (err, isMatch) => {
			if (!isMatch) {
				//	If password doesn't match:
				return res.status(401).send({message: "Wrong username or password"});
			}
			//	Otherwise, create a token:
			const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {expiresIn: "60 days"});
			//	Set a cookie and redirect to root:
			res.cookie("nToken", token, {maxAge: 900000, httpOnly: true});
			res.redirect('/');
		});
	}).catch(err => {
		console.log(err.message);
	});
});




};