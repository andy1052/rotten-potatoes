/*
*
*
*	Mongoose Schema (Review)
*
*
*/

//	Dependencies:
const mongoose = require('mongoose');



//	Schema:
const Review = mongoose.model('Review', {
	title: String,
	description: String,
	movieTitle: String,
	rating: Number
});

//	Export Module:
module.exports = Review;

//	Require this module in './controllers/reviews.js' instead of app.js.