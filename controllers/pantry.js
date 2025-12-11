const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index - GET /pantry
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const pantry = user.pantry.sort((a, b) => a.name.localeCompare(b.name));
    res.render('pantry/index.ejs', { pantry });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Create - POST /pantry
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const foodName = req.body.name.trim();
    const exists = user.pantry.some(
      (item) => item.name.toLowerCase() === foodName.toLowerCase()
    );
    if (!exists && foodName) {
      user.pantry.push({ name: foodName });
      await user.save();
    }
    res.redirect('/pantry');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete - DELETE /pantry/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.pull({ _id: req.params.itemId });
    await user.save();
    res.redirect('/pantry');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
