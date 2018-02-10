var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/hello-gif', (req, res) => {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
  res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('/greetings/:name', (req, res) => {
  let name = req.params.name;
  res.render('greetings', {name: name});
});

app.get('/', (req, res) => {
  console.log(req.query);

  giphy.search(req.query.term, (err, response) => {
    res.render('home', {gifs: response.data});
  });

  // let queryString = req.query.term;
  // let term = encodeURIComponent(queryString);
  // let url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC';
  //
  // http.get(url, (response) => {
  //   // set response encoding to utf8
  //   response.setEncoding('utf8');
  //
  //   let body = '';
  //
  //   response.on('data', (d) => {
  //     // stream data into body
  //     body += d;
  //   });
  //
  //   response.on('end', () => {
  //     // when data is fully received parse into json
  //     let parsed = JSON.parse(body);
  //     // render home template and pass GIF data in to the tempalte
  //     res.render('home', {gifs: parsed.data});
  //   });
  // });
});

app.listen(3000, () => {
  console.log('Gif Search listening on port 3000!')
});
