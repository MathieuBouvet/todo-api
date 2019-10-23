const router = require("express").Router();
const todosRoutes = require("../routes/todo");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/", bodyParser.json(), userController.addUser);

router.use("/:id/todos", bodyParser.json(), todosRoutes);

module.exports = router;
