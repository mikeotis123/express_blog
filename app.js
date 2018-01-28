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










app.listen(3000, function(req, res){
	console.log('the Serving is serving up the BLOGO');
})