const express = require('express');
const router = express.Router(); //method router có sẵn trong thư viện express

const newsController = require('../app/controllers/NewsController'); //import method từ file controller

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
