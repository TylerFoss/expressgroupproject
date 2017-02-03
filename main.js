var express = require('express');
var ejs = require('ejs');
var fs = require('fs');

var app = express();

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
        res.locals = { course: course }
        res.render('course.ejs');
    });
});

app.listen(port);
console.log('Server listening on http://localhost:'+port+' !');
