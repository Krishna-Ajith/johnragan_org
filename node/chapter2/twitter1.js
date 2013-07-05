var express = require('express')

var app = express();  //express.createServer()

app.get('/', function(req, res) {
  res.send('Welcome to Node Twitter')
})

app.listen(8000)