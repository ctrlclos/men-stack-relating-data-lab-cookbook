const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient.js');

// Index - GET /ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find().sort({ name: 1 });
    res.render('ingredients/index.ejs', { ingredients });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Create - POST /ingredients
router.post('/', async (req, res) => {
  try {
    const existingIngredient = await Ingredient.findOne({
      /**prevent duplicate entries in the
      database while ignoring case
      differences */
      name: { $regex: new RegExp(`^${req.body.name}$`, 'i') }
    });
    if (existingIngredient) {
      return res.redirect('/ingredients');
    }
    await Ingredient.create(req.body);
    res.redirect('/ingredients');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
