/*
*
*	Mongoose Model for comments saved to DB
*
*/

//	Dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//	Schema:
const Comment = mongoose.model('Comment', {
	title: String,
	content: String,
	reviewId: {type: Schema.Types.ObjectId, ref: 'Review'},
	author: { type: Schema.Types.ObjectId, ref: 'User', required: true}
});


//	Export module:
module.exports = Comment;