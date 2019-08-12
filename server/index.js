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
    let results = data.data;
    let resData = results.map(item => {
      return {id: item.id, name: item.name, description: item.description, url: item.html_url};
    })
    // console.log(resData);
    // res.statusCode = 200;
    // res.send({results: resData});
    res.statusCode = 200;
    res.send("Successful Post!");
  });

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

