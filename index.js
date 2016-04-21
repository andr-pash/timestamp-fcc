var express = require('express');
var util = require('util');
var app = express();

app.use(express.static('./public'));

app.get('/api/:str', function(req, res) {
  var str = req.params.str;
  var unix,
    natural,
    date;

  // default value to return in case of invalid input
  var obj = {
    unix: null,
    natural: null
  };

  // if Date is passed as unix
  if (!isNaN(parseInt(str, 10))) {
    unix = Number(str);
    date = new Date(unix);
    natural = date.toDateString();
    if (natural !== 'Invalid Date') {
      obj.unix = unix;
      obj.natural = natural;
    }
    res.send(obj);
  }

  // if date is passed in natural format
  if (isNaN(parseInt(str, 10))) {

    date = new Date(str);
    unix = date.getTime();
    natural = date.toDateString();
    if(natural !== 'Invalid Date'){
      obj.unix = unix;
      obj.natural = natural;
    }
    res.send(obj);
  }

});

app.listen(process.env.PORT || 8080);
