var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  // console.log(req.query);
  if(req.query.term !== '') {
    giphy.search(req.query.term, (err, response) => {
      res.render('home', {gifs: response.data});
    })
  } else {
    res.render('home', {error: 'please enter a search term'})
  }

});

app.listen(3000, () => {
  console.log('Gif Search listening on port 3000!')
});
