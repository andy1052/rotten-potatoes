/*
*
*
*	Routes for all the crud operations
*
*
*/

//	Dependencies
const Review = require('../models/review');
const Comment = require('../models/comment');



//	Make inital route, (homepage):
module.exports = function(app) {

app.get('/', (req, res) => {
	console.log("cookie ", req.cookies);
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
		//	Then Fetch the review's comments:
		Comment.find({ reviewId: req.params.id }).then((comments) => {
		//	Respond with the template with both values:
		res.render('reviews-show', { review: review, comments: comments})			
		})
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
};

