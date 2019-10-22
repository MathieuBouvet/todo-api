const router = require("express").Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", bodyParser.json(), userController.addUser);

module.exports = router;
