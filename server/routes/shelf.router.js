const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {

  const query = `SELECT description, image_url FROM "item";`
  pool.query(query)
    .then( result => {
      console.log(result.rows)
      res.send(result.rows)
    })
    .catch( error => {
      console.log('Error GETting items from shelf.', error);
      res.sendStatus(500);
    })
  // res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  let reqId = req.params.id;
  console.log('Delete request for id', reqId);
  let sqlText = 'DELETE FROM item WHERE id=$1;';
  pool.query(sqlText, [reqId])
  .then((result) => {
    res.sendStatus(200);
  })
  .catch(( err ) => {
    console.log(`Error making databse query ${sqlText}`, err);
    res.sendStatus(500)
  })
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
