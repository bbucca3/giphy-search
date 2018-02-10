var express = require('express');
var exphbs = require('express-handlebars');
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
  console.log(req.query)
  res.render('home');
})

app.listen(3000, () => {
  console.log('Gif Search listening on port 3000!')
});
