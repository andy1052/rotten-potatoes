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



//	Initialize server:
const app = express();


//	Set Template engine to handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//	Make inital route:
app.get('/', (req, res) => {
	res.render('home', { msg: 'Handlebars are cool!' });
});


//	Listen on port:
app.listen(3000, () => {
	console.log('Server listening on port 3000');
});