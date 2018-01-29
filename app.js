var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES



app.get('/', function(req, res){
	res.redirect('blogs');
})

app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log('ERROR');
		} else {
			res.render('index', {blogs: blogs});
		}
	});
});



// NEW ROUTE

app.get('/blogs/new', function(req, res){
	res.render('new');
});

// CREATE ROUTE

app.post('/blogs', function(req, res){
	// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render('new');
		}else{
			res.redirect('/blogs');
		};
	})
	//then, redirect to the index
});

//SHOW ROUTE

app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
		res.redirect('/blogs')	;
		}else{
			res.render('show', {blog: foundBlog});
		}
	});
});


app.listen(3000, function(req, res){
	console.log('the Serving is serving up the BLOGO');
})