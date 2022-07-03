//Định nghĩa tuyến đường
const express = require('express');
const router = express.Router(); //method router có sẵn trong thư viện express

const meController = require('../app/controllers/MeController'); //import method từ file controller

router.get('/stored/courses', meController.storeCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;
