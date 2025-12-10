const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// Index - GET /users (Community page)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Show - GET /users/:userId (View a user's recipes)
router.get('/:userId', async (req, res) => {
  try {
    const profileUser = await User.findById(req.params.userId, 'username');
    const recipes = await Recipe.find({ owner: req.params.userId }).populate('ingredients');
    res.render('users/show.ejs', { profileUser, recipes });
  } catch (error) {
    console.log(error);
    res.redirect('/users');
  }
});

module.exports = router;
