var http = require('http'),
  assert = require('assert');
  
var post_opts = {
  host: 'localhost',
  port: 8000,
  path: '/send',
  method: 'POST',
  headers: {'content-type' : 'application/x-www-form-urlencoded'}
}

var postReq = http.request(post_opts, function(res) {
  res.setEncoding('utf8');
  
  var data = ""
  res.on('data', function(d) {
    data += d;
  })
  
  res.on('end', function() {
    assert.strictEqual(data, '{\n  "status": "ok",\n  "message": "Tweet received"\n}')
  })
})

var get_opts = {
  host: 'localhost',
  port: 8000,
  path: '/',
  method: 'GET',
}

var getReq = http.request(get_opts, function(res) {
  res.setEncoding('utf8');
  
  var data = ""
  res.on('data', function(d) {
    data += d;
  })
  
  res.on('end', function() {
    assert.strictEqual(data, 'Welcome to Node Twitter')
  })
})

var get_tweet_opts = {
  host: 'localhost',
  port: 8000,
  path: '/tweets',
  method: 'GET',
}

var getTweetsReq = http.request(get_tweet_opts, function(res) {
  res.setEncoding('utf8');
  
  var data = ""
  res.on('data', function(d) {
    data += d;
  })
  
  res.on('end', function() {
    assert.strictEqual(data, '[\n  \"test\"\n]')
  })
})

postReq.write('tweet=test')
postReq.end()

getReq.end()

getTweetsReq.end()