const router = require("express").Router();
const todosRoutes = require("../routes/todo");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const passport = require("passport");
require("../passport-strategies/local");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);

router.use(bodyParser.json());

router.post("/", userController.addUser);
router.use("/:id/todos", todosRoutes);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.passportLogin
);

module.exports = router;
