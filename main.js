var express = require('express');
var ejs = require('ejs');
var fs = require('fs');

var app = express();


var contactFileName = './contact_info.json';
var contactFile = require(contactFileName);

var port = 8000;

//get, put, post, delete
app.get('/', function(request, response){

    response.sendFile(__dirname + '/index.html')

});

app.get('/courses', function(req, res){
    fs.readFile('courses.json', 'utf8', function(err, data){
        var courses = JSON.parse(data);
        res.locals = { courses: courses };
        res.render('courses.ejs');

    });
});

app.get('/courses/:id', function ( req, res ) {
    fs.readFile('courses.json', 'utf8', function ( err, data ){
        var courseParse = JSON.parse(data)
        var course = courseParse.filter(function(p){
            return p.id === parseInt(req.params.id);
        })[0];

        fs.readFile('reviews.json', 'utf8', function ( err, data) {
            var reviewParse = JSON.parse(data);
            var review = reviewParse.filter(function(r){
            return r.course_id === parseInt(req.params.id);
            })[0];
            res.locals = { course: course, review: review }
            res.render('course.ejs');

        });     
    });
    

});

app.get('/contact', function(req, res){
   res.render('contact.ejs');
});


app.post('/contact/add', function(req, res){
    var contact_obj = {
        "name" : req.params.name,
        "phone" : req.params.number
    };

    fs.writeFile(contactFileName, JSON.stringify(contact_obj), function (err) {
        if(err){ console.log(err); }
       console.log();
    });
    
});


app.listen(port);
console.log('Server listening on http://localhost:'+port+' !');
