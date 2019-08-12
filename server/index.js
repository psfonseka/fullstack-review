const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.user.username;
  getReposByUsername(username, (data) => {
    console.log(data);
  });
  res.statusCode = 200;
  res.send("Successful Post!");
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log("get");
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

