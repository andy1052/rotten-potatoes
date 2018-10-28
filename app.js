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


//	Make connection to mongoDB:
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true}, (err) => {
	console.log('connected to database');
});

//	Mock mongoose model:
const Review = mongoose.model('Review', {
	title: String,
	description: String,
	movieTitle: String
});



//	Initialize server:
const app = express();


//	Set Template engine to handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



//	This line MUST appear AFTER app = express(), but BEFORE your routes!:
app.use(bodyParser.urlencoded({ extended: true }));


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


//	New Reviews Route:
app.get('/reviews/new', (req, res) => {
	res.render('reviews-new', {});
});

//	Create Route (Form Submit):
app.post('/reviews', (req, res) => {
	//	Save Review to database:
	Review.create(req.body).then((review) => {
		console.log(review);
		res.redirect('/');
	}).catch((err) => {
		console.log(err.message);
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