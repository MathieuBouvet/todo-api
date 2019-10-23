const router = require("express").Router({ mergeParams: true });
const todoCtrl = require("../controllers/todoController");

router.put("/", todoCtrl.updateTodo);

module.exports = router;
