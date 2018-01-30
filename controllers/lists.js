const express = require('express');
const router = express.Router();

// ==============
// MIDDLEWARE
// ==============

router.use(express.urlencoded({ extended: false}));
router.use(express.json());
router.use(express.static('public'));


// ==============
// ROUTES
// ==============

// router.get('/', (req, res) => {
//   res.render("index.ejs");
// });
//
// router.get('/:id', (req, res) => {
//   // res.render("list.ejs");
// });

module.exports = router;
