const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const get = require('../database/index.js').get;

const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  let username = req.body.user.username;
  getReposByUsername(username, (data) => {
    let results = data.data;
    let resData = results.map(item => {
      return {id: item.id, name: item.name, description: item.description, url: item.html_url};
    })
    save(resData, () => {
      get((results) => {
        res.statusCode = 200;
        res.send({results: results});
      })
    });
  });

});

app.get('/repos', function (req, res) {
    get((results) => {
      res.statusCode = 200;
      res.send({results: results});
    })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

