const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient:true});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: String,
  name: String,
  description: String,
  url: String,
  username: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (results, callback) => {
  for (let i = 0; i < results.length; i++) {
    let newID = results[i].id;
    Repo.find({}, function(err, docs) {
      if (err) {
        throw err;
      } else if (docs.length === 0){
        let current = new Repo(results[i]);
        current.save(function (err, repo) {
          if (err) return console.error(err);
          console.log(repo.name + " saved to collection");
          if (i === results.length-1) {
              callback();
          }
        });
      }
    })

  }
}

let get = (sorting, callback) => {
  Repo.find({}, null, {sort: {sorting: 1}}, function (err, docs) {
    callback(docs);
  })
}

module.exports.save = save;
module.exports.get = get;