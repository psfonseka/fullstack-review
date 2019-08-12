const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient:true});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: String,
  name: String,
  description: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (results) => {
  for (let i = 0; i < results.length; i++) {
    let current = new Repo(results[i]);
    current.save(function (err, repo) {
      if (err) return console.error(err);
      console.log(repo.name + " saved to collection");
    });
  }
}

let get = (callback) => {
  Repo.find({}, function (err, docs) {
    callback(docs);
  })
}

module.exports.save = save;
module.exports.get = get;