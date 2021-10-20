const express = require("express")
const authController = require("../controllers/authControllers")
const router = express.Router()

router.post("/signin",authController.login)
router.post("/signup",authController.signup)
router.get('/logout',authController.logout)
router.post('/verifyuser',authController.verifyUser)
router.post("/roomverify",authController.verifyRoom)

module.exports= router;