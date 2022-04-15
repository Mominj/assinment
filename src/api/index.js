const express = require("express");
const router = express.Router();

// //middleware
const imageUpload = require("../middleware/upload");
const requireAuth = require("../middleware/authorization");


//controller
const userController = require('../controllers/users.controller');
const loginController = require("../controllers/login.controller")
const courseController = require("../controllers/course.controller");
const mcqController = require("../controllers/mcq.controller")



router.post('/user/create', userController.userCreate);
router.post('/user/login', loginController.login);
router.get('/user/list',requireAuth, userController.listAllStudentTeacher);
router.delete('/user/delete/:id',requireAuth, userController.deleteUsersById);
router.get('/user/:id',requireAuth, userController.ViewById);
router.patch('/user/update/:id',requireAuth, userController.UpdateById);

router.post('/user/change/password',requireAuth, userController.changeUserPassword);
router.post('/course/store', requireAuth, imageUpload.single('image') , courseController.courseCreate);
router.get('/course/show', requireAuth,  courseController.allCourseShow);
router.get('/course/:filename',requireAuth, courseController.imagePath);
router.post('/course/enroll',requireAuth, courseController.courseEnroll);

router.post('/mcq/create',requireAuth, mcqController.mcqCreate);
router.post('/exam/create',requireAuth, mcqController.examCreate);



module.exports = router;