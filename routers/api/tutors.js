const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');


router.post('/add', function (req, res) {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
        res.send("Insufficient Details");
    }
    password.pass2hash(req.body.password).then(function (hash) {
        models.Tutor.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).then(function (student) {
            res.send(student);
        })
    })
});


//will have to think about the method being get or post
router.get('/login', function (req, res) {

});

router.get('/:id', function (req, res) {
    // models.Student.findOne({
    //     where: {id: req.params.id}
    // }).then(function (student) {
    //     res.send(student);
    // }).catch(function (err) {
    //     console.log(err);
    //     res.send('Unknown Student');
    // })
});

router.post('/:id/edit', function (req, res) {
    let tutorId = parseInt(req.params.id),
        email = req.body.email,
        name = req.body.name,
        description = req.body.description;

    models.Tutor.update({
        email: email,
        name: name,
        description: description
    }, {
        where: {id: studentId},
        returning: true
    }).then(function (rows) {
        res.send(rows[1][0].get());
    }).catch(function (error) {
        console.error(error)
    });
});

router.get('/:id/myMiniCourses', function (req, res) {
    //tutor gets all his minicourses,
    const tutorId = parseInt(req.params.id);
    models.MiniCourse.findAll({
        where: {
            tutorId: tutorId
        }
    }).then(function (miniCourses) {
        res.send(miniCourses);
    }).catch(function (err) {
        console.log(err);
        res.send("Could not get the minicourses now");
    })

});

router.get('/:id/:miniCourse', function (req, res) {
    //tutor sees a minicourse with review on it
});

router.get('/:id/:minicourse/:lesson', function (req, res) {
    //tutor sees a lesson with all its reports and no of upvotes
});


router.post('/:id/addMiniCourse', function (req, res) {
    const tutorId = parseInt(req.params.id);
    models.MiniCourse.create({
        name: req.body.name,
        noOfLessons: req.body.noOfLessons,
        description: req.body.description,
        level: req.body.level,
        duration: req.body.duration,
        medium: req.body.duration,
        tutorId: tutorId
    }).then(function (miniCourse) {
        //Ask if allowed here
        models.Class.findOne({
            where: {
                className: req.body.className
            }
        }).then(function (classObject) {
            models.Subject.findOne({
                where: {
                    subjectName: req.body.subjectName
                }
            }).then(function (subjectObject) {
                models.Category.findOne({
                    where: {
                        categoryName: req.body.categoryName
                    }
                }).then(function (categoryObject) {
                    models.Course.findOne({
                        where: {
                            courseName: req.body.courseName
                        }
                    }).then(function (courseObject) {
                        models.Tag.create({
                            classId: classObject.id,
                            subjectId: subjectObject.id,
                            categoryId: categoryObject.id,
                            courseId: courseObject.id,
                            minicourseId: miniCourse.id
                        }).then(function (tagRow) {
                            models.MiniCourse.findOne({
                                where: {id: miniCourse.id},
                                include: [models.Tag]
                            }).then(function (miniCourseFinal) {
                                res.send(miniCourseFinal);
                            }).catch("Could not find the MiniCourse right now");
                        }).catch(function (err) {
                            console.log(err);
                            res.send("Could not add the tags right now");
                        })
                    }).catch(function (err) {
                        console.log(err);
                        res.send("Could not add the course right now");
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.send("Could not add the category right now");
                })
            }).catch(function (err) {
                console.log(err);
                res.send("Could not add the subject right now");
            })
        }).catch(function (err) {
            console.log(err);
            res.send("Could not add the class right now");
        })
    }).catch(function (err) {
        console.log(err);
        res.send("Could not add the minicourse right now");
    })

});

router.post('/:id/:miniCourseId/addLesson', function (req, res) {
    const tutorId = parseInt(req.params.id);
    const miniCourseId = parseInt(req.params.miniCourseId);
    // models.Lesson.create({
    //     name:req.body.name,
    //     videoUrl:req.body.videoUrl,
    //     level:req.body.level,
    //     duration:req.body.duration,
    //     minicourseId:miniCourseId
    // }).then(function (lesson) {
    //     res.send(lesson);
    // }).catch(function (err) {
    //     console.log(err);
    //     res.send("Could not add the lesson right now");
    // });
    console.log(req.body);
    let bulkInsertArray = [];
    for (let i = 0; i < req.body.lessons.length; i++) {
        let tempObject = {
            name: req.body.lessons[i].name,
            videoUrl: req.body.lessons[i].videoUrl,
            level: req.body.lessons[i].level,
            duration: req.body.lessons[i].duration,
            description: req.body.lessons[i].description,
            minicourseId: miniCourseId
        };
        bulkInsertArray.push(tempObject);
    }

    models.Lesson.bulkCreate(bulkInsertArray).then(function () {
        return models.Lesson.findAll({
            where: {
                minicourseId: miniCourseId
            }
        })
    }).then(function (lessons) {
        res.send(lessons);
    }).catch(function (err) {
        console.log(err);
        res.send("Could not add the lesson right now");
    })

});


//Write
router.post('/:id/:miniCourseId/edit', function (req, res) {

});

module.exports = router;