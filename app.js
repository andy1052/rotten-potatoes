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


//	Make connection to mongoDB:
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true}, (err) => {
	console.log('connected to database');
});

//	Mock mongoose model:
const Review = mongoose.model('Review', {
	title: String,
	description: String,
	movieTitle: String,
	rating: Number
});



//	Initialize server:
const app = express();


//	Set Template engine to handlebars:
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



//	This line MUST appear AFTER app = express(), but BEFORE your routes!:
app.use(bodyParser.urlencoded({ extended: true }));
//	This middleware also Must appear After app = express(), but BEFORE your routes!:
app.use(methodOverride('_method'));


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
		res.redirect(`/reviews/${review._id}`); // redirect to reviews/:id
	}).catch((err) => {
		console.log(err.message);
	});
});

//	Show a specific review when clicked on:
//	This is a query string search, so body parser makes the "req.params.id" parameter to use.
app.get('/reviews/:id', (req, res) => {
	//	Find specified document by _id:
	Review.findById(req.params.id).then((review) => {
		res.render('reviews-show', { review: review })
	}).catch((err) => {
		console.log(err.message);
	});
});


//	Edit review route:
app.get('/reviews/:id/edit', (req, res) => {
	Review.findById(req.params.id).then((review) => {
		res.render('reviews-edit', { review: review })
	}).catch((err) => {
		console.log(err.message);
	});
});


//	Put request (Update), using "method-override" middleware:
app.put('/reviews/:id', (req, res) => {
	Review.findOneAndUpdate(req.params.id, req.body)
		.then(review => {
			res.redirect(`/reviews/${review._id}`);
		}).catch(err => {
			console.log(err.message);
		});
});


//	Delete Route:
app.delete('/reviews/:id', (req, res) => {
	console.log("Deleted review");
	Review.findOneAndDelete(req.params.id).then(review => {
		res.redirect('/');
	}).catch(err => {
		console.log(err.message);
	});
});









//	Listen on port:
app.listen(3000, () => {
	console.log('Server listening on port 3000');
});