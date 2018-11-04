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
const User = require('../models/user');



//	Make inital route, (homepage):
module.exports = function(app) {


app.get('/', (req, res) => {
	
	let currentUser = req.user;
	console.log("currentUser: ", currentUser);
	//	Get reviews from database:
	Review.find()
		.then(reviews => {
			res.render('reviews-index', { reviews: reviews, currentUser: currentUser});
		})
		.catch(err => {
			console.log(err);
		});
	});


//	New Reviews Route:
app.get('/reviews/new', (req, res) => {
	let currentUser = req.user;
	res.render('reviews-new', {currentUser: currentUser});
});


//	Create Route (Form Submit):
app.post('/reviews', (req, res) => {
	//	Make sure user is logged in before saving new review:
	if (req.user) {

		let review = new Review(req.body);
		review.author = req.user._id;

		//	Save the new review:
		review.save().then(post => {
			//	Find the author by user id:
			return User.findById(req.user._id);
		}).then( user => {
			//	add the review's id to the user's array:
			user.reviews.unshift(review);
			user.save();
			//	Redirect to the review's page:
			res.redirect(`/reviews/${review._id}`);
		}).catch((err) => {
			console.log(err.message);
		});
		} else {
			res.redirect('/unauthorized'); //Unauthorized.
		}
	});

//	Get route for unauthorized:
app.get('/unauthorized', (req, res) => {
	let currentUser = req.user;
	res.render('unauthorized', {currentUser: currentUser});
});


//	Show a specific review when clicked on:
//	This is a query string search, so body parser makes the "req.params.id" parameter to use.
app.get('/reviews/:id', (req, res) => {
	let currentUser = req.user;
	//	Find specified document by _id:
	Review.findById(req.params.id).then((review) => {
		//	Then Fetch the review's comments:
		Comment.find({ reviewId: req.params.id }).then((comments) => {
		//	Respond with the template with both values:
		res.render('reviews-show', { review: review, comments: comments, currentUser: currentUser});			
		})
	}).catch((err) => {
		console.log(err.message);
	});
});


//	Edit review route:
app.get('/reviews/:id/edit', (req, res) => {
	let currentUser = req.user;
	Review.findById(req.params.id).then((review) => {
		res.render('reviews-edit', { review: review, currentUser: currentUser });
	}).catch((err) => {
		console.log(err.message);
	});
});


//	Put request (Update), using "method-override" middleware:
app.put('/reviews/:id', (req, res) => {
	//	First check to make sure user is logged in.
	if (req.user) {
	Review.findOneAndUpdate(req.params.id, req.body)
		.then(review => {
			res.redirect(`/reviews/${review._id}`);
		}).catch(err => {
			console.log(err.message);
		});
	} else {
		res.redirect('/unauthorized', {});
	}
});


//	Delete Route:
app.delete('/reviews/:id', (req, res) => {

	//	First check to make sure the user is logged in:
		if (req.user) {			

			 Review.findOneAndDelete(req.params.id).then((review) => {
			 	
			 	console.log("Deleted from reviews: ", review);
			// }).then(() => {
			 	
			 	User.update({ _id: req.user._id,}, { $pull: {reviews: req.params.id}}).then((err) => {
			 		if(err) {
			 			console.log(err.message);
			 		} else {
				    	res.redirect('/');
			 		}
			 	});
			});
		} else {
			res.redirect('/unauthorized');
		}
		});



}; // End of module exports!

