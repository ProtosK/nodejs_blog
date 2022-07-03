const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {
    //[GET] /me/store/courses
    storeCourses(req, res, next) {
        //dùng let để ghi đè courseQuery
        

        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,// name: 'desc'
            });
        }
    
        // Sử dụng promise all cho 2 promise để đồng bộ
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
        .then(([courses, deletedCount]) => 
            res.render('me/store-courses', {
                deletedCount,
                courses: mutipleMongooseToObject(courses)
            })
        )
        .catch(next);
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
        .then(courses => res.render('me/trash-courses', {
            courses: mutipleMongooseToObject(courses)
        }))
        .catch(next)
    }
}

module.exports = new MeController();
