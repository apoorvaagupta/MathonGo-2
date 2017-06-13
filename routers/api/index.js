const router = require('express').Router();

router.use('/minicourses',require('./minicourses'));
router.use('/lessons',require('./lessons'));
router.use('/students',require('./students'));
router.use('/tutors',require('./tutors'));
router.use('/extra',require('./extra'));

module.exports = router;