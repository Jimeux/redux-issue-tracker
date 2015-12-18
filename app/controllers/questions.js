var express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    utils    = require('../utils'),
    Question = require('../models/issue'),
    User     = require('../models/user');

router.route('/')
    .get(index)
    .post(passport.authenticate('bearer', { session: false }), create);

router.route('/:id')
    .get(passport.authenticate('bearer', { session: false }), show)
    .put(update)
    .delete(destroy);

function index(req, res) {
  var limit = 12;
  var skip = (req.query.page - 1) * limit;

  Question  // 'isPublic': true
    .find({}, null, { skip: skip, limit: limit, sort: {createdAt: -1} })
    .populate('user', '_id username avatar')
    .exec(function(err, questions) {
      if (err) return err;


      // Convert relative avatar paths to full URLs
      questions = questions.map(function(q) {
        return utils.convertPathToUrl(q, req);
      });

      //setTimeout(function () {
        res.send(questions);
      //}, 300); //TODO: REMOVE DELAY!!!

    });
}

function update(req, res) {
  Question.findOne({ _id: req.params.id }, function (err, question) {
    question.timeLimit = req.body.time_limit;
    question.save();
    res.send(question);
  });
}

function show(req, res) {
  Question
    .findOne({_id: req.params.id})
    .populate('user', '_id username avatar')
    .exec(
      function(err, question) {
        question = utils.convertPathToUrl(question, req);
      /*res.format({
        html: function(){
          res.render('index', { title: 'Question' });
        },
        json: function(){*/
          res.send(question);
    /*    }
      });*/
    });
}

function create(req, res) {

  var expiryDate = new Date();

  switch (parseInt(req.body.timeLimit, 10)) {
    case 1: expiryDate.setMonth(expiryDate.getMonth() + 3); break;
    case 2: expiryDate.setMonth(expiryDate.getMonth() + 1); break;
    case 3: expiryDate.setDate(expiryDate.getDate() + 7);   break;
    case 4: expiryDate.setDate(expiryDate.getDate() + 1);   break;
  }

  //TODO: Trim \n, spaces etc, add ? at the end
  var question = new Question ({
    question:   req.body.question,
    isPrivate:  req.body.isPublic,
    expiryDate: expiryDate,
    user:       req.user._id
  });

  question.save(function(err, question) {
    question.user = null; //FIXME: populate user
    if (err) res.send(err);
    else     res.send(question);
  });
}

function destroy(req, res) {
  Question.remove({_id: req.params.id}, function(err) {
    if (err) res.send(err);
  });
  res.send('Destroy question');
}

module.exports = router;