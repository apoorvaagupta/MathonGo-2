const Sequelize = require('sequelize');

const db = new Sequelize('mathongo', 'muser', 'mpass', {
    host: 'localhost',
    dialect: 'postgres'
});

const Student = db.define('student', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    class: Sequelize.INTEGER,
    contact: Sequelize.BIGINT,
});

const MiniCourse = db.define('minicourse', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    nooflessons: Sequelize.STRING,
    password: Sequelize.STRING,
    description: Sequelize.STRING
});

const Lesson = db.define('lesson', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    videourl: Sequelize.STRING(1234),
    level: Sequelize.STRING,
});

const Tutor = db.define('tutor', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    img: Sequelize.STRING(1234),
    name: Sequelize.STRING,
    description: Sequelize.STRING(1234)
});

const Bookmark = db.define('bookmark', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

const MyCourse = db.define('mycourse', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

const Report = db.define('report', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    description: Sequelize.STRING(1234),
});

const Follow = db.define('follow', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

const Upvote = db.define('upvote', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

const Review = db.define('review', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    rating: Sequelize.STRING,
    description: Sequelize.STRING
});

const Class = db.define('class', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
});

const Subject = db.define('subject', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
});

const Category = db.define('category', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
});

const Course = db.define('course', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
});


db.sync({}).then(() => {
    console.log('Database configured')
});

module.exports = {
    models: {Student, Company, Application, Job}
};