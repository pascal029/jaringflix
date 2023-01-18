const MovieController = require("../controller/movieController");

const router = require("express").Router();

router.get("/", MovieController.getMovies);
router.post("/", MovieController.createMovie);
router.get("/:id", MovieController.getMovie);
router.delete("/:id", MovieController.deleteMovie);
router.put("/:id", MovieController.updateMovie);

module.exports = router;
