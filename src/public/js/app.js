require('./db.js');
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve('src','public')));
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  const district = req.query.district;
  const cuisine = req.query.cuisine;

  const search = {};
  if (district) {
    search.district = district;
  }
  if (cuisine) {
    search.cuisine = cuisine;
  }

  Restaurant.find(search, (err, result) => {
    if (err) {
      res.status(500).send("MongoDB error");
    }
    else if (result.length === 0) {
        res.status(404).send("Failed to find restaurant");
      }
      else {
        const random = Math.floor(Math.random() * result.length);
        const bingo = result[random];
        res.render('roulette', {bingo: bingo.name});
      }
  });
});

function compare(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
  if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
  return 0;
}

app.get('/list', (req, res) => {
  Restaurant.find({}, (err, result) => {
    if (err) {
      res.status(500).send("MongoDB error");
    }
    else {
      res.render('list', {result: result.sort(compare)});
    }
  });
});

app.post('/list', (req, res) => {
  if (req.body.name || req.body.district || req.body.cuisine) {
    new Restaurant({
      name: req.body.name,
      district: req.body.district,
      cuisine: req.body.cuisine,
    }).save(function(err) {
      if (err) {
        res.status(500).send("MongoDB error");
      }
      else {
        res.redirect('/list');
      }
    });
  }

  else if (req.body.delete) {
    Restaurant.deleteOne({name: req.body.delete}, (err, result) => {
      if (err) {
        res.status(500).send("MongoDB error");
      }
      else if (result.deletedCount === 0) {
          res.status(404).send("No restaurant is deleted");
        }
        else {
          res.redirect('/list');
        }
    });
  }

  else {
    res.status(404).send("No request was made");
  }
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(process.env.PORT || 3000, () => console.log('connected to server'));

module.exports = app;

