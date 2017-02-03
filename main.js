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
        var products = JSON.parse(data);
        res.locals = { products: products };
        res.render('courses.ejs');

    });
});

app.get('/courses/:id', function ( req, res ) {
    fs.readFile('coursess.json', 'utf8', function ( err, data ){
        var productParse = JSON.parse(data)
        var product = productParse.filter(function(p){
            return p.id === parseInt(req.params.id);
        })[0];
        res.locals = { product: product }
        res.render('course.ejs');
    });
});

app.listen(port);
console.log('Server listening on http://localhost:'+port+' !');