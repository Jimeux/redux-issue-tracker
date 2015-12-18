const express = require('express');
const passport = require('passport');
const Material = require('../models/material');
const router = express.Router();

router.use(passport.authenticate('bearer', {session: false}));

router.route('/').get((req, res) => {
  const query = {
    level: req.query.level,
    type: req.query.type
  };

  Material.find(query)
      .exec((err, materials) => {
        if (err)
          res.send(err);
        else {
          res.json(materials);
        }
      });
});

module.exports = router;