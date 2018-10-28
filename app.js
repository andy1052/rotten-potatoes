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

mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true}, () => {
	console.log('connected to database');
});

//	Mock mongoose model:
const Review = mongoose.model('Review', {
	title: String,
	movieTitle: String
});



//	Initialize server:
const app = express();


//	Set Template engine to handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//	Make inital route:
app.get('/', (req, res) => {
	//	Get reviews from database:
	Review.find()
		.then(reviews => {
			res.render('reviews-index', { reviews: reviews });
		})
		.catch(err => {
			console.log(err);
		});
	});


// /* A mock array of projects*/
// let reviews = [
// { title: "Great Review", movieTitle: "Batman II"},
// { title: "Awesome Review", movieTitle: "Titanic"},
// { title: "Fuck Yeah!", movieTitle: "Fear and loathing in Las Vegas"}
// ];









//	Listen on port:
app.listen(3000, () => {
	console.log('Server listening on port 3000');
});