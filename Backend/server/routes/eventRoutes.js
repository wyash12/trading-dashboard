const express = require('express');
const router = express.Router();
const { 
    getEvents, 
    filterEvents,
  } = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/filter', filterEvents,);   


module.exports = router;