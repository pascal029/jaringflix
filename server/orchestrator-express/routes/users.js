const UserController = require("../controller/userController");

const router = require("express").Router();

router.get("/", UserController.getAll);
router.post("/", UserController.createUser);
router.get("/:id", UserController.getOne);
router.delete("/:id", UserController.deleteOne);

module.exports = router;
