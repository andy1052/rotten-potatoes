/*
*
*
*	Server configuration for rotten-potatoes app
*
*
*/

//	Dependencies:
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//	Initialize server:
const app = express();


//	Make connection to mongoDB:
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true}, (err) => {
	console.log('connected to database');
});


//	CheckAuth function:
let checkAuth = function(req, res, next) {
	console.log("Checking authentication");
	if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
		req.user = null;
	} else {
		let token = req.cookies.nToken;
		let decodedToken = jwt.decode(token, {complete: true}) || {};
		req.user = decodedToken.payload;
	}
	next();
};



//	Set Template engine to handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//	This middleware is for cookies, place AFTER you initialize express:
app.use(cookieParser());
//	This line MUST appear AFTER app = express(), but BEFORE your routes!:
app.use(bodyParser.urlencoded({ extended: true }));
//	This middleware also Must appear After app = express(), but BEFORE your routes!:
app.use(methodOverride('_method'));
//	This is custom middleware that checks if "nToken" exists and is valid:
app.use(checkAuth);


//	Connect Routes from reviews.js, pass the app variable into the file as well:
const reviews = require('./controllers/reviews')(app);

//	Connect Routes from comments.js, pass the app variable into the file as well:
const comments = require('./controllers/comments')(app);

//	Connect Routes from Auths.js, pass the app variable into the file as well:
const auths = require('./controllers/auths')(app);


//	Listen on port:
app.listen(3000, () => {
	console.log('Server listening on port 3000');
});