const express = require("express");
const usersController = require("../controller/usersController");
const router = express.Router();

router.post("/add/user", usersController.addUser);
router.get("/get/users", usersController.getUsers);
router.post("/login", usersController.login);
router.put("/reset/password", usersController.resetPassword);

module.exports = router;
