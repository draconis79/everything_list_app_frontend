const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log('My Lists App on PORT:', PORT));

// ==============
// MIDDLEWARE
// ==============

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static('public'));

// ==============
// CONTROLLERS
// ==============
const listController = require('./controllers/lists.js')

// ==============
// USE OF CONTROLLERS
// ==============

app.use('/lists', listController);

// ==============
// ROUTES
// ==============

app.get('/', (req, res) => {
  res.render("index.ejs");
});
