const express = require("express");
const userController = require("./user.controller");
const router = express.Router()
const { uploadImage } = require("../../../../middlewares/uploadImages")
const { authenticate } = require("../../../../middlewares/auth");
const {validatePostUser} = require("../../../../middlewares/validation/users/postUser");



router.post("/login", userController.login)
router.post("/",validatePostUser, userController.createUser)
router.patch(
    "/upload-avata",
    authenticate,
    uploadImage("avata"),
    userController.uploadAvatar
)




module.exports = router;