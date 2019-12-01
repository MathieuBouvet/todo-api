const router = require("express").Router({ mergeParams: true });
const todoCtrl = require("../controllers/todoController");
const authorship = require("../middlewares/authorship");
const csrfProtection = require("../middlewares/csrfProtection");

router.put("/", authorship, csrfProtection, todoCtrl.updateTodo);

module.exports = router;
