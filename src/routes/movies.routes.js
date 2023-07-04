const { Router } = require("express");
const MoviesController = require("../controllers/MoviesController");
const moviesRoutes = Router();

const moviesControlller = new MoviesController();


moviesRoutes.post("/:user_id", moviesControlller.create);
moviesRoutes.get("/:id", moviesControlller.show);
moviesRoutes.delete("/:id", moviesControlller.delete);
moviesRoutes.get("/", moviesControlller.index);

module.exports = moviesRoutes;