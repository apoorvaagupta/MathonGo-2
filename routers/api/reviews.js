const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');
const passport = require('./../../passport/passporthandler');
const ensure = require('./../../passport/passportutils');


router.get('/:miniCourseId', function (req, res) {
  let miniCourseId = req.params.miniCourseId;
  models.Review.findAll({
    where: {minicourseId: miniCourseId}
  }).then(function (reviews) {
    if (reviews) {
      res.send({success: true, reviews: reviews.map((review => review.get()))})
    } else {
      res.send({success: false})
    }
  }).catch(function (err) {
    console.log(err);
    res.send({success: 'error', message: "Could not get the reviews right now"});
  })
});

router.post('/:miniCourseId', passport.authenticate('bearer'), ensure.ensureStudent(), function (req, res) {
  let miniCourseId = req.params.miniCourseId;
  models.Review.create({
    rating: (+req.body.rating),
    description: req.body.description,
    studentId: req.user.id,
    minicourseId: miniCourseId
  }).then(function (review) {
    if (review) {
      res.send({success: true, review: review})
    } else {
      res.send({success: false})
    }
  }).catch(function (err) {
    console.log(err);
    res.send({success: 'error', message: "Could not get the review right now"});
  })
});

module.exports = router;
