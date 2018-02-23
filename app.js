var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
	res.render('index', {title: 'Welcome'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'io.mher.margaryan@gmail.com',
			pass: ''
		}
	});

	var mailOptions = {
		from: 'Mher Margaryan <io.mher.margaryan@gmail.com>',
		to: 'margaryan.mher.28@gmail.com',
		subject: 'Online form submitted',
		text: 'Contact form message... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message,
		html: '<p> Contact form message... </p> <ul> <li>Name: ' + req.body.name + '</li> <li>Email: ' + req.body.email + '</li> <li>Message: ' + req.body.message + '</li> </ul>'
	}

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
			res.redirect('/');
		}else{
			console.log('The message was sent' + info.response);
			res.redirect('/');
		}
	})
});

app.listen(2828);
console.log("Server is running on port 2828");