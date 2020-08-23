const express = require('express');
const db = require('../db');
const { Friend } = db.models;
const router = express.Router();

//Retrieves all items from friends and orders by desc


router.get('/api/friends', async(req, res, next) => {
  try {
    res.send(await Friend.findAll({order: [['rating', 'desc']]}));
  } catch(err){
    next(err);
  }
})

router.post('/api/friends', async(req, res, next) => {
  try {
    const { name, rating } = req.body;
    res.send(await Friend.create({
      name: name,
      rating: rating
    }))
  } catch(err) {
    next(err);
  }
})

router.put('/api/friends/:id', async(req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id)
    await friend.update(req.body);
    res.send(friend);
  } catch (err) {
    next(err);
  }
})

router.delete('/api/friends/:id', async(req, res, next) => {
  try {
    const friend = await Friend.findByPk(req.params.id)
    await friend.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
