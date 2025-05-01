const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');


router.post('/countries', countryController.createCountry);


router.get('/countries', countryController.getAllCountries);


router.get('/countries/:id', countryController.getCountryById);

module.exports = router;
