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
	//	First check to make sure user is logged in:
	if (req.user) {	
		Comment.create(req.body).then(comment => {
			res.redirect(`/reviews/${comment.reviewId}`);
		}).catch((err) => {
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
		console.log("Deleted Comment");
		Comment.findByIdAndDelete(req.params.id).then((comment) => {
	console.log(`${comment.reviewId}`);		
			res.redirect(`/reviews/${comment.reviewId}`);
		}).catch((err) => {
			console.log(err.message);
		});
	} else {
		res.redirect('/unauthorized');
	}
	});
};