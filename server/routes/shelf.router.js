const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const description = req.body.description;
  const url = req.body.url;
  const user_id = req.user;
  console.log(description);
  console.log(url);
  console.log(user_id);

  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  const queryText = `INSERT INTO item (description, url, user_id) 
  VALUES ($1, $2, $3);`;

  pool.query(queryText, [description, url, user_id])
  .then(() => res.sendStatus(201))
  .catch((error) => {
    console.log('Error with adding an item', error);
    res.sendStatus(500);
  })

  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
