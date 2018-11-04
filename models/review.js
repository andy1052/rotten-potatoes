/*
*
*
*	Mongoose Schema (Review)
*
*
*/

//	Dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//	Schema:
const Review = mongoose.model('Review', {
	title: String,
	description: String,
	movieTitle: String,
	rating: Number,
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

//	Export Module:
module.exports = Review;

//	Require this module in './controllers/reviews.js' instead of app.js.