const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const get = require('../database/index.js').get;

const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/";
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
      return {_id: item.id, name: item.name, description: item.description, url: item.html_url};
    })
    save(resData);
    // MongoClient.connect(url, function(err, db) {
    //   if (err) throw err;
    //   let dbo = db.db("repos");
    //   for (let i = 0; i < resData.length; i++) {
    //     let myobj = resData[i];
    //     dbo.collection("repos").insertOne(myobj, function(err, res) {
    //       if (err) throw err;
    //     });
    //   }
    //   db.close();
    // });
    // console.log(resData);
    // res.statusCode = 200;
    // res.send({results: resData});
    res.statusCode = 200;
    res.send("Successful Post!");
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

