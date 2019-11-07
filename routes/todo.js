const router = require("express").Router({ mergeParams: true });
const todoCtrl = require("../controllers/todoController");
const authorship = require("../middlewares/authorship");

router.put("/", authorship, todoCtrl.updateTodo);

module.exports = router;
