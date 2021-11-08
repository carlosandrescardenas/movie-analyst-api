// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : process.env.DB_HOST || 'moviedbccardenas.cx02uzagq3fl.us-west-1.rds.amazonaws.com',
  user     : process.env.DB_USER || 'admin',
  password : process.env.DB_PASS || 'rampuptest2021',
  database : process.env.DB_NAME || 'movie_db'
});

connection.connect();

// Implement the publications API endpoint - db -moviereview
app.get('/movies', function(req, res){
  var movies = [];
  connection.query("select mr.title, mr.release, mr.score, mr.reviewer, r.publication from movie_db.moviereview as mr inner join reviewer r on mr.reviewer = r.name", 
  function (err, result, fields) {
    if (err) throw err;
    movies = result;
    res.json(movies);
  });
})

// Implement the publications API endpoint - db -review
app.get('/reviewers', function(req, res){
  var authors = [];
  connection.query("SELECT * FROM reviewer", function (err, result, fields) {
    if (err) throw err;
    authors = result;
    res.json(authors);
  });
})

// Implement the publications API endpoint - db - publication
app.get('/publications', function(req, res){
  var publications = [];
  connection.query("SELECT * FROM publication", function (err, result, fields) {
    if (err) throw err;
    publications = result;
    res.json(publications);
  });
})

//Testing endpoint
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
})

// Implement the pending reviews API endpoint
app.get('/pending', function(req, res){
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]
  res.json(pending);
})
console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 8085.
app.listen(process.env.PORT || 8085);
module.exports = app;