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
			console.log(err.message);
		});
	});
};