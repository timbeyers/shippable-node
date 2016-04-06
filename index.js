var express = require("express"),
    nano = require('nano')('http://localhost:5984'),
    app = express();

var port = process.env.PORT || 3000 ;

app.get("/", function (req, res) {
  res.send("Hey buddy, this is CI/CD from shippable to Heroku!");
});

app.listen(port, function () {
  console.log('Express listening on port 3000');
});
