const MovieController = require("../controllers/movieController");

const router = require("express").Router();

router.get("/", MovieController.getAll);
router.post("/", MovieController.createMovie);
router.get("/:id", MovieController.getOne);
router.delete("/:id", MovieController.deleteMovie);
router.put("/:id", MovieController.editMovie);

module.exports = router;
