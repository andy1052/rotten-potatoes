/*
*
*
*	Authentication routes
*
*
*/

//	Dependencies:
const User = require('../models/user');



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
		res.redirect("/");
	}).catch(err => {
		console.log(err.message);
	});
});


};