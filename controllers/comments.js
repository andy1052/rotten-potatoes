/*
*
*
*	Routes for review comments
*
*/

//	Dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('../models/comment');
const Review = require('../models/review');
const User = require('../models/user');

module.exports = function(app) {

	//	New Comments
	app.post('/reviews/comments', (req, res) => {
	//	First check to make sure user is logged in:
	if (req.user) {	
		//	First put the comment into a variable:
		let comment = req.body;
		//	Save the comment in the comment collection:
		Comment.create(req.body).then(comment => {
			//	Now save the comment._id in the user's schema/collection:
			User.findOneAndUpdate({_id: req.user._id}, {$push: {comments: comment._id}}).then(() => {
				//	Now save the comment._id in the review's schema/collection:
				Review.findOneAndUpdate({_id: req.body.reviewId}, {$push: {comments: comment._id}}).then(() => {
					//	Now redirect to the review page, displaying the comment.
					res.redirect(`/reviews/${comment.reviewId}`);
				});
			});
		})
		.catch((err) => {
			console.log('Error from comments.js ', err.message);
		});
	} else {
		res.redirect('/unauthorized');
	}
	});


	//	Delete Comment:
	app.delete('/reviews/comments/:id', (req, res) => {
		//	First check to make sure the user is logged in:
		if (req.user) {

		//	Delete comment from comments collection:
		Comment.findByIdAndDelete(req.params.id).then((comment) => {
	console.log(`${comment.reviewId}`);
		//	Remove from user's collection:
		User.findOneAndUpdate({_id: req.user._id}, {$pull: {comments: req.params.id}}).then(() =>{
			//	Remove from review's collection:
			Review.findOneAndUpdate({comments: req.params.id}, {$pull: {comments: req.params.id}}).then(() => {
				console.log("Shit's been deleted!");
				res.redirect(`/reviews/${comment.reviewId}`);
			});
		});
		}).catch((err) => {
			console.log(err.message);
		});
	} else {
		res.redirect('/unauthorized');
	}
	});
};