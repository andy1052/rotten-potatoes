/*
*
*
*	Routes for review comments
*
*/

//	Dependencies:
const Comment = require('../models/comment');

module.exports = function(app) {

	//	New Comments
	app.post('/reviews/comments', (req, res) => {	
		Comment.create(req.body).then(comment => {
			res.redirect(`/reviews/${comment.reviewId}`);
		}).catch((err) => {
			console.log('Error from comments.js ', err.message);
		});
	});


	//	Delete Comment:
	app.delete('/reviews/comments/:id', (req, res) => {
		console.log("Deleted Comment");
		Comment.findByIdAndDelete(req.params.id).then((comment) => {
	console.log(`${comment.reviewId}`);		
			res.redirect(`/reviews/${comment.reviewId}`);
		}).catch((err) => {
			console.log(err.message);
		});
	});
};