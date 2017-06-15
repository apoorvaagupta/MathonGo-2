const router = require('express').Router();
const ensure = require('./../../passport/passportutils')

router.use('/minicourses', require('./minicourses'));
router.use('/lessons', require('./lessons'));
router.use('/students', require('./students'));
//TODO : Add ensure admin
router.use('/tutors', require('./tutors'));
router.use('/extra', require('./extra'));

module.exports = router;