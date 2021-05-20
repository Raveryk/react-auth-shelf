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
router.post('/', rejectUnauthenticated, (req, res) => {
  const description = req.body.description;
  const image_url = req.body.url;
  const user_id = req.user.id;
  console.log(description);
  console.log(image_url);
  console.log(user_id.id);

  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  const queryText = `INSERT INTO item (description, image_url, user_id) 
  VALUES ($1, $2, $3);`;

  pool.query(queryText, [description, image_url, user_id])
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
