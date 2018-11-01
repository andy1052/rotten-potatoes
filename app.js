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

//	Initialize server:
const app = express();


//	Make connection to mongoDB:
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true}, (err) => {
	console.log('connected to database');
});



//	Set Template engine to handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



//	This line MUST appear AFTER app = express(), but BEFORE your routes!:
app.use(bodyParser.urlencoded({ extended: true }));
//	This middleware also Must appear After app = express(), but BEFORE your routes!:
app.use(methodOverride('_method'));


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