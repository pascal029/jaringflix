const UserController = require("../controller/userController");

const router = require("express").Router();

router.get("/", UserController.findAll);
router.post("/", UserController.createUser);
router.get("/:id", UserController.findOne);
router.delete("/:id", UserController.deleteOne);

module.exports = router;
