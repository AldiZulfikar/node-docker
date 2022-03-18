const express = require("express")

const autController = require("../controllers/authController")

const router = express.Router()

router.post("/signup", autController.signUp)
router.post("/login", autController.login)

module.exports = router