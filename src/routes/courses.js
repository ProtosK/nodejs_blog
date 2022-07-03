//Tạo các path cho routes điều hướng
const express = require('express');
const router = express.Router(); //method router có sẵn trong thư viện express

const courseController = require('../app/controllers/CourseController'); //import method từ file controller

// router.phương thức cho trang /..., với controller tương ứng
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;
