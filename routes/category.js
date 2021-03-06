const express = require('express');
const router = express.Router();
const categoryController = require('../controller/customer.controller');
const tokenVerification = require('../mid/token_verify');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/images',
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage });
console.log('categoryName');

router.post("/add", tokenVerification.varifyToken, upload.single('categoryImage'), categoryController.add);
router.get("/category-list", tokenVerification.varifyToken, categoryController.getCategory);

router.post("/delete-category", tokenVerification.varifyToken, categoryController.deleteCategory);

router.post("/update", upload.single('categoryImage'), categoryController.update);
module.exports = router;